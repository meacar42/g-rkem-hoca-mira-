import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { fetchPublicAPI } from '@/api/fetch.public.api'
import {
    IOrderRequest,
    ICreateOrderRequestPayload,
    ICreateOrderRequestResponse,
} from '@/types/IOrderRequest'
import { IOrder } from '@/types/IOrder'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL

// ==================== ORDER REQUEST (Sipariş Talebi) ====================

// Giriş yapmış kullanıcı için sipariş talebi oluştur
export async function createOrderRequestAPI(
    request: ICreateOrderRequestPayload,
): Promise<ICreateOrderRequestResponse> {
    return fetchAuthAPI<ICreateOrderRequestResponse>(
        baseURL + '/order-requests',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )
}

// Misafir kullanıcı için sipariş talebi oluştur
export async function createGuestOrderRequestAPI(
    request: ICreateOrderRequestPayload,
): Promise<ICreateOrderRequestResponse> {
    return fetchPublicAPI<ICreateOrderRequestResponse>(
        baseURL + '/order-requests/guest',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )
}

// Sipariş talebi detayını getir (giriş yapmış kullanıcı)
export async function getOrderRequestByIdAPI(
    orderRequestId: number,
): Promise<IOrderRequest> {
    return fetchAuthAPI<IOrderRequest>(
        baseURL + `/order-requests/${orderRequestId}`,
        {
            method: 'GET',
        },
    )
}

// Kullanıcının tüm sipariş taleplerini getir
export async function getOrderRequestsAPI(): Promise<IOrderRequest[]> {
    return fetchAuthAPI<IOrderRequest[]>(baseURL + '/order-requests', {
        method: 'GET',
    })
}

// Sipariş talebi numarasıyla getir (misafir kullanıcılar için takip)
export async function getOrderRequestByNumberAPI(
    requestNumber: string,
    email: string,
): Promise<IOrderRequest> {
    return fetchPublicAPI<IOrderRequest>(
        baseURL +
            `/order-requests/track?requestNumber=${requestNumber}&email=${encodeURIComponent(email)}`,
        {
            method: 'GET',
        },
    )
}

// Sipariş talebini iptal et
export async function cancelOrderRequestAPI(
    orderRequestId: number,
): Promise<IOrderRequest> {
    return fetchAuthAPI<IOrderRequest>(
        baseURL + `/order-requests/${orderRequestId}/cancel`,
        {
            method: 'POST',
        },
    )
}

// ==================== ORDER (Onaylanmış Sipariş) ====================

// Sipariş detayını getir
export async function getOrderByIdAPI(orderId: number): Promise<IOrder> {
    return fetchAuthAPI<IOrder>(baseURL + `/orders/${orderId}`, {
        method: 'GET',
    })
}

// Kullanıcının tüm siparişlerini getir
export async function getOrdersAPI(): Promise<IOrder[]> {
    return fetchAuthAPI<IOrder[]>(baseURL + '/orders', {
        method: 'GET',
    })
}

// Sipariş numarasıyla sipariş getir (misafir kullanıcılar için)
export async function getOrderByNumberAPI(
    orderNumber: string,
    email: string,
): Promise<IOrder> {
    return fetchPublicAPI<IOrder>(
        baseURL +
            `/orders/track?orderNumber=${orderNumber}&email=${encodeURIComponent(email)}`,
        {
            method: 'GET',
        },
    )
}
