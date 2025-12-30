import { LocalCart, LocalCartItem } from '@/types/ICartItem'

const CART_KEY = 'guest-cart'

export const cartStorage = {
    getCart(): LocalCart {
        if (typeof window === 'undefined') return { items: [] }
        const stored = localStorage.getItem(CART_KEY)
        if (!stored) return { items: [] }
        try {
            return JSON.parse(stored)
        } catch {
            return { items: [] }
        }
    },

    saveCart(cart: LocalCart): void {
        if (typeof window === 'undefined') return
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
    },

    clearCart(): void {
        if (typeof window === 'undefined') return
        localStorage.removeItem(CART_KEY)
    },

    addItem(productId: number, quantity: number): LocalCart {
        const cart = this.getCart()
        const existingItem = cart.items.find(
            (item) => item.productId === productId,
        )

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({ productId, quantity })
        }

        this.saveCart(cart)
        return cart
    },

    updateItem(productId: number, quantity: number): LocalCart {
        const cart = this.getCart()
        const item = cart.items.find((item) => item.productId === productId)

        if (item) {
            item.quantity = quantity
            this.saveCart(cart)
        }

        return cart
    },

    removeItem(productId: number): LocalCart {
        const cart = this.getCart()
        cart.items = cart.items.filter((item) => item.productId !== productId)
        this.saveCart(cart)
        return cart
    },

    getItems(): LocalCartItem[] {
        return this.getCart().items
    },
}
