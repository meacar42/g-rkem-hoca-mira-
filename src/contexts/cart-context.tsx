'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'
import { Cart } from '@/types/ICartItem'
import { cartStorage } from '@/lib/cart-storage'
import {
    addItem,
    getCart,
    mergeCart,
    removeItem,
    updateItem,
} from '@/api/cart/cart.api'

interface CartContextType {
    cart: Cart
    isLoading: boolean
    addToCart: (productId: number, quantity: number) => Promise<void>
    updateCartItem: (
        itemIdOrProductId: number,
        quantity: number,
    ) => Promise<void>
    removeFromCart: (itemIdOrProductId: number) => Promise<void>
    clearCart: () => Promise<void>
    refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
    children: ReactNode
    isLoggedIn: boolean
}

export function CartProvider({ children, isLoggedIn }: CartProviderProps) {
    const [cart, setCart] = useState<Cart>({ items: [] })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            refreshCart()
        } else {
            const localCart = cartStorage.getCart()
            setCart(localCart)
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            mergeGuestCart()
        }
    }, [isLoggedIn])

    const mergeGuestCart = async () => {
        const localCart = cartStorage.getCart()
        if (localCart.items.length === 0) return

        try {
            const mergedCart = await mergeCart(
                localCart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            )
            setCart(mergedCart)
            cartStorage.clearCart()
        } catch (error) {
            console.error('Failed to merge cart:', error)
        }
    }

    const refreshCart = async () => {
        if (!isLoggedIn) {
            const localCart = cartStorage.getCart()
            setCart(localCart)
            return
        }

        try {
            const fetchedCart = await getCart()
            setCart(fetchedCart)
        } catch (error) {
            console.error('Failed to refresh cart:', error)
        }
    }

    const addToCart = async (productId: number, quantity: number) => {
        setIsLoading(true)
        try {
            if (isLoggedIn) {
                const updatedCart = await addItem(productId, quantity)
                setCart(updatedCart)
            } else {
                const updatedCart = cartStorage.addItem(productId, quantity)
                setCart(updatedCart)
            }
        } catch (error) {
            console.error('Failed to add to cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const updateCartItem = async (
        itemIdOrProductId: number,
        quantity: number,
    ) => {
        setIsLoading(true)
        try {
            if (isLoggedIn) {
                const updatedCart = await updateItem(
                    itemIdOrProductId,
                    quantity,
                )
                setCart(updatedCart)
            } else {
                const updatedCart = cartStorage.updateItem(
                    itemIdOrProductId,
                    quantity,
                )
                setCart(updatedCart)
            }
        } catch (error) {
            console.error('Failed to update cart item:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const removeFromCart = async (itemIdOrProductId: number) => {
        setIsLoading(true)
        try {
            if (isLoggedIn) {
                const updatedCart = await removeItem(itemIdOrProductId)
                setCart(updatedCart)
            } else {
                const updatedCart = cartStorage.removeItem(itemIdOrProductId)
                setCart(updatedCart)
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const clearCart = async () => {
        setIsLoading(true)
        try {
            if (isLoggedIn) {
                await clearCart()
            } else {
                cartStorage.clearCart()
            }
            setCart({ items: [] })
        } catch (error) {
            console.error('Failed to clear cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}
