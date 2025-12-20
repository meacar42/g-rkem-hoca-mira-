import {
    getToken,
    getRefreshToken,
    setAccessToken,
    clearTokens,
} from '@/utils/auth'
import { refreshTokenAPI } from '@/api/auth/refresh.api'

// Token yenileme işlemi devam ediyorsa diğer isteklerin beklemesi için
let isRefreshing = false
let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
        clearTokens()
        throw new Error('No refresh token found')
    }

    try {
        const response = await refreshTokenAPI({ refresh_token: refreshToken })

        setAccessToken(response.access_token)

        return response.access_token
    } catch (error) {
        console.error('Auth: Failed to refresh token:', error)
        clearTokens()
        throw new Error('Session expired. Please login again.')
    }
}

export async function fetchAuthAPI<T>(
    url: string,
    options: RequestInit = {},
    next?: NextFetchRequestConfig | undefined,
): Promise<T> {
    let token = getToken()

    if (!token) {
        throw new Error('No authentication token found')
    }

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    }

    const makeRequest = async (accessToken: string): Promise<Response> => {
        const headers = new Headers({
            ...defaultHeaders,
            ...options.headers,
        })

        headers.set('Authorization', `Bearer ${accessToken}`)

        return fetch(url, {
            ...options,
            headers,
            next,
        })
    }

    try {
        let response = await makeRequest(token)

        if (response.status === 401) {
            console.log('Auth: Received 401, attempting to refresh token...')

            if (isRefreshing && refreshPromise) {
                token = await refreshPromise
            } else {
                isRefreshing = true
                refreshPromise = refreshAccessToken()

                try {
                    token = await refreshPromise
                } finally {
                    isRefreshing = false
                    refreshPromise = null
                }
            }
            response = await makeRequest(token)
        }

        if (!response.ok) {
            let errorMessage = `HTTP Error: ${response.status}`
            try {
                const errorData = await response.json()
                errorMessage =
                    errorData.message || errorData.error || errorMessage
            } catch {
                errorMessage = response.statusText || errorMessage
            }
            throw new Error(errorMessage)
        }

        return await response.json()
    } catch (error) {
        console.error('Fetch Auth API Error:', error)
        throw error
    }
}
