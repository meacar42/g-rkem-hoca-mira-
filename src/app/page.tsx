import { Truck, Shield, RotateCcw, Star } from 'lucide-react'
import { IProduct } from '@/types/IProduct'
import Link from 'next/link'
import Button from '@/components/button'
import ProductCard from '@/components/product-card'
import { Suspense } from 'react'
import { getProductsAPI } from '@/api/product/product.api'
import HeroSlider from '@/components/hero-slider'

const slides = [
    {
        id: 1,
        title: 'Discover Your Perfect Pair',
        description: 'Explore our latest collection of stylish eyewear',
        imageUrl:
            'https://images.pexels.com/photos/1005633/pexels-photo-1005633.jpeg?auto=compress&cs=tinysrgb&w=1200',
        link: '/sunglasses',
    },
    {
        id: 2,
        title: 'Summer Shades Are Here',
        description: 'Get ready for the sun with our trendy sunglasses',
        imageUrl:
            'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1200',
        link: '/sunglasses',
    },
]

async function ProductList() {
    const products = await getProductsAPI()
    const featuredProducts = products?.filter((p) => p.featured)

    return (
        <div className="min-h-screen">
            <HeroSlider slides={slides} />

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <Link href="/sunglasses" className="group">
                            <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Sunglasses"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="w-full p-8">
                                        <h2 className="mb-2 text-4xl font-bold text-white">
                                            Sunglasses
                                        </h2>
                                        <p className="mb-4 text-gray-200">
                                            Protect your eyes in style
                                        </p>
                                        <Button>Shop Now</Button>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/eyeglasses" className="group">
                            <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Eyeglasses"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="w-full p-8">
                                        <h2 className="mb-2 text-4xl font-bold text-white">
                                            Eyeglasses
                                        </h2>
                                        <p className="mb-4 text-gray-200">
                                            Vision meets fashion
                                        </p>
                                        <Button>Shop Now</Button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-black">
                            Featured Collection
                        </h2>
                        <p className="text-lg text-gray-600">
                            Handpicked styles for every personality
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/*{featuredProducts?.map(product => (*/}
                        {/*    <ProductCard*/}
                        {/*        key={product.id}*/}
                        {/*        product={product}*/}
                        {/*        onAddToCart={() => {}}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/sunglasses">
                            <Button size="lg" variant="outline">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-black py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                                <Truck className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Free Shipping
                            </h3>
                            <p className="text-sm text-gray-400">
                                On orders over $100
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Quality Guarantee
                            </h3>
                            <p className="text-sm text-gray-400">
                                Premium materials only
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                                <RotateCcw className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                30-Day Returns
                            </h3>
                            <p className="text-sm text-gray-400">
                                Hassle-free returns
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                                <Star className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Expert Service
                            </h3>
                            <p className="text-sm text-gray-400">
                                Personalized assistance
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-emerald-500 py-16 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-4xl font-bold">Stay Updated</h2>
                    <p className="mb-8 text-lg text-emerald-100">
                        Subscribe to get special offers, new arrivals, and style
                        tips
                    </p>
                    <form className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-lg px-6 py-4 text-black focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <Button variant="secondary" size="lg">
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
        </Suspense>
    )
}
