export interface IOrderItem {
    id: number
    productId: number
    productName: string
    productImage?: string
    quantity: number
    unitPrice: number
    totalPrice: number
}

export interface IOrderAddress {
    cityId: number
    cityName: string
    districtId: number
    districtName: string
    addressDetail: string
    phone?: string
}

export interface IOrder {
    id: number
    orderNumber: string
    status: OrderStatus
    items: IOrderItem[]
    shippingAddress: IOrderAddress
    billingAddress: IOrderAddress
    subtotal: number
    shippingCost: number
    tax: number
    total: number
    createdAt: string
    updatedAt: string
}

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export interface ICreateOrderRequest {
    shippingAddressId?: number
    billingAddressId?: number
    shippingAddress?: {
        cityId: number
        districtId: number
        addressDetail: string
        phone: string
    }
    billingAddress?: {
        cityId: number
        districtId: number
        addressDetail: string
    }
    billingAddressSameAsShipping: boolean
}

export interface ICreateOrderResponse {
    order: IOrder
    message: string
}
