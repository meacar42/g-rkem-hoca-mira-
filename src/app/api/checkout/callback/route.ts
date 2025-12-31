// app/api/pay-callback/route.ts
import { redirect } from 'next/navigation'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL

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
    itemTransactions: {
        itemId: string
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
): Promise<{ buyerEmail: string; buyerId?: number }> {
    const response = await fetch(baseURL + `/orders/basket/${basketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
        },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Sepet bilgisi alınamadı')
    }

    return response.json()
}

async function createOrderRequest(
    data: CreateOrderRequest,
): Promise<CreateOrderResponse> {
    const response = await fetch(baseURL + '/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Sipariş oluşturulamadı')
    }

    return response.json()
}

export async function POST(req: Request) {
    const formData = await req.formData()
    console.log('formData', formData)

    const token = formData.get('token')

    if (!token) {
        return redirect('/checkout/failure')
    }

    // Get payment status from Iyzipay
    const Iyzipay = require('iyzipay')
    const iyzipay = new Iyzipay({
        apiKey: 'sandbox-8te0rjAwusnpviNR3RrkZYptaFbSFBUN',
        secretKey: 'X2C8teB60VkPLB50hWaL9noJmNbt9NXN',
        uri: 'https://sandbox-api.iyzipay.com',
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
        return redirect('/checkout/failure')
    }

    const basket = await getBasketRequest(paymentResult.basketId)

    const productIds = paymentResult.itemTransactions
        .filter((item) => item.itemId !== 'SHIPPING')
        .map((item) => parseInt(item.itemId))
    const shipmentItem = paymentResult.itemTransactions.find(
        (item) => item.itemId === 'SHIPPING',
    )
    const shipmentPrice = shipmentItem
        ? paymentResult.paidPrice - paymentResult.price
        : 0

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

    const queryParams = new URLSearchParams()
    queryParams.append('order', order.id)
    queryParams.append('price', paymentResult.paidPrice.toString())

    return redirect('/checkout/success?' + queryParams.toString())
}
