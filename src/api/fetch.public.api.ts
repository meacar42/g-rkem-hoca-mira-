export const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function fetchPublicAPI<T>(
    url: string,
    options: RequestInit = {},
    next?: NextFetchRequestConfig | undefined,
): Promise<T> {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    }

    const headers = new Headers({
        ...defaultHeaders,
        ...options.headers,
    })

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            next,
        })

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
        console.error('Fetch Public API Error:', error)
        throw error
    }
}
