'use client'
import React, { createContext, useState, useEffect } from 'react'
import { loginAPI } from "@/api/auth/login.api"
import { getMeAPI } from "@/api/auth/me.api"
import { setTokens, clearTokens, getToken } from "@/utils/auth"

export type ICurrentUser = {
    id: number
    email: string
    name: string | null
    surname: string | null
    phone: string | null
    role: string
}

type UserContextType = {
    currentUser: ICurrentUser | null
    login: (email: string, password: string) => Promise<ICurrentUser>
    logout: () => void
}

export const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({
    currentUser,
    children,
}: {
    currentUser: ICurrentUser | null
    children: React.ReactNode
}) {
    console.log('User Provider currentUser:', currentUser)

    const [user, setUser] = useState<ICurrentUser | null>(currentUser)

    async function login(email: string, password: string): Promise<ICurrentUser> {
        try {
            console.log('🔐 Login: Starting login process...')
            const response = await loginAPI({ email, password })
            console.log('✅ Login: Token received')

            // Token'ları kaydet
            setTokens(response.token, response.refresh_token)
            console.log('💾 Login: Tokens saved to localStorage')

            // /me endpoint'inden user bilgilerini al
            console.log('👤 Login: Fetching user data from /me...')
            const userData = await getMeAPI()
            console.log('✅ Login: User data received:', {
                id: userData.id,
                email: userData.email,
                role: userData.role
            })

            setUser(userData)
            return userData
        } catch (error) {
            console.error('❌ Login error:', error)
            // Token'ları temizle hata durumunda
            clearTokens()
            throw error
        }
    }

    function logout() {
        clearTokens()
        setUser(null)
    }

    // Sayfa yenilendiğinde token varsa user'ı restore et
    useEffect(() => {
        const token = getToken()
        if (token && !user) {
            // Token varsa /me endpoint'inden user bilgilerini al
            getMeAPI()
                .then((userData) => {
                    setUser(userData)
                })
                .catch((error) => {
                    console.error('Failed to restore user session:', error)
                    // Token geçersizse temizle
                    clearTokens()
                })
        }
    }, [])

    const value: UserContextType = {
        currentUser: user,
        login,
        logout,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
