import { useCart } from '@/contexts/cart-context'
import { CartItemProduct } from '@/types/ICartItem'

export function AddToCartButton({
    productId,
    quantity = 1,
    product,
}: {
    productId: number | string
    quantity?: number
    product?: CartItemProduct
}) {
    const { addToCart, isLoading } = useCart()

    const handleClick = async () => {
        try {
            const id =
                typeof productId === 'string' ? parseInt(productId) : productId

            await addToCart(id, quantity, product)
            alert('Ürün sepete eklendi!')
        } catch {
            alert('Hata oluştu')
        }
    }

    return (
        <button onClick={handleClick} disabled={isLoading}>
            {isLoading ? 'Ekleniyor...' : 'Sepete Ekle'}
        </button>
    )
}
