import { fetchAuthAPI } from '@/api/fetch.auth.api'

// Backend'den gelen raw response
export interface IAddressResponse {
    id: number
    title: string
    fullName?: string
    phone?: string
    city: {
        id: number
        name: string
    }
    district: {
        id: number
        name: string
    }
    addressDetail: string
    postalCode?: string | null
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

// Frontend'de kullandığımız format
export interface IAddress {
    id: number
    title: string
    fullName: string
    phone: string
    cityId: number
    cityName?: string
    districtId: number
    districtName?: string
    addressDetail: string
    postalCode?: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

// Response'u Address'e dönüştür
function mapResponseToAddress(response: IAddressResponse): IAddress {
    return {
        id: response.id,
        title: response.title,
        fullName: response.fullName || '',
        phone: response.phone || '',
        cityId: response.city.id,
        cityName: response.city.name,
        districtId: response.district.id,
        districtName: response.district.name,
        addressDetail: response.addressDetail,
        postalCode: response.postalCode || undefined,
        isDefault: response.isDefault,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
    }
}

export interface ICreateAddressRequest {
    title: string
    fullName?: string
    phone?: string
    cityId: number
    districtId: number
    addressDetail: string
    postalCode?: string
    isDefault?: boolean
}

export interface IUpdateAddressRequest {
    title?: string
    fullName?: string
    phone?: string
    cityId?: number
    districtId?: number
    addressDetail?: string
    postalCode?: string
    isDefault?: boolean
}

// Tüm adresleri getir
export async function getAddressesAPI(): Promise<IAddress[]> {
    const responses = await fetchAuthAPI<IAddressResponse[]>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + 'users/addresses',
        {
            method: 'GET',
        },
    )
    return responses.map(mapResponseToAddress)
}

// Belirli bir adresi getir
export async function getAddressByIdAPI(addressId: number): Promise<IAddress> {
    const response = await fetchAuthAPI<IAddressResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
            `users/addresses/${addressId}`,
        {
            method: 'GET',
        },
    )
    return mapResponseToAddress(response)
}

// Yeni adres oluştur
export async function createAddressAPI(
    request: ICreateAddressRequest,
): Promise<IAddress> {
    const response = await fetchAuthAPI<IAddressResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + 'users/addresses',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )
    return mapResponseToAddress(response)
}

// Adresi güncelle
export async function updateAddressAPI(
    addressId: number,
    request: IUpdateAddressRequest,
): Promise<IAddress> {
    const response = await fetchAuthAPI<IAddressResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
            `users/addresses/${addressId}`,
        {
            method: 'PUT',
            body: JSON.stringify(request),
        },
    )
    return mapResponseToAddress(response)
}

// Adresi sil
export async function deleteAddressAPI(
    addressId: number,
): Promise<{ message: string }> {
    return fetchAuthAPI<{ message: string }>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
            `users/addresses/${addressId}`,
        {
            method: 'DELETE',
        },
    )
}

// Varsayılan adres olarak ayarla
export async function setDefaultAddressAPI(
    addressId: number,
): Promise<IAddress> {
    const response = await fetchAuthAPI<IAddressResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
            `users/addresses/${addressId}/set-default`,
        {
            method: 'POST',
        },
    )
    return mapResponseToAddress(response)
}
