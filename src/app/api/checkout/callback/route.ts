// app/api/pay-callback/route.ts
import { redirect } from 'next/navigation'

type PaymentResult = {
    status: string
    conversationId: string
    price: number
    paidPrice: number
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

    const queryParams = new URLSearchParams()
    queryParams.append('order', '12456')
    queryParams.append('price', paymentResult.paidPrice.toString())

    return redirect('/checkout/success?' + queryParams.toString())
}
