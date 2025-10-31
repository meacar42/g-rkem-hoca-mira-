export async function fetchPublicAPI<T>(
    url: string,
    options: RequestInit = {},
    next?: NextFetchRequestConfig | undefined,
): Promise<T | null> {
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
        return response.ok ? await response.json() : null
    } catch (error) {
        console.error('Fetch Public API Error:', error)
        return null
    }
}
