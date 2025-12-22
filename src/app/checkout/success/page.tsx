'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'
import formatPrice from '@/utils/format-price'

export default function CheckoutSuccessPage() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(1000)
    const [copied, setCopied] = useState(false)

    const searchParams = useSearchParams()
    const orderId = searchParams.get('order') || 'N/A'
    const price = searchParams.get('price') || '0.00'

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    router.push('/')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="flex min-h-screen justify-center bg-background p-4">
            <div className="w-full max-w-2xl">
                {/* Success Icon */}
                <div className="animate-fade-in-up mb-8 flex justify-center">
                    <div className="relative">
                        <svg className="h-24 w-24" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="oklch(var(--success))"
                                strokeWidth="4"
                                strokeDasharray="283"
                                strokeDashoffset="283"
                                className="animate-circle-draw"
                                style={{ animationDelay: '0.2s' }}
                            />
                            <path
                                d="M30 50 L45 65 L70 35"
                                fill="none"
                                stroke="oklch(var(--success))"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="animate-check-scale"
                                style={{ animationDelay: '0.6s' }}
                            />
                        </svg>
                    </div>
                </div>

                {/* Main Card */}
                <Card
                    className="animate-fade-in-up p-8 shadow-xl"
                    style={{ animationDelay: '0.3s' }}
                >
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-balance text-4xl font-bold">
                            Ödeme Başarılı!
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            İşleminiz başarıyla tamamlandı. Siparişiniz
                            hazırlanıyor.
                        </p>
                    </div>

                    {/* Transaction Details */}
                    <div className="mb-6 space-y-4 rounded-lg bg-muted/50 p-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <span className="text-muted-foreground">
                                İşlem ID
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono font-semibold">
                                    {orderId}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        copyToClipboard('TRX1234567890')
                                        setCopied(true)
                                    }}
                                    className="h-8 w-8 p-0"
                                >
                                    {copied ? (
                                        <Check className="text-success h-4 w-4" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <span className="text-muted-foreground">Tutar</span>
                            <span className="text-xl font-semibold">
                                {formatPrice(parseFloat(price))}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <span className="text-muted-foreground">Tarih</span>
                            <span className="font-medium">
                                {new Date().toLocaleDateString('tr-TR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Durum</span>
                            <div className="flex items-center gap-2">
                                <div className="bg-success h-2 w-2 animate-pulse rounded-full" />
                                <span className="text-success font-medium">
                                    Onaylandı
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <p className="text-center text-sm text-foreground/80">
                            Sipariş onayınız e-posta adresinize gönderildi.
                            <br />
                            Takip numaranız ile kargo durumunuzu kontrol
                            edebilirsiniz.
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="mb-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            {countdown} saniye sonra ana sayfaya
                            yönlendirileceksiniz...
                        </p>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full bg-primary transition-all duration-1000 ease-linear"
                                style={{
                                    width: `${((10 - countdown) / 10) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            onClick={() => router.push('/')}
                            className="group flex-1"
                        >
                            Ana Sayfa
                        </Button>
                    </div>
                </Card>

                {/* Footer Note */}
                <p
                    className="animate-fade-in-up mt-6 text-center text-sm text-muted-foreground"
                    style={{ animationDelay: '0.5s' }}
                >
                    Sorularınız için müşteri hizmetlerimize ulaşabilirsiniz
                </p>
            </div>
        </div>
    )
}
