import Link from 'next/link'
import Button from '@/components/button'
import { Suspense } from 'react'
import { getProductsAPI } from '@/api/product/product.api'
import HeroSlider from '@/components/hero-slider'
import { StatsCounter } from '@/components/stats-counter'
import { InteractiveShowcase } from '@/components/interactive-showcase'
import { CustomerComments } from '@/components/customer-comments'
import getSlidesAPI from '@/api/slide/get-slides.api'

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

async function Slides() {
    const slides = await getSlidesAPI()

    return <HeroSlider slides={slides} />
}

export default function Home() {
    return (
        <div className="min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
                <Slides />
            </Suspense>

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

            <section>
                <InteractiveShowcase />
            </section>

            <section>
                <StatsCounter />
            </section>

            <section>
                <CustomerComments />
            </section>
        </div>
    )
}
