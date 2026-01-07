import { fetchAuthAPI } from '@/api/fetch.auth.api'
import { ICurrentUser } from '@/contexts/user-context'

export async function getMeAPI(): Promise<ICurrentUser> {
    return fetchAuthAPI<ICurrentUser>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/me',
        {
            method: 'GET',
        },
    )
}
