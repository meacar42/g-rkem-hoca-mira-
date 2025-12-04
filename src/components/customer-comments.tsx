'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
    {
        id: 1,
        name: 'Ayşe Yılmaz',
        role: 'Moda Blogger',
        avatar: '/customers/1.jpg',
        content:
            'Hem şık hem de gözlerimi mükemmel koruyor. Kalitesi gerçekten üst düzey güvenle tavsiye ediyorum!',
        rating: 5,
        product: 'Aviator Classic',
    },
    {
        id: 2,
        name: 'Mehmet Demir',
        role: 'Sporcu',
        avatar: '/customers/4.jpg',
        content:
            'Spor yaparken polarize lensler sayesinde mükemmel görüş sağlıyorum. Çerçeve çok hafif, saatlerce takmak sorun olmuyor.',
        rating: 5,
        product: 'Sport Elite',
    },
    {
        id: 3,
        name: 'Zeynep Kaya',
        role: 'Doktor',
        avatar: '/customers/3.jpg',
        content:
            'UV koruması konusunda hiç şüphem yok çünkü göz sağlığı benim için çok önemli. Ayrıca tasarımı da çok hoş.',
        rating: 5,
        product: 'Crystal Round',
    },
]

export function CustomerComments() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const next = () => {
        setIsAutoPlaying(false)
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setIsAutoPlaying(false)
        setActiveIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        )
    }

    return (
        <section className="overflow-hidden bg-gradient-to-b from-secondary/50 via-secondary/30 to-background py-24 md:py-32">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-primary">
                        Müşteri Yorumları
                    </span>
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        Müşterilerimiz Ne Diyor?
                    </h2>
                </div>

                {/* Testimonials */}
                <div className="mx-auto max-w-4xl">
                    <div className="relative">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`transition-all duration-500 ${
                                    index === activeIndex
                                        ? 'translate-x-0 opacity-100'
                                        : 'pointer-events-none absolute inset-0 translate-x-10 opacity-0'
                                }`}
                            >
                                <div className="relative rounded-3xl bg-white p-8 shadow-xl shadow-primary/5 md:p-12">
                                    {/* Quote Icon */}
                                    <div className="absolute right-8 top-8 text-primary/10">
                                        <Quote className="h-16 w-16" />
                                    </div>

                                    {/* Stars */}
                                    <div className="mb-6 flex gap-1">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-amber-400 text-amber-400"
                                                />
                                            ),
                                        )}
                                    </div>

                                    {/* Content */}
                                    <blockquote className="mb-8 text-xl leading-relaxed text-foreground md:text-2xl">
                                        &#34;{testimonial.content}&#34;
                                    </blockquote>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                testimonial.avatar ||
                                                '/placeholder.svg'
                                            }
                                            alt={testimonial.name}
                                            className="h-14 w-14 rounded-full object-cover ring-4 ring-primary/10"
                                        />
                                        <div>
                                            <h4 className="text-lg font-semibold">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prev}
                            className="h-12 w-12 rounded-full border-2 bg-transparent transition-all hover:bg-foreground hover:text-background"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setIsAutoPlaying(false)
                                        setActiveIndex(i)
                                    }}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${
                                        i === activeIndex
                                            ? 'w-10 bg-primary'
                                            : 'w-2.5 bg-border hover:bg-primary/50'
                                    }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={next}
                            className="h-12 w-12 rounded-full border-2 bg-transparent transition-all hover:bg-foreground hover:text-background"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
