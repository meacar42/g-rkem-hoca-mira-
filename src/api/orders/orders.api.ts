import { fetchAuthAPI } from '@/api/fetch.auth.api'

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL

// Siparişteki ürün detayları
export interface IOrderProduct {
    id: number
    name: string
    image: string
    price: number
}

// Backend'den gelen sipariş response tipi
export interface IOrder {
    id: string
    iyzicoPaymentId: string
    price: number
    paidPrice: number
    installment: number
    cardLastFourDigits: string
    buyerId?: number
    buyerEmail: string
    status: OrderStatus
    shipmentPrice: number
    shipmentTrackingNumber?: string | null
    shipmentURL?: string | null
    createdAt: string
    products: IOrderProduct[]
}

export type OrderStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'

// Status'a göre Türkçe metin ve renk
export const ORDER_STATUS_MAP: Record<
    OrderStatus,
    { label: string; color: string }
> = {
    PENDING: {
        label: 'Onay Bekliyor',
        color: 'bg-yellow-100 text-yellow-700',
    },
    PROCESSING: {
        label: 'Hazırlanıyor',
        color: 'bg-blue-100 text-blue-700',
    },
    SHIPPED: {
        label: 'Kargoda',
        color: 'bg-purple-100 text-purple-700',
    },
    DELIVERED: {
        label: 'Teslim Edildi',
        color: 'bg-emerald-100 text-emerald-700',
    },
    CANCELLED: {
        label: 'İptal Edildi',
        color: 'bg-red-100 text-red-700',
    },
}

// Kullanıcının siparişlerini getir
export async function getMyOrdersAPI(): Promise<IOrder[]> {
    return fetchAuthAPI<IOrder[]>(`${API_BASE}/orders/my-orders`, {
        method: 'GET',
    })
}
