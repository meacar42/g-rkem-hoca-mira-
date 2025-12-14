export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null

    return localStorage.getItem('token')
}

export const getRefreshToken = (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refresh_token')
}

export const setTokens = (token: string, refreshToken: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('token', token)
    localStorage.setItem('refresh_token', refreshToken)
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
