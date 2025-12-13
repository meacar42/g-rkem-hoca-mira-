import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { ICurrentUser } from '@/contexts/user-context'

export interface IUpdateProfileRequest {
    name?: string
    surname?: string
    phone?: string
    email?: string
    password?: string
}

export type IUpdateProfileResponse = ICurrentUser

export async function updateProfileAPI(
    request: IUpdateProfileRequest,
): Promise<IUpdateProfileResponse> {
    return fetchAuthAPI<IUpdateProfileResponse>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + 'auth/me',
        {
            method: 'PUT',
            body: JSON.stringify(request),
        },
    )
}
