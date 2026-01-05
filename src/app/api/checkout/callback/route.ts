// app/api/pay-callback/route.ts
import { redirect } from 'next/navigation'
import { ApiResponse } from '@/api/fetch.public.api'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL
const adminURL = process.env.ADMIN_PANEL_URL

console.log('Admin URL:', adminURL)

const ERROR_CODES = {
    INVALID_BASKET: 5001,
    ORDER_REQUEST_FAILED: 5002,
}

// Iyzico Payment Result Type
type PaymentResult = {
    status: string
    conversationId: string
    price: number
    paidPrice: number
    installment: number
    paymentId: string
    basketId: string
    lastFourDigits: string
    systemTime: number
    itemTransactions: {
        itemId: string
        price: number
        paidPrice: number
    }[]
}

interface CreateOrderRequest {
    iyzicoPaymentId: string
    price: number
    paidPrice: number
    installment: number
    cardLastFourDigits: string
    productIds: number[]
    shipmentPrice: number
    buyerId?: number
    buyerEmail: string
}

interface CreateOrderResponse {
    id: string
}

async function getBasketRequest(
    basketId: string,
): Promise<{ buyerEmail: string; buyerId?: number } & ApiResponse> {
    try {
        const response = await fetch(baseURL + `/orders/basket/${basketId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
            },
        })

        if (!response.ok) {
            return new Promise((resolve) =>
                resolve({
                    isError: true,
                    error: {
                        code: ERROR_CODES.INVALID_BASKET,
                        message: 'Invalid basket',
                    },
                    buyerEmail: '',
                } as { buyerEmail: string } & ApiResponse),
            )
        }

        return response.json()
    } catch {
        return new Promise((resolve) =>
            resolve({
                isError: true,
                error: {
                    code: ERROR_CODES.INVALID_BASKET,
                    message: 'Invalid basket',
                },
                buyerEmail: '',
            } as { buyerEmail: string } & ApiResponse),
        )
    }
}

type CreateTransactionRequest = {
    transactionId: string
    buyerEmail: string
    buyerId?: number
    createdAt: string
    price: number
    paidPrice: number
    basketId: string
    productIds: number[]
}
async function createPendintTransactionRequestToAdminPanel(
    transactionRequest: CreateTransactionRequest,
) {
    try {
        const response = await fetch(adminURL + '/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
            },
            body: JSON.stringify(transactionRequest),
        })

        if (!response.ok) {
            console.error(
                'Pending transaction could not be created',
                await response.json(),
            )
            return
        }
    } catch (error) {
        console.error('Error creating pending transaction:', error)
    }
}

async function createOrderRequest(
    data: CreateOrderRequest,
): Promise<CreateOrderResponse & ApiResponse> {
    try {
        const response = await fetch(baseURL + '/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            return new Promise((resolve) =>
                resolve({
                    isError: true,
                    error: {
                        code: ERROR_CODES.ORDER_REQUEST_FAILED,
                        message: 'Order request failed',
                    },
                    id: '',
                } as CreateOrderResponse & ApiResponse),
            )
        }

        return response.json()
    } catch {
        return new Promise((resolve) =>
            resolve({
                isError: true,
                error: {
                    code: ERROR_CODES.ORDER_REQUEST_FAILED,
                    message: 'Order request failed',
                },
                id: '',
            } as CreateOrderResponse & ApiResponse),
        )
    }
}

export async function POST(req: Request) {
    const formData = await req.formData()
    //console.log('formData', formData)

    const token = formData.get('token')

    if (!token) {
        return redirect('/checkout/failure')
    }

    // Get payment status from Iyzipay
    const Iyzipay = require('iyzipay')
    const iyzipay = new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY,
        secretKey: process.env.IYZICO_SECRET_KEY,
        uri: process.env.IYZICO_BASE_URL,
    })

    const request = {
        locale: 'tr',
        token: token,
    }
    const paymentResult: PaymentResult = await new Promise(
        (resolve, reject) => {
            iyzipay.checkoutForm.retrieve(
                request,
                function (err: never, result: never) {
                    if (err) return reject(err)
                    resolve(result)
                },
            )
        },
    )
    console.log('Payment Result:', paymentResult)

    if (paymentResult.status !== 'success') {
        // Payment failed
        return redirect('/checkout/failure')
    }

    const productIds = paymentResult.itemTransactions
        .filter((item) => item.itemId !== 'SHIPPING')
        .map((item) => parseInt(item.itemId))
    const shipmentItem = paymentResult.itemTransactions.find(
        (item) => item.itemId === 'SHIPPING',
    )
    const shipmentPrice = shipmentItem ? shipmentItem.price : 0

    const basket = await getBasketRequest(paymentResult.basketId)

    if (basket.isError) {
        await createPendintTransactionRequestToAdminPanel({
            transactionId: paymentResult.paymentId,
            price: paymentResult.price,
            paidPrice: paymentResult.paidPrice,
            basketId: paymentResult.basketId,
            buyerEmail: 'UNKNOW_ERR_INVALID_BASKET',
            createdAt: new Date(paymentResult.systemTime).toISOString(),
            productIds: productIds,
        })
        return redirect('/checkout/success?')
    }

    const order = await createOrderRequest({
        price: paymentResult.price,
        paidPrice: paymentResult.paidPrice,
        installment: paymentResult.installment,
        cardLastFourDigits: paymentResult.lastFourDigits,
        iyzicoPaymentId: paymentResult.paymentId,
        productIds: productIds,
        buyerEmail: basket.buyerEmail,
        buyerId: basket.buyerId,
        shipmentPrice: shipmentPrice,
    })
    if (order.isError) {
        await createPendintTransactionRequestToAdminPanel({
            transactionId: paymentResult.paymentId,
            price: paymentResult.price,
            paidPrice: paymentResult.paidPrice,
            basketId: paymentResult.basketId,
            buyerEmail: basket.buyerEmail,
            buyerId: basket.buyerId,
            createdAt: new Date(paymentResult.systemTime).toISOString(),
            productIds: productIds,
        })
        return redirect('/checkout/success?')
    }

    const queryParams = new URLSearchParams()
    queryParams.append('order', order.id)
    queryParams.append('price', paymentResult.paidPrice.toString())

    return redirect('/checkout/success?' + queryParams.toString())
}
