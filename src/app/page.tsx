import Link from 'next/link'
import Button from '@/components/button'
import { Suspense } from 'react'
import HeroSlider from '@/components/hero-slider'
import { StatsCounter } from '@/components/stats-counter'
import { InteractiveShowcase } from '@/components/interactive-showcase'
import { CustomerComments } from '@/components/customer-comments'
import getSlidesAPI from '@/api/slide/get-slides.api'
import BrandSlider from '@/components/brand-slider'

async function Slides() {
    const slides = await getSlidesAPI()

    return <HeroSlider slides={slides} />
}

export default function Home() {
    return (
        <div className="min-h-screen">
            <Suspense fallback={<div>Yükleniyor...</div>}>
                <Slides />
            </Suspense>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <Link
                            href="/catalog?category=sunglasses"
                            className="group"
                        >
                            <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Güneş Gözlükleri"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="w-full p-8">
                                        <h2 className="mb-2 text-4xl font-bold text-white">
                                            Güneş Gözlükleri
                                        </h2>
                                        <p className="mb-4 text-gray-200">
                                            Gözlerinizi şıklıkla koruyun
                                        </p>
                                        <Button>Alışverişe Başla</Button>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/catalog?category=eyeglasses"
                            className="group"
                        >
                            <div className="relative h-96 overflow-hidden rounded-2xl shadow-lg">
                                <img
                                    src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Numaralı Gözlükler"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="w-full p-8">
                                        <h2 className="mb-2 text-4xl font-bold text-white">
                                            Optik Gözlükler
                                        </h2>
                                        <p className="mb-4 text-gray-200">
                                            Görüş modasıyla buluşuyor
                                        </p>
                                        <Button>Alışverişe Başla</Button>
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
                            Öne Çıkan Koleksiyon
                        </h2>
                        <p className="text-lg text-gray-600">
                            Her tarza uygun el seçmesi modeller
                        </p>
                    </div>

                    <section>
                        <BrandSlider />
                    </section>

                    <div className="mt-12 text-center">
                        <Link href="/catalog">
                            <Button size="lg" variant="outline">
                                Tüm Ürünleri Gör
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
