import { useContext } from 'react'
import { UserContext } from '@/contexts/user-context'

export const useUser = () => {
    const currentUser = useContext(UserContext)
    return {
        currentUser,
        isLoggedIn: !!currentUser,
    }
}
