'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react'
import { Cart, LocalCart } from '@/types/ICartItem'
import { cartStorage } from '@/lib/cart-storage'
import {
    addItem,
    getCart,
    getGuestCartInfo,
    mergeCart,
    removeItem,
    updateItem,
    clearCart as clearCartAPI,
} from '@/api/cart/cart.api'
import { toast } from 'react-toastify'
import { ShoppingCart } from 'lucide-react'

// Boş cart için default değerler
const emptyCart: Cart = {
    products: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    itemCount: 0,
}

interface CartContextType {
    // Local cart (sadece id ve quantity - header badge için)
    localCart: LocalCart
    // Full cart (ürün bilgileriyle birlikte - cart sayfası için)
    cart: Cart | null
    isLoading: boolean
    isCartLoading: boolean
    addToCart: (productId: number, quantity: number) => Promise<void>
    updateCartItem: (
        itemIdOrProductId: number,
        quantity: number,
    ) => Promise<void>
    removeFromCart: (itemIdOrProductId: number) => Promise<void>
    clearCart: () => Promise<void>
    // Cart sayfası için full cart bilgisini yükle
    loadFullCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
    children: ReactNode
    isLoggedIn: boolean
}

export function CartProvider({ children, isLoggedIn }: CartProviderProps) {
    // Local cart - sadece productId ve quantity (header badge için)
    const [localCart, setLocalCart] = useState<LocalCart>({ items: [] })
    // Full cart - ürün bilgileriyle (cart sayfası için)
    const [cart, setCart] = useState<Cart | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isCartLoading, setIsCartLoading] = useState(false)

    // Local cart'ı yükle (sayfa yüklendiğinde)
    useEffect(() => {
        const storedCart = cartStorage.getCart()
        setLocalCart(storedCart)
    }, [])

    // Giriş yapıldığında guest cart'ı merge et
    useEffect(() => {
        if (isLoggedIn) {
            mergeGuestCart()
        }
    }, [isLoggedIn])

    const mergeGuestCart = async () => {
        const storedCart = cartStorage.getCart()
        if (storedCart.items.length === 0) return

        try {
            const mergedCart = await mergeCart(storedCart.items)
            setCart(mergedCart)
            setLocalCart({
                items: mergedCart.products.map((i) => ({
                    productId: i.productId,
                    quantity: i.quantity,
                })),
            })
            cartStorage.clearCart()
        } catch (error) {
            console.error('Failed to merge cart:', error)
        }
    }

    // Cart sayfası için full cart bilgisini yükle
    const loadFullCart = useCallback(async () => {
        setIsCartLoading(true)
        try {
            if (isLoggedIn) {
                const fetchedCart = await getCart()
                setCart(fetchedCart)
                setLocalCart({
                    items: fetchedCart.products.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                })
            } else {
                const storedCart = cartStorage.getCart()
                if (storedCart.items.length === 0) {
                    setCart(emptyCart)
                    return
                }
                const cartInfo = await getGuestCartInfo(storedCart.items)
                console.log('Guest cart info:', cartInfo)

                // Bulunamayan ürünleri local storage'dan sil ve kullanıcıya bildir
                if (
                    cartInfo.productsNotFound &&
                    cartInfo.productsNotFound.length > 0
                ) {
                    cartInfo.productsNotFound.forEach((productId) => {
                        cartStorage.removeItem(productId)
                    })

                    const updatedStoredCart = cartStorage.getCart()
                    setLocalCart(updatedStoredCart)

                    const count = cartInfo.productsNotFound.length
                    toast.warning(
                        count === 1
                            ? 'Sepetinizdeki bir ürün artık mevcut değil ve sepetinizden kaldırıldı.'
                            : `Sepetinizdeki ${count} ürün artık mevcut değil ve sepetinizden kaldırıldı.`,
                        { autoClose: 5000 },
                    )
                }

                // Backend'den gelen ürün bilgilerini local cart quantity ile birleştir
                const currentLocalCart = cartStorage.getCart()
                const mergedProducts = cartInfo.products.map((product) => {
                    const localItem = currentLocalCart.items.find(
                        (item) => item.productId === product.id,
                    )
                    return {
                        productId: product.id,
                        quantity: localItem?.quantity || 1,
                        product,
                    }
                })

                setCart({
                    products: mergedProducts,
                })
            }
        } catch (error) {
            console.error('Failed to load full cart:', error)
            setCart(emptyCart)
        } finally {
            setIsCartLoading(false)
        }
    }, [isLoggedIn])

    const addToCart = async (productId: number, quantity: number) => {
        setIsLoading(true)
        try {
            if (isLoggedIn) {
                const updatedCart = await addItem(productId, quantity)
                setCart(updatedCart)
                setLocalCart({
                    items: updatedCart.products.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                })
            } else {
                const updatedLocalCart = cartStorage.addItem(
                    productId,
                    quantity,
                )
                setLocalCart(updatedLocalCart)
                // Full cart'ı null yap, cart sayfasına gidildiğinde yeniden yüklenecek
                setCart(null)
            }
            toast('Ürün sepetinize eklendi', {
                type: 'success',
                icon: <ShoppingCart size={16} color={'#000'} />,
            })
        } catch (error) {
            console.error('Failed to add to cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const updateCartItem = async (itemId: number, quantity: number) => {
        setIsLoading(true)
        try {
            if (isLoggedIn) {
                const updatedCart = await updateItem(itemId, quantity)
                setCart(updatedCart)
                setLocalCart({
                    items: updatedCart.products.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                })
            } else {
                const updatedLocalCart = cartStorage.updateItem(
                    itemId,
                    quantity,
                )
                setLocalCart(updatedLocalCart)
                // Full cart varsa, local cart ile birleştirerek güncelle
                if (cart) {
                    const updatedProducts = cart.products.map((item) => {
                        if (item.productId === itemId) {
                            return { ...item, quantity }
                        }
                        return item
                    })
                    setCart({ ...cart, products: updatedProducts })
                }
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
                setLocalCart({
                    items: updatedCart.products.map((i) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                })
            } else {
                const updatedLocalCart =
                    cartStorage.removeItem(itemIdOrProductId)
                setLocalCart(updatedLocalCart)
                if (updatedLocalCart.items.length === 0) {
                    setCart(emptyCart)
                } else if (cart) {
                    // Silinen ürünü cart'tan çıkar
                    const updatedProducts = cart.products.filter(
                        (item) => item.productId !== itemIdOrProductId,
                    )
                    setCart({ ...cart, products: updatedProducts })
                }
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
                await clearCartAPI()
            } else {
                cartStorage.clearCart()
            }
            setLocalCart({ items: [] })
            setCart(emptyCart)
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
                localCart,
                cart,
                isLoading,
                isCartLoading,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,
                loadFullCart,
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
