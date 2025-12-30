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
            const id =
                typeof productId === 'string' ? parseInt(productId) : productId

            await addToCart(id, quantity)
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
