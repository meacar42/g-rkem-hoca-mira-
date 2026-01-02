'use server'

enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
}

interface OrderData {
    orderId: string
    customerEmail: string
    status: OrderStatus
    createdAt: string
    estimatedDelivery?: string
}

async function getOrder(
    orderId: string,
    email: string,
): Promise<OrderData | null> {
    console.log('Fetching order with ID:', orderId, 'and email:', email)
    const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/orders/order-track',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.API_BASIC_AUTH_SECRET,
            },
            body: JSON.stringify({ orderId, email }),
            cache: 'no-store',
        },
    )

    if (!response.ok) {
        const error = await response.json()
        console.error('Error fetching order:', error)
        throw new Error(error.message || 'Sipariş bilgisi alınamadı')
    }

    return await response.json()
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY

    if (!secretKey) {
        console.error('TURNSTILE_SECRET_KEY is not configured')
        return false
    }

    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }),
        },
    )

    const data = await response.json()
    return data.success === true
}

export async function trackOrder(
    orderId: string,
    email: string,
    turnstileToken: string,
): Promise<OrderData> {
    const isValidToken = await verifyTurnstileToken(turnstileToken)
    if (!isValidToken) {
        throw new Error('Güvenlik doğrulaması başarısız')
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = await getOrder(orderId, email)
    if (!order) {
        throw new Error('Sipariş bulunamadı')
    }

    return order
}
