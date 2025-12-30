'use server'

import { v4 as uuidv4 } from 'uuid'
import { cookies } from 'next/headers'
import { ICreateOrderRequestPayload } from '@/types/IOrderRequest'
import { getCitiesWithDistrictsAPI, getInfoAPI } from '@/api/info/info.api'
import { IProduct } from '@/types/IProduct'

async function getSubtotalAmount(
    products: { productId: number; quantity: number }[],
): Promise<{
    products: IProduct[]
    subtotal: number
}> {
    console.log('products', products)

    const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/cart/guest-total',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
            },
            body: JSON.stringify({ products }),
            cache: 'no-store',
        },
    )

    if (!response.ok) {
        throw new Error('An error occurred while fetching subtotal amount')
    }

    const data = await response.json()
    console.log('subtotal amount data', data)
    return data
}

export async function handlePaymentAction(payload: ICreateOrderRequestPayload) {
    try {
        const [subtotalResponse, info, cities] = await Promise.all([
            getSubtotalAmount(payload.products),
            getInfoAPI(),
            getCitiesWithDistrictsAPI(),
        ])

        const Iyzipay = require('iyzipay')
        const iyzipay = new Iyzipay({
            apiKey: 'sandbox-8te0rjAwusnpviNR3RrkZYptaFbSFBUN',
            secretKey: 'X2C8teB60VkPLB50hWaL9noJmNbt9NXN',
            uri: 'https://sandbox-api.iyzipay.com',
        })

        const buyer = payload.isGuest ? payload.guest! : payload.user!
        const isShipmentFree =
            info.shipmentMinPrice <= subtotalResponse.subtotal
        const totalPrice = (
            isShipmentFree
                ? subtotalResponse.subtotal
                : subtotalResponse.subtotal + info.shipmentPrice
        ).toString()

        const city = cities.find(
            (c) => c.id === payload.shippingAddress.cityId,
        )?.name
        if (!city) {
            return { success: false, error: 'Invalid city in shipping address' }
        }
        const district = cities
            .find((c) => c.id === payload.shippingAddress.cityId)!
            .districts.find(
                (d) => d.id === payload.shippingAddress.districtId,
            )?.name
        if (!district) {
            return {
                success: false,
                error: 'Invalid district in shipping address',
            }
        }

        const billingCity = payload.billingAddressSameAsShipping
            ? city
            : cities.find((c) => c.id === payload.billingAddress.cityId)?.name
        if (!billingCity) {
            return { success: false, error: 'Invalid city in billing address' }
        }
        const billingDistrict = payload.billingAddressSameAsShipping
            ? district
            : cities
                  .find((c) => c.id === payload.billingAddress.cityId)!
                  .districts.find(
                      (d) => d.id === payload.billingAddress.districtId,
                  )?.name
        if (!billingDistrict) {
            return {
                success: false,
                error: 'Invalid district in billing address',
            }
        }

        console.log('Payload:', payload)

        const conversationId = uuidv4()

        const request = {
            locale: 'tr',
            conversationId,
            price: totalPrice,
            paidPrice: totalPrice,
            currency: 'TRY',
            enabledInstallments: [1],
            //basketId: 'B6783224',
            paymentChannel: 'WEB',
            paymentGroup: 'PRODUCT',
            callbackUrl: 'http://localhost:3000/api/checkout/callback',
            buyer: {
                id: payload.isGuest ? buyer.email : buyer.id!.toString(),
                name: buyer.name,
                surname: buyer.surname,
                gsmNumber: buyer.phone,
                email: buyer.email,
                identityNumber: buyer.email,
                registrationAddress: `${payload.shippingAddress.addressDetail} ${district} ${city}`,
                city: city,
                country: 'Turkey',
            },
            shippingAddress: {
                city: city,
                district: district,
                address: payload.shippingAddress.addressDetail,
                country: 'Turkey',
                contactName: `${buyer.name} ${buyer.surname}`,
                //zipCode: payload.shippingAddress.zipCode,
            },
            billingAddress: {
                city: billingCity,
                district: billingDistrict,
                address: payload.billingAddressSameAsShipping
                    ? payload.shippingAddress.addressDetail
                    : payload.billingAddress.addressDetail,
                country: 'Turkey',
                contactName: `${buyer.name} ${buyer.surname}`,
            },
            basketItems: [
                ...subtotalResponse.products.map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        itemType: 'PHYSICAL',
                        price: product.price,
                        discount: product.discount ? product.discount : null,
                        category1: 'Ürün',
                    }
                }),
                ...(isShipmentFree
                    ? []
                    : [
                          {
                              id: 'SHIPPING',
                              name: 'Shipping Cost',
                              category1: 'Service',
                              itemType: 'PHYSICAL',
                              price: info.shipmentPrice,
                          },
                      ]),
            ],
        }

        console.log('Iyzipay Request:', request)

        return new Promise((resolve) => {
            iyzipay.checkoutFormInitialize.create(
                request,
                (err: unknown, result: object) => {
                    if (err)
                        resolve({ success: false, error: 'An Error Occurred' })
                    else {
                        cookies().set('mci', conversationId, {
                            httpOnly: true,
                            expires: new Date(Date.now() + 5 * 60 * 1000),
                        })
                        resolve({ success: true, data: result })
                    }
                },
            )
        })
    } catch (error) {
        console.error(error)
        return { success: false, error: 'An Error Occurred' }
    }
}
