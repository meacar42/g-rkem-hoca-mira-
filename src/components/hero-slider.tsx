"use client"
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Button from '@/components/button'

export default function HeroSlider() {
    return (
        <section className="relative h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                loop={true}
                className="h-[400px] md:h-[600px] lg:h-[700px]"
            >
                <SwiperSlide>
                    <div className="h-[400px] md:h-[600px] lg:h-[700px]">
                        <img
                            src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1920"
                            alt="Stylish Sunglasses"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white px-4 sm:px-6 lg:px-8">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                                    Premium Sunglasses
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                                    Protect your eyes in style
                                </p>
                                <Link href="/sunglasses">
                                    <Button size="lg">Shop Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1920"
                            alt="Modern Eyeglasses"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white px-4 sm:px-6 lg:px-8">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                                    Designer Eyeglasses
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                                    Vision meets fashion
                                </p>
                                <Link href="/eyeglasses">
                                    <Button size="lg">Discover More</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img
                            src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1920"
                            alt="Luxury Collection"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white px-4 sm:px-6 lg:px-8">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                                    New Collection
                                </h1>
                                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
                                    Explore our latest arrivals
                                </p>
                                <Link href="/sunglasses">
                                    <Button size="lg">View Collection</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}
