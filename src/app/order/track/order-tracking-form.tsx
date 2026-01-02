'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Check, Package, Truck, Home, X, Clock, Search } from 'lucide-react'
import { trackOrder } from './actions'

enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
}

interface OrderData {
    orderId: string
    customerEmail: string
    status: OrderStatus
    createdAt: string
    estimatedDelivery?: string
}

export default function OrderTrackingForm() {
    const searchParams = useSearchParams()
    const [orderId, setOrderId] = useState('')
    const [email, setEmail] = useState('')
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    const turnstileRef = useRef<TurnstileInstance>(null)

    useEffect(() => {
        const idFromQuery = searchParams.get('id')
        if (idFromQuery) {
            setOrderId(idFromQuery)
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!turnstileToken) {
            setError('Lütfen güvenlik doğrulamasını tamamlayın.')
            return
        }

        setLoading(true)
        setError('')
        setOrderData(null)

        try {
            const result = await trackOrder(orderId, email, turnstileToken)
            setOrderData(result)
        } catch (err) {
            setError('Sipariş bulunamadı. Lütfen bilgilerinizi kontrol edin.')
        } finally {
            setLoading(false)
            // Reset turnstile for next submission
            setTurnstileToken(null)
            turnstileRef.current?.reset()
        }
    }

    const getStatusConfig = (status: OrderStatus) => {
        const configs = {
            [OrderStatus.PENDING]: {
                label: 'Onay Bekleniyor',
                description: 'Siparişiniz onay bekliyor',
                color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
                icon: Clock,
            },
            [OrderStatus.PROCESSING]: {
                label: 'Hazırlanıyor',
                description: 'Siparişiniz hazırlanıyor',
                color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
                icon: Package,
            },
            [OrderStatus.SHIPPED]: {
                label: 'Kargoda',
                description: 'Siparişiniz yola çıktı',
                color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
                icon: Truck,
            },
            [OrderStatus.DELIVERED]: {
                label: 'Teslim Edildi',
                description: 'Siparişiniz teslim edildi',
                color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
                icon: Home,
            },
            [OrderStatus.CANCELED]: {
                label: 'İptal Edildi',
                description: 'Sipariş iptal edildi',
                color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
                icon: X,
            },
        }
        return configs[status]
    }

    const getStatusSteps = (currentStatus: OrderStatus) => {
        const statuses = [
            OrderStatus.PENDING,
            OrderStatus.PROCESSING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
        ]

        if (currentStatus === OrderStatus.CANCELED) {
            return []
        }

        const currentIndex = statuses.indexOf(currentStatus)
        return statuses.map((status, index) => ({
            status,
            active: index <= currentIndex,
            completed: index < currentIndex,
        }))
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="animate-fade-in-up mb-8">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Truck height={24} width={24} />
                    </div>
                    <h1 className="mb-2 text-balance text-4xl font-bold">
                        Sipariş Takibi
                    </h1>
                    <p className="text-muted-foreground">
                        Siparişinizin durumunu sorgulamak için bilgilerinizi
                        girin
                    </p>
                </div>

                {/* Search Form */}
                <Card
                    className="animate-fade-in-up mb-6 p-6 md:p-8"
                    style={{ animationDelay: '0.1s' }}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="orderId">Sipariş No</Label>
                            <Input
                                id="orderId"
                                type="text"
                                placeholder="örnek: 123e4567-e89b-12d3-a456-426614174000"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Siparişte Kullanılan E-posta Adresi
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11"
                            />
                        </div>

                        {error && (
                            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Turnstile
                                ref={turnstileRef}
                                siteKey={
                                    process.env
                                        .NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
                                }
                                onSuccess={setTurnstileToken}
                                onExpire={() => setTurnstileToken(null)}
                                onError={() => setTurnstileToken(null)}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="h-11 w-full"
                            disabled={loading || !turnstileToken}
                        >
                            {loading ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Sorgulanıyor...
                                </>
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Sorgula
                                </>
                            )}
                        </Button>
                    </form>
                </Card>

                {/* Order Results */}
                {orderData && (
                    <>
                        {/* Order Info Card */}
                        <Card
                            className="animate-fade-in-up mb-6 p-6 md:p-8"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <h2 className="mb-1 text-2xl font-semibold">
                                        Sipariş #{orderData.orderId}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {orderData.customerEmail}
                                    </p>
                                </div>
                                <Badge
                                    className={`${getStatusConfig(orderData.status).color} border px-4 py-2 text-sm font-medium`}
                                >
                                    {(() => {
                                        const StatusIcon = getStatusConfig(
                                            orderData.status,
                                        ).icon
                                        return (
                                            <StatusIcon className="mr-2 h-4 w-4" />
                                        )
                                    })()}
                                    {getStatusConfig(orderData.status).label}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted/50 p-4 md:grid-cols-2">
                                <div className="flex justify-between md:flex-col">
                                    <span className="text-sm text-muted-foreground">
                                        Sipariş Tarihi
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            orderData.createdAt,
                                        ).toLocaleDateString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between md:flex-col">
                                    <span className="text-sm text-muted-foreground">
                                        Durum
                                    </span>
                                    <span className="font-medium">
                                        {
                                            getStatusConfig(orderData.status)
                                                .label
                                        }
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Progress Tracker */}
                        {orderData.status !== OrderStatus.CANCELED ? (
                            <Card
                                className="animate-fade-in-up p-6 md:p-8"
                                style={{ animationDelay: '0.3s' }}
                            >
                                <h3 className="mb-8 text-xl font-semibold">
                                    Sipariş Durumu
                                </h3>

                                {/* Mobile Layout */}
                                <div className="md:hidden">
                                    <div className="space-y-8">
                                        {getStatusSteps(orderData.status).map(
                                            (step, index) => {
                                                const config = getStatusConfig(
                                                    step.status,
                                                )
                                                const StepIcon = config.icon
                                                const isLast =
                                                    index ===
                                                    getStatusSteps(
                                                        orderData.status,
                                                    ).length -
                                                        1

                                                return (
                                                    <div
                                                        key={step.status}
                                                        className="relative"
                                                    >
                                                        <div className="flex items-start gap-4">
                                                            {/* Icon Circle */}
                                                            <div
                                                                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                                                                    step.completed
                                                                        ? 'bg-primary text-primary-foreground'
                                                                        : step.active
                                                                          ? 'border-2 border-primary bg-primary/20 text-primary'
                                                                          : 'bg-muted text-muted-foreground'
                                                                }`}
                                                            >
                                                                {step.completed ? (
                                                                    <Check className="h-6 w-6" />
                                                                ) : (
                                                                    <StepIcon className="h-6 w-6" />
                                                                )}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 pt-2">
                                                                <p
                                                                    className={`mb-1 font-semibold transition-colors ${
                                                                        step.active
                                                                            ? 'text-foreground'
                                                                            : 'text-muted-foreground'
                                                                    }`}
                                                                >
                                                                    {
                                                                        config.label
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        config.description
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Vertical Line - positioned outside the flex container */}
                                                        {!isLast && (
                                                            <div className="absolute left-6 top-12 h-8 w-0.5 -translate-x-px">
                                                                <div className="h-full w-full bg-border">
                                                                    <div
                                                                        className={`w-full bg-primary transition-all duration-500 ${
                                                                            step.completed
                                                                                ? 'h-full'
                                                                                : 'h-0'
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            },
                                        )}
                                    </div>
                                </div>

                                {/* Desktop Layout */}
                                <div className="hidden md:block">
                                    <div className="relative px-8">
                                        {/* Steps Container */}
                                        <div className="relative flex items-start justify-between">
                                            {/* Steps */}
                                            {getStatusSteps(
                                                orderData.status,
                                            ).map((step, index) => {
                                                const config = getStatusConfig(
                                                    step.status,
                                                )
                                                const StepIcon = config.icon
                                                return (
                                                    <div
                                                        key={step.status}
                                                        className="relative z-10 flex flex-col items-center"
                                                        style={{ flex: 1 }}
                                                    >
                                                        {/* Icon Circle */}
                                                        <div
                                                            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500 ${
                                                                step.completed
                                                                    ? 'bg-primary text-primary-foreground'
                                                                    : step.active
                                                                      ? 'border-2 border-primary bg-background text-primary'
                                                                      : 'bg-muted text-muted-foreground'
                                                            }`}
                                                        >
                                                            {step.completed ? (
                                                                <Check className="h-6 w-6" />
                                                            ) : (
                                                                <StepIcon className="h-6 w-6" />
                                                            )}
                                                        </div>

                                                        {index <
                                                            getStatusSteps(
                                                                orderData.status,
                                                            ).length -
                                                                1 && (
                                                            <div className="absolute left-1/2 top-6 -z-10 flex h-0.5 w-full">
                                                                {/* Base line */}
                                                                <div className="flex-1 bg-border" />
                                                                {/* Progress line - only show if this step is completed */}
                                                                {step.completed && (
                                                                    <div className="absolute inset-0 flex-1 bg-primary transition-all duration-1000" />
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Label and Description */}
                                                        <div className="mt-4 max-w-[140px] text-center">
                                                            <p
                                                                className={`mb-1 text-sm font-semibold transition-colors ${
                                                                    step.active
                                                                        ? 'text-foreground'
                                                                        : 'text-muted-foreground'
                                                                }`}
                                                            >
                                                                {config.label}
                                                            </p>
                                                            <p className="text-xs leading-tight text-muted-foreground">
                                                                {
                                                                    config.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <Card
                                className="animate-fade-in-up p-6 md:p-8"
                                style={{ animationDelay: '0.3s' }}
                            >
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                                        <X className="h-8 w-8 text-destructive" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Sipariş İptal Edildi
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Bu sipariş iptal edilmiştir. Daha fazla
                                        bilgi için müşteri hizmetlerimizle
                                        iletişime geçebilirsiniz.
                                    </p>
                                </div>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
