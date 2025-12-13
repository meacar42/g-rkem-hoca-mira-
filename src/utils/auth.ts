export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null
    const token = localStorage.getItem('token')
    console.log('🔍 Auth: Getting token from localStorage', {
        hasToken: !!token,
        tokenPreview: token ? token.substring(0, 20) + '...' : 'null',
    })
    return token
}

export const getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refresh_token')
}

export const setTokens = (token: string, refreshToken: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('token', token)
    localStorage.setItem('refresh_token', refreshToken)
    console.log('🔑 Auth: Tokens set in localStorage', {
        tokenLength: token?.length,
        refreshTokenLength: refreshToken?.length,
        tokenPreview: token?.substring(0, 20) + '...',
    })
}

export const setAccessToken = (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('token', token)
}

export const clearTokens = (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
}
