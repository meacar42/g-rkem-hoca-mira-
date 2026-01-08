import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { fetchPublicAPI } from '@/api/fetch.public.api'
import {
    IProductReviewsResponse,
    ICanReviewResponse,
    ICreateReviewDto,
    IReview,
} from '@/types/IReview'

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL

// Ürüne ait yorumları getir (public)
export async function getProductReviewsAPI(
    productId: number,
): Promise<IProductReviewsResponse> {
    return fetchPublicAPI<IProductReviewsResponse>(
        `${API_BASE}/reviews/product/${productId}`,
        {
            method: 'GET',
        },
    )
}

// Kullanıcının yorum yapıp yapamayacağını kontrol et (auth)
export async function canReviewProductAPI(
    productId: number,
): Promise<ICanReviewResponse> {
    return fetchAuthAPI<ICanReviewResponse>(
        `${API_BASE}/reviews/can-review/${productId}`,
        {
            method: 'GET',
        },
    )
}

// Yeni yorum oluştur (auth)
export async function createReviewAPI(
    data: ICreateReviewDto,
): Promise<IReview> {
    return fetchAuthAPI<IReview>(`${API_BASE}/reviews`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}
