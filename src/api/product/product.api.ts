import { IProduct } from '@/types/IProduct'

export async function getProductsAPI() {
    return [
        {
            id: 1,
            name: 'Aviator Sunglasses',
            description: 'Classic aviator sunglasses with UV protection.',
            price: 99.99,
            category: 'sunglasses',
            featured: true,
            image: 'https://picsum.photos/200',
        },
        {
            id: 2,
            name: 'Round Eyeglasses',
            description: 'Stylish round eyeglasses for everyday wear.',
            price: 79.99,
            category: 'eyeglasses',
            featured: false,
            image: 'https://picsum.photos/200',
        },
    ]
}

export async function getProductDetailAPI(
    id: number,
): Promise<IProduct | undefined> {
    const products = await getProductsAPI()
    return products.find((product) => product.id === id)
}
