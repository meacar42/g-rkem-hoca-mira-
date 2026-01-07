import { fetchPublicAPI } from '@/api/fetch.public.api'

export interface IRefreshTokenRequest {
    refresh_token: string
}

export interface IRefreshTokenResponse {
    access_token: string
}

export async function refreshTokenAPI(
    request: IRefreshTokenRequest,
): Promise<IRefreshTokenResponse> {
    return fetchPublicAPI<IRefreshTokenResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/refresh',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )
}
