import { fetchPublicAPI } from '@/api/fetch.public.api'

export interface ILoginRequest {
    email: string
    password: string
}

export interface ILoginResponse {
    access_token: string
    refresh_token: string
}

export async function loginAPI(
    request: ILoginRequest,
): Promise<ILoginResponse> {
    return fetchPublicAPI<ILoginResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/login',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )
}
