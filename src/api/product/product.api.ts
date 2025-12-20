import { IProduct } from '@/types/IProduct'
import { fetchPublicAPI } from '@/api/fetch.public.api'

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/products'

export async function getProductsAPI() {
    console.log(API_BASE)
    return fetchPublicAPI<IProduct[]>(API_BASE)
}

export async function getProductDetailAPI(
    id: number,
): Promise<IProduct | undefined> {
    return fetchPublicAPI<IProduct>(`${API_BASE}/${id}`)
}
