'use client'
import React, { createContext, useState, useEffect } from 'react'
import { loginAPI } from '@/api/auth/login.api'
import { registerAPI } from '@/api/auth/register.api'
import { getMeAPI } from '@/api/auth/me.api'
import { setTokens, clearTokens, getToken } from '@/utils/auth'

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
    register: (email: string, password: string) => Promise<ICurrentUser>
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

    async function login(
        email: string,
        password: string,
    ): Promise<ICurrentUser> {
        try {
            const response = await loginAPI({ email, password })

            setTokens(response.access_token, response.refresh_token)

            const userData = await getMeAPI()
            console.log('✅ Login: User data received:', {
                id: userData.id,
                email: userData.email,
                role: userData.role,
            })

            setUser(userData)
            return userData
        } catch (error) {
            console.error('❌ Login error:', error)
            clearTokens()
            throw error
        }
    }

    async function register(
        email: string,
        password: string,
    ): Promise<ICurrentUser> {
        try {
            const response = await registerAPI({ email, password })

            setTokens(response.access_token, response.refresh_token)

            const userData = await getMeAPI()
            console.log('✅ Register: User data received:', {
                id: userData.id,
                email: userData.email,
                role: userData.role,
            })

            setUser(userData)
            return userData
        } catch (error) {
            console.error('❌ Register error:', error)
            clearTokens()
            throw error
        }
    }

    function logout() {
        clearTokens()
        setUser(null)
    }

    useEffect(() => {
        const token = getToken()
        if (token && !user) {
            getMeAPI()
                .then((userData) => {
                    setUser(userData)
                })
                .catch((error) => {
                    console.error(
                        '❌ Auth: Failed to restore user session:',
                        error,
                    )
                    clearTokens()
                })
        }
    }, [])

    const value: UserContextType = {
        currentUser: user,
        login,
        register,
        logout,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
