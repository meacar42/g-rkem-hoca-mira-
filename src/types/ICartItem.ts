// Local storage'da saklanan basit cart item
export interface LocalCartItem {
    productId: number
    quantity: number
}

// Local storage'daki basit cart
export interface LocalCart {
    items: LocalCartItem[]
}

// Backend'den gelen ürün bilgisi
export interface CartProduct {
    id: number
    name: string
    price: number
    discount?: number
    images: string[]
    stockQuantity: number
    isActive?: boolean
    description?: string
}

// Backend'den gelen cart item (ürün bilgisiyle birlikte)
export interface CartItem {
    id?: number
    productId: number
    quantity: number
    product: CartProduct
}

// Backend'den gelen tam cart response
export interface Cart {
    id?: number
    products: CartItem[]
}

// Guest cart info response (productsNotFound dahil)
export interface GuestCartInfoResponse {
    products: CartProduct[]
    productsNotFound?: number[]
}
