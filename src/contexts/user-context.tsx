'use client'
import React, { createContext, useState, useEffect } from 'react'
import { loginAPI } from '@/api/auth/login.api'
import { registerAPI } from '@/api/auth/register.api'
import { getMeAPI } from '@/api/auth/me.api'
import {
    updateProfileAPI,
    IUpdateProfileRequest,
} from '@/api/user/update-profile.api'
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
    loading: boolean
    login: (email: string, password: string) => Promise<ICurrentUser>
    register: (email: string, password: string) => Promise<ICurrentUser>
    updateProfile: (data: IUpdateProfileRequest) => Promise<ICurrentUser>
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
    const [user, setUser] = useState<ICurrentUser | null>(currentUser)
    const [loading, setLoading] = useState<boolean>(true)

    async function login(
        email: string,
        password: string,
    ): Promise<ICurrentUser> {
        try {
            const response = await loginAPI({ email, password })

            setTokens(response.access_token, response.refresh_token)

            const userData = await getMeAPI()

            setUser(userData)
            return userData
        } catch (error) {
            console.error('Login error:', error)
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

            setUser(userData)
            return userData
        } catch (error) {
            console.error('Register error:', error)
            clearTokens()
            throw error
        }
    }

    async function updateProfile(
        data: IUpdateProfileRequest,
    ): Promise<ICurrentUser> {
        try {
            const updatedUser = await updateProfileAPI(data)
            console.log('Profile updated:', {
                id: updatedUser.id,
                email: updatedUser.email,
            })

            setUser(updatedUser)
            return updatedUser
        } catch (error) {
            console.error('Profile update error:', error)
            throw error
        }
    }

    function logout() {
        clearTokens()
        setUser(null)
    }

    useEffect(() => {
        const token = getToken()
        if (token) {
            if (user) {
                setLoading(false)
                return
            }
            setLoading(true)
            getMeAPI()
                .then((userData) => {
                    setUser(userData)
                })
                .catch((error) => {
                    console.error(
                        'Auth: Failed to restore user session:',
                        error,
                    )
                    clearTokens()
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: UserContextType = {
        currentUser: user,
        loading,
        login,
        register,
        updateProfile,
        logout,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
