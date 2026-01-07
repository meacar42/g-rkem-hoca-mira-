import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { fetchPublicAPI } from '@/api/fetch.public.api'
import {
    Cart,
    CartItem,
    LocalCartItem,
    GuestCartInfoResponse,
} from '@/types/ICartItem'

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL

// Backend cart response tipi
interface BackendCartResponse {
    id: number
    items: {
        id: number
        quantity: number
        product: CartItem['product']
    }[]
}

// Backend response'unu frontend Cart tipine dönüştür
function mapBackendCartToCart(backendCart: BackendCartResponse): Cart {
    return {
        id: backendCart.id,
        products: backendCart.items
            .filter((item) => item.product != null)
            .map((item) => ({
                id: item.id,
                productId: item.product.id,
                quantity: item.quantity,
                product: item.product,
            })),
    }
}

// Giriş yapmış kullanıcı için cart işlemleri
export async function getCart(): Promise<Cart> {
    const backendCart = await fetchAuthAPI<BackendCartResponse>(
        API_BASE + '/cart',
    )
    return mapBackendCartToCart(backendCart)
}

export async function addItem(
    productId: number,
    quantity: number,
): Promise<Cart> {
    const backendCart = await fetchAuthAPI<BackendCartResponse>(
        `${API_BASE}/cart/items`,
        {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        },
    )
    return mapBackendCartToCart(backendCart)
}

export async function updateItem(
    itemId: number,
    quantity: number,
): Promise<Cart> {
    const backendCart = await fetchAuthAPI<BackendCartResponse>(
        `${API_BASE}/cart/items/${itemId}`,
        {
            method: 'PUT',
            body: JSON.stringify({ quantity }),
        },
    )
    return mapBackendCartToCart(backendCart)
}

export async function removeItem(itemId: number): Promise<Cart> {
    const response = await fetchAuthAPI<{
        message: string
        cart: BackendCartResponse
    }>(`${API_BASE}/cart/items/${itemId}`, {
        method: 'DELETE',
    })
    return mapBackendCartToCart(response.cart)
}

export async function clearCart(): Promise<void> {
    return fetchAuthAPI<void>(`${API_BASE}/cart`, {
        method: 'DELETE',
    })
}

export async function mergeCart(
    items: { productId: number; quantity: number }[],
): Promise<Cart> {
    const backendCart = await fetchAuthAPI<BackendCartResponse>(
        `${API_BASE}/cart/merge`,
        {
            method: 'POST',
            body: JSON.stringify({ items }),
        },
    )
    return mapBackendCartToCart(backendCart)
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
