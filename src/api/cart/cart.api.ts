import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { Cart } from '@/types/ICartItem'

const API_BASE = '/api/cart'

export async function getCart() {
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
