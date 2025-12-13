import { fetchPublicAPI } from '@/api/fetch.public.api'

export interface IRegisterRequest {
    email: string
    password: string
}

export interface IRegisterResponse {
    access_token: string
    refresh_token: string
}

export async function registerAPI(
    request: IRegisterRequest,
): Promise<IRegisterResponse> {
    return fetchPublicAPI<IRegisterResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + 'auth/register',
        {
            method: 'POST',
            body: JSON.stringify(request),
        },
    )
}
