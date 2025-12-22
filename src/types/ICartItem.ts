export interface CartItemProduct {
    id: number
    name: string
    price: number
    discount?: number
    imageUrl?: string
    stockQuantity: number
    isActive?: boolean
}

export interface CartItem {
    id?: number
    productId: number
    quantity: number
    product?: CartItemProduct
}

export interface Cart {
    id?: number
    items: CartItem[]
    subtotal?: number
    total?: number
    itemCount?: number
}
