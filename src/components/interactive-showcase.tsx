'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    ChevronLeft,
    ChevronRight,
    Zap,
    Shield,
    Droplets,
    Sun,
} from 'lucide-react'

const showcaseItems = [
    {
        id: 1,
        title: 'Polarize Lens Teknolojisi',
        description:
            'Yansımaları ortadan kaldırarak kristal netliğinde görüş sağlar. Sürüş ve su sporları için ideal.',
        image: '/polarize.jpg',
        icon: Sun,
        color: 'from-amber-400 to-orange-500',
        features: ['Anti-Glare', 'HD Görüş', 'Göz Yorgunluğunu Azaltır'],
    },
    {
        id: 2,
        title: 'UV400 Tam Koruma',
        description:
            "Zararlı UVA ve UVB ışınlarının %100'ünü bloke ederek gözlerinizi korur.",
        image: '/uv400.jpg',
        icon: Shield,
        color: 'from-emerald-400 to-teal-500',
        features: ['UVA Koruması', 'UVB Koruması', 'Mavi Işık Filtresi'],
    },
    {
        id: 3,
        title: 'Suya Dayanıklı Kaplama',
        description:
            'Hidrofobik kaplama sayesinde su damlaları lens yüzeyinde tutunmaz.',
        image: '/waterproff.jpg',
        icon: Droplets,
        color: 'from-blue-400 to-cyan-500',
        features: ['Su İtici', 'Leke Tutmaz', 'Kolay Temizlenir'],
    },
    {
        id: 4,
        title: 'Ultra Hafif Çerçeve',
        description:
            'Titanyum alaşım ile üretilen çerçeveler, tüm gün konforlu kullanım sunar.',
        image: '/light.jpg',
        icon: Zap,
        color: 'from-violet-400 to-purple-500',
        features: ['18g Hafiflik', 'Esnek Yapı', 'Hipoalerjenik'],
    },
]

export function InteractiveShowcase() {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeItem = showcaseItems[activeIndex]
    const Icon = activeItem.icon

    const next = () =>
        setActiveIndex((prev) => (prev + 1) % showcaseItems.length)
    const prev = () =>
        setActiveIndex(
            (prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length,
        )

    return (
        <section className="overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-24 md:py-32">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-primary">
                        Teknoloji
                    </span>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        Neden Biz?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        En son lens teknolojileri ve premium malzemelerle
                        üretilen gözlüklerimiz
                    </p>
                </div>

                {/* Showcase Content */}
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Left - Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative mx-auto aspect-square max-w-lg">
                            {/* Animated background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${activeItem.color} animate-morph rounded-full opacity-20 blur-3xl`}
                            />

                            {/* Main image container */}
                            <div className="relative z-10 h-full w-full rounded-2xl bg-gradient-to-br from-white to-secondary/50 p-8 shadow-2xl shadow-primary/10">
                                <img
                                    src={activeItem.image || '/placeholder.svg'}
                                    alt={activeItem.title}
                                    className="animate-float-slow h-full w-full !rounded-3xl object-contain"
                                    key={activeItem.id}
                                />
                            </div>

                            {/* Floating feature badges */}
                            {activeItem.features.map((feature, i) => (
                                <div
                                    key={feature}
                                    className="glass animate-float-slow absolute z-[999] hidden rounded-full px-4 py-2 text-sm font-medium shadow-lg md:block"
                                    style={{
                                        top: `${20 + i * 30}%`,
                                        left: i % 2 === 0 ? '-10%' : 'auto',
                                        right: i % 2 === 1 ? '-10%' : 'auto',
                                        animationDelay: `${i * -2}s`,
                                    }}
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        {/* Icon */}
                        <div
                            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${activeItem.color} mb-6 text-white shadow-lg`}
                        >
                            <Icon className="h-8 w-8" />
                        </div>

                        {/* Title */}
                        <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                            {activeItem.title}
                        </h3>

                        {/* Description */}
                        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                            {activeItem.description}
                        </p>

                        {/* Features List */}
                        <div className="mb-10 flex flex-wrap gap-3">
                            {activeItem.features.map((feature) => (
                                <span
                                    key={feature}
                                    className="rounded-full bg-secondary px-4 py-2 text-sm font-medium"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={prev}
                                className="h-12 w-12 rounded-full border-2 bg-transparent transition-all hover:bg-foreground hover:text-background"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>

                            {/* Progress indicators */}
                            <div className="flex gap-2">
                                {showcaseItems.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            i === activeIndex
                                                ? 'w-8 bg-primary'
                                                : 'w-2 bg-border hover:bg-primary/50'
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

                            <span className="ml-4 text-sm text-muted-foreground">
                                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                                {String(showcaseItems.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
