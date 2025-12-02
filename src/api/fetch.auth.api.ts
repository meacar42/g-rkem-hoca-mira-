import { getToken } from "@/utils/auth"

export async function fetchAuthAPI<T>(
    url: string,
    options: RequestInit = {},
    next?: NextFetchRequestConfig | undefined,
): Promise<T> {
    const token = getToken()

    if (!token) {
        throw new Error('No authentication token found')
    }

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    }

    // Headers objesini oluştur
    const headers = new Headers({
        ...defaultHeaders,
        ...options.headers,
    })

    // Authorization header'ını her zaman üzerine yaz (override edilemez)
    headers.set('Authorization', `Bearer ${token}`)

    console.log('🔑 Auth API Request:', {
        url,
        hasToken: !!token,
        authHeader: headers.get('Authorization')?.substring(0, 20) + '...'
    })

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            next,
        })

        if (!response.ok) {
            // 401 Unauthorized - Token geçersiz veya expired
            if (response.status === 401) {
                // TODO: Refresh token ile yeni token al
                console.error('Unauthorized - Token may be expired')
            }

            // Hata mesajını almaya çalış
            let errorMessage = `HTTP Error: ${response.status}`
            try {
                const errorData = await response.json()
                errorMessage = errorData.message || errorData.error || errorMessage
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
