import { IProduct, ProductType } from '@/types/IProduct'
import { fetchPublicAPI } from '@/api/fetch.public.api'

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/products'

export interface IProductsResponse {
    data: IProduct[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface IProductsParams {
    type?: ProductType
    page?: number
    limit?: number
    sortBy?: 'price'
    sortOrder?: 'asc' | 'desc'
}

export async function getProductsAPI(
    params?: IProductsParams,
): Promise<IProductsResponse> {
    const searchParams = new URLSearchParams()

    if (params?.type) {
        searchParams.set('type', params.type)
    }
    if (params?.page) {
        searchParams.set('page', params.page.toString())
    }
    if (params?.limit) {
        searchParams.set('limit', params.limit.toString())
    }
    if (params?.sortBy) {
        searchParams.set('sortBy', params.sortBy)
    }
    if (params?.sortOrder) {
        searchParams.set('sortOrder', params.sortOrder)
    }

    const queryString = searchParams.toString()
    const url = queryString ? `${API_BASE}?${queryString}` : API_BASE

    return fetchPublicAPI<IProductsResponse>(url)
}

export async function getProductDetailAPI(
    id: number,
): Promise<IProduct | undefined> {
    return fetchPublicAPI<IProduct>(`${API_BASE}/${id}`)
}
