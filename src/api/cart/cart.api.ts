import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { fetchPublicAPI } from '@/api/fetch.public.api'
import { Cart, LocalCartItem, GuestCartInfoResponse } from '@/types/ICartItem'

const API_BASE = '/api/cart'

// Giriş yapmış kullanıcı için cart işlemleri
export async function getCart(): Promise<Cart> {
    return fetchAuthAPI<Cart>(API_BASE)
}

export async function addItem(
    productId: number,
    quantity: number,
): Promise<Cart> {
    return fetchAuthAPI<Cart>(`${API_BASE}/items`, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    })
}

export async function updateItem(
    itemId: number,
    quantity: number,
): Promise<Cart> {
    return fetchAuthAPI<Cart>(`${API_BASE}/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
    })
}

export async function removeItem(itemId: number): Promise<Cart> {
    return fetchAuthAPI<Cart>(`${API_BASE}/items/${itemId}`, {
        method: 'DELETE',
    })
}

export async function clearCart(): Promise<void> {
    return fetchAuthAPI<void>(API_BASE, {
        method: 'DELETE',
    })
}

export async function mergeCart(
    items: { productId: number; quantity: number }[],
): Promise<Cart> {
    return fetchAuthAPI<Cart>(`${API_BASE}/merge`, {
        method: 'POST',
        body: JSON.stringify({ items }),
    })
}

// Misafir kullanıcı için cart bilgisi alma (public endpoint)
export async function getGuestCartInfo(
    items: LocalCartItem[],
): Promise<GuestCartInfoResponse> {
    return fetchPublicAPI<GuestCartInfoResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/cart/guest/info',
        {
            method: 'POST',
            body: JSON.stringify({ products: items }),
        },
    )
}
