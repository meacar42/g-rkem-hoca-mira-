'use client'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Button from '@/components/button'
import { ISliderResponse } from '@/types/slider-response.interface'

export interface IHeroSliderProps {
    slides: ISliderResponse[]
}

export default function HeroSlider({ slides }: IHeroSliderProps) {
    return (
        <section className="relative h-[400px] overflow-hidden md:h-[600px] lg:h-[700px]">
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
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className="px-4 text-center text-white sm:px-6 lg:px-8">
                                    <h1 className="mb-4 text-4xl font-bold sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mx-auto mb-6 max-w-2xl text-lg sm:mb-8 sm:text-xl md:text-2xl">
                                        {slide.description}
                                    </p>
                                    {slide.link && (
                                        <Link href={slide.link}>
                                            <Button size="lg">
                                                {slide.link || 'Learn More'}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
