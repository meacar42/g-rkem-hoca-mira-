import { Truck, Shield, RotateCcw, Star } from 'lucide-react'
import { IProduct } from '@/types/IProduct'
import Link from 'next/link'
import Button from '@/components/button'
import ProductCard from '@/components/product-card'
import { Suspense } from 'react'
import { getProductsAPI } from '@/api/product/product.api'

async function ProductList() {
    const products = await getProductsAPI()
    const featuredProducts = products?.filter((p) => p.featured)

    return (
        <div className="min-h-screen">
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-gray-50">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
                        See the World{' '}
                        <span className="text-emerald-500">Clearly</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
                        Premium eyewear designed for style, comfort, and
                        crystal-clear vision
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/sunglasses">
                            <Button size="lg">Shop Sunglasses</Button>
                        </Link>
                        <Link href="/eyeglasses">
                            <Button variant="outline" size="lg">
                                Shop Eyeglasses
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link href="/sunglasses" className="group">
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Sunglasses"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <div className="p-8 w-full">
                                        <h2 className="text-4xl font-bold text-white mb-2">
                                            Sunglasses
                                        </h2>
                                        <p className="text-gray-200 mb-4">
                                            Protect your eyes in style
                                        </p>
                                        <Button>Shop Now</Button>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/eyeglasses" className="group">
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Eyeglasses"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <div className="p-8 w-full">
                                        <h2 className="text-4xl font-bold text-white mb-2">
                                            Eyeglasses
                                        </h2>
                                        <p className="text-gray-200 mb-4">
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

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">
                            Featured Collection
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Handpicked styles for every personality
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/*{featuredProducts?.map(product => (*/}
                        {/*    <ProductCard*/}
                        {/*        key={product.id}*/}
                        {/*        product={product}*/}
                        {/*        onAddToCart={() => {}}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/sunglasses">
                            <Button size="lg" variant="outline">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">
                                Free Shipping
                            </h3>
                            <p className="text-gray-400 text-sm">
                                On orders over $100
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">
                                Quality Guarantee
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Premium materials only
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RotateCcw className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">
                                30-Day Returns
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Hassle-free returns
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">
                                Expert Service
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Personalized assistance
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-emerald-500 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-emerald-100 mb-8 text-lg">
                        Subscribe to get special offers, new arrivals, and style
                        tips
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
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
