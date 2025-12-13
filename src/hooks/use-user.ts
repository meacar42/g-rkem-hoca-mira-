import { useContext } from 'react'
import { UserContext } from '@/contexts/user-context'

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return {
        currentUser: context.currentUser,
        isLoggedIn: !!context.currentUser,
        login: context.login,
        register: context.register,
        logout: context.logout,
    }
}
