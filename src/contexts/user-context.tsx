'use client'
import React, { createContext, useState } from 'react'

type ICurrentUser = {
    id: string
    email: string
    name: string
}

type UserContext = {
    currentUser: ICurrentUser | null
    login: (email: string, password: string) => Promise<ICurrentUser>
    logout: () => void
}

export const UserContext = createContext<ICurrentUser | null>(null)

export function UserProvider({
    currentUser,
    children,
}: {
    currentUser: ICurrentUser | null
    children: React.ReactNode
}) {
    console.log('User Provider currentUser:', currentUser)

    const [user, setUser] = useState<ICurrentUser | null>(currentUser)

    function login(email: string, password: string) {}

    function logout() {
        setUser(null)
    }

    const value = {
        currentUser,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
