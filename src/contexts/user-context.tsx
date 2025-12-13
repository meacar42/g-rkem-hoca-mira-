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
            console.log('Login: User data received:', {
                id: userData.id,
                email: userData.email,
                role: userData.role,
            })

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
            console.log('Register: User data received:', {
                id: userData.id,
                email: userData.email,
                role: userData.role,
            })

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
        if (token && !user) {
            console.log('Auth: Restoring user session from token...')
            getMeAPI()
                .then((userData) => {
                    console.log('Auth: User session restored successfully')
                    setUser(userData)
                })
                .catch((error) => {
                    console.error(
                        'Auth: Failed to restore user session:',
                        error,
                    )
                    clearTokens()
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: UserContextType = {
        currentUser: user,
        login,
        register,
        updateProfile,
        logout,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
