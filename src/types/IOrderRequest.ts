// Sipariş talebi için adres bilgisi
export interface IOrderRequestAddress {
    cityId: number
    districtId: number
    addressDetail: string
    phone?: string
}

// Sipariş talebindeki ürün bilgisi
export interface IOrderRequestItem {
    productId: number
    quantity: number
    unitPrice: number
}

// Kullanıcı bilgileri (giriş yapmış kullanıcı için)
export interface IOrderRequestUser {
    id: number
    email: string
    name?: string
    surname?: string
    phone?: string
}

// Misafir kullanıcı bilgileri
export interface IOrderRequestGuest {
    email: string
    name?: string
    surname?: string
    phone: string
}

// Sipariş talebi durumları
export enum OrderRequestStatus {
    PENDING = 'pending', // Ödeme bekleniyor
    PAID = 'paid', // Ödeme yapıldı, admin onayı bekleniyor
    APPROVED = 'approved', // Admin onayladı, siparişe dönüştürüldü
    REJECTED = 'rejected', // Admin reddetti
    CANCELLED = 'cancelled', // İptal edildi
    EXPIRED = 'expired', // Süresi doldu
}

// Sipariş talebi (OrderRequest) - Admin onayı öncesi
export interface IOrderRequest {
    id: number
    requestNumber: string
    status: OrderRequestStatus

    // Kullanıcı bilgileri
    isGuest: boolean
    user?: IOrderRequestUser
    guest?: IOrderRequestGuest

    // Ürünler
    items: IOrderRequestItem[]

    // Adres bilgileri
    shippingAddressId?: number
    shippingAddress?: IOrderRequestAddress
    billingAddressId?: number
    billingAddress?: IOrderRequestAddress
    billingAddressSameAsShipping: boolean

    // Fiyat bilgileri
    subtotal: number
    shippingCost: number
    tax: number
    total: number

    // Tarihler
    createdAt: string
    updatedAt: string
    paidAt?: string
    expiresAt?: string
}

// Sipariş talebi oluşturma isteği
export interface ICreateOrderRequestPayload {
    // Kullanıcı bilgileri
    isGuest: boolean
    user?: {
        id: number
        email: string
        name?: string
        surname?: string
        phone?: string
    }
    guest?: {
        email: string
        name?: string
        surname?: string
        phone: string
    }

    // Adres bilgileri (giriş yapmış kullanıcı için ID)
    shippingAddressId?: number
    billingAddressId?: number

    // Adres bilgileri (misafir kullanıcı için detay)
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

    products: {
        productId: number
        quantity: number
    }[]
}

// Sipariş talebi oluşturma yanıtı
export interface ICreateOrderRequestResponse {
    orderRequest: IOrderRequest
    message: string
}

// Sipariş talebini onaylama sonrası (Order'a dönüşüm)
export interface IApproveOrderRequestResponse {
    orderId: number
    orderNumber: string
    message: string
}
