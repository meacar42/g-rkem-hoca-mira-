'use server'

import { ICreateOrderRequestPayload } from '@/types/IOrderRequest'
import { getCitiesWithDistrictsAPI } from '@/api/info/info.api'
import { IProduct } from '@/types/IProduct'

async function createBasket(buyerEmail: string, buyerId?: number) {
    const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/orders/basket',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
            },
            body: JSON.stringify({ buyerEmail, buyerId }),
            cache: 'no-store',
        },
    )

    if (!response.ok) {
        throw new Error('An error occurred while creating basket')
    }

    return await response.text()
}

async function getSubtotalAmount(
    products: { productId: number; quantity: number }[],
): Promise<{
    products: IProduct[]
    subtotal: number
    shipment: { isFree: boolean; price: number }
}> {
    console.log('Cart.Actions.getSubTotalAmount:', products)

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
        const buyer = payload.isGuest ? payload.guest! : payload.user!

        const [subtotalResponse, cities, basketId] = await Promise.all([
            getSubtotalAmount(payload.products),
            getCitiesWithDistrictsAPI(),
            createBasket(buyer.email, payload.isGuest ? undefined : buyer.id),
        ])

        const Iyzipay = require('iyzipay')
        const iyzipay = new Iyzipay({
            apiKey: 'sandbox-8te0rjAwusnpviNR3RrkZYptaFbSFBUN',
            secretKey: 'X2C8teB60VkPLB50hWaL9noJmNbt9NXN',
            uri: 'https://sandbox-api.iyzipay.com',
        })

        const isShipmentFree = subtotalResponse.shipment.isFree
        const totalPrice = (
            isShipmentFree
                ? subtotalResponse.subtotal
                : subtotalResponse.subtotal + subtotalResponse.shipment.price
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

        console.log('Request Payload:', payload)

        const enabledInstallments = [1]

        const request = {
            locale: 'tr',
            price: totalPrice,
            paidPrice: totalPrice,
            currency: 'TRY',
            enabledInstallments: enabledInstallments,
            basketId: basketId,
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
                              price: subtotalResponse.shipment.price,
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
