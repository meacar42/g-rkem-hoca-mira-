'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    XCircle,
    ArrowLeft,
    RefreshCcw,
    HelpCircle,
    PhoneCall,
} from 'lucide-react'

export default function CheckoutFailurePage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const errorMessage =
        searchParams.get('message') || 'Ödeme işleminiz tamamlanamadı'
    const currentDate = new Date()

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="w-full max-w-2xl">
                {/* Error Icon */}
                <div className="animate-fade-in-up mb-8 flex justify-center">
                    <div className="animate-shake relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
                            <XCircle
                                className="h-16 w-16 text-destructive"
                                strokeWidth={2}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <Card
                    className="animate-fade-in-up p-8 shadow-xl"
                    style={{ animationDelay: '0.2s' }}
                >
                    <div className="mb-8 text-center">
                        <h1 className="mb-3 text-balance text-4xl font-bold text-destructive">
                            Bir Hata Meydana Geldi
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {errorMessage}
                            <br />
                            {
                                'Lütfen tekrar deneyin veya destek ile iletişime geçin.'
                            }
                        </p>
                    </div>

                    <div className="mb-6 space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-6">
                        <div className="flex items-center justify-between border-b border-destructive/20 pb-4">
                            <span className="text-muted-foreground">Tarih</span>
                            <span className="font-medium">
                                {currentDate.toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Durum</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                                <span className="font-medium text-destructive">
                                    Başarısız
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Help Box */}
                    <div className="mb-6 rounded-lg bg-muted/50 p-4">
                        <div className="flex gap-3">
                            <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                            <div className="space-y-2 text-sm">
                                <p className="font-medium">
                                    Yaşanan sorunları çözmek için:
                                </p>
                                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                                    <li>Kart bilgilerinizi kontrol edin</li>
                                    <li>
                                        Kartınızda yeterli bakiye olduğundan
                                        emin olun
                                    </li>
                                    <li>Farklı bir ödeme yöntemi deneyin</li>
                                    <li>Bankanızla iletişime geçin</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            onClick={() => router.push('/checkout')}
                            className="group flex-1"
                        >
                            <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                            Tekrar Dene
                        </Button>
                        <Button
                            onClick={() => router.back()}
                            className="group flex-1 bg-emerald-500 hover:bg-emerald-400"
                            variant={'ghost'}
                        >
                            <PhoneCall className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                            Müşteri Destek
                        </Button>
                    </div>
                </Card>

                {/* Footer Note */}
                <p
                    className="animate-fade-in-up mt-6 text-center text-sm text-muted-foreground"
                    style={{ animationDelay: '0.4s' }}
                >
                    Sorun devam ederse lütfen müşteri hizmetlerimizle iletişime
                    geçin
                </p>
            </div>
        </div>
    )
}
