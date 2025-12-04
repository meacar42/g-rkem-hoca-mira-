'use client'

import { useEffect, useState, useRef } from 'react'
import { Users, Package, Award, Truck, type LucideIcon } from 'lucide-react'

const stats = [
    {
        icon: Users,
        value: 10000,
        suffix: '+',
        label: 'Mutlu Müşteri',
        description: 'Güvenle alışveriş yapan',
    },
    {
        icon: Package,
        value: 100,
        suffix: '+',
        label: 'Ürün Çeşidi',
        description: 'Geniş koleksiyon',
    },
    {
        icon: Award,
        value: 10,
        suffix: ' Yıl',
        label: 'Tecrübe',
        description: 'Sektörde lider',
    },
    {
        icon: Truck,
        value: 24,
        suffix: ' Saat',
        label: 'Hızlı Teslimat',
        description: 'Türkiye geneli',
    },
]

function StatItem({
    icon: Icon,
    value,
    suffix,
    label,
    description,
    isVisible,
    delay,
}: {
    icon: LucideIcon
    value: number
    suffix: string
    label: string
    description: string
    isVisible: boolean
    delay: number
}) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return

        let startTime: number | null = null
        const duration = 2000

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * value))
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [value, isVisible])

    return (
        <div
            className={`rounded-3xl p-8 text-center transition-all duration-700 ${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-emerald-500">
                <Icon className="h-7 w-7" />
            </div>

            <div className="mb-2 text-4xl font-bold md:text-5xl">
                <span className="text-primary">{count.toLocaleString()}</span>
                <span className="text-primary">{suffix}</span>
            </div>

            <h3 className="mb-1 text-lg font-semibold">{label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}

export function StatsCounter() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 },
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="relative overflow-hidden py-24">
            <div className="absolute inset-0 opacity-50">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                        opacity: 0.1,
                    }}
                />
            </div>

            <div className="container relative mx-auto px-6">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            icon={stat.icon}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            description={stat.description}
                            isVisible={isVisible}
                            delay={index * 150}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
