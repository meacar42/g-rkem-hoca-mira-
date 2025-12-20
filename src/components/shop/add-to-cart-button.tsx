import { useCart } from '@/contexts/cart-context'

export function AddToCartButton({
    productId,
    quantity = 1,
}: {
    productId: number | string
    quantity?: number
}) {
    const { addToCart, isLoading } = useCart()

    const handleClick = async () => {
        try {
            if (typeof productId === 'string') {
                productId = parseInt(productId)
            }

            await addToCart(productId, quantity)
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
