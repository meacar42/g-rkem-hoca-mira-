'use client'

import { memo } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface OrderSummaryProps {
    subtotal: number
    shipping: number
    total: number
    isValid: boolean
    isLoading: boolean
    isCheckingOut: boolean
    onCheckout: () => void
}

function OrderSummary({
    subtotal,
    shipping,
    total,
    isValid,
    isLoading,
    isCheckingOut,
    onCheckout,
}: OrderSummaryProps) {
    const formatPrice = (price: number) => {
        return price.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    return (
        <Card>
            <div className="px-6">
                <h2 className="text-xl font-semibold text-foreground">
                    Sipariş Özeti
                </h2>
            </div>

            <div className="space-y-4 px-6">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ara Toplam</span>
                    <span className="font-medium text-foreground">
                        {formatPrice(subtotal)} TL
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Kargo</span>
                    <span className="font-medium text-foreground">
                        {shipping === 0 ? (
                            <span className="text-emerald-600">Ücretsiz</span>
                        ) : (
                            `${formatPrice(shipping)} TL`
                        )}
                    </span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">
                        Toplam
                    </span>
                    <span className="text-xl font-bold text-emerald-600">
                        {formatPrice(total)} TL
                    </span>
                </div>
            </div>

            <div className="px-6">
                <Button
                    className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
                    disabled={isLoading || isCheckingOut || !isValid}
                    onClick={onCheckout}
                >
                    {isCheckingOut ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sipariş Oluşturuluyor...
                        </>
                    ) : isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            İşleniyor...
                        </>
                    ) : (
                        'Siparişi Tamamla'
                    )}
                </Button>
                {!isValid && (
                    <p className="mt-2 text-center text-xs text-orange-600">
                        Devam etmek için tüm bilgileri eksiksiz doldurun
                    </p>
                )}
                <p className="mt-3 text-center text-xs text-muted-foreground">
                    Güvenli ödeme ile alışverişinizi tamamlayın
                </p>
            </div>
        </Card>
    )
}

export default memo(OrderSummary, (prevProps, nextProps) => {
    return (
        prevProps.subtotal === nextProps.subtotal &&
        prevProps.shipping === nextProps.shipping &&
        prevProps.total === nextProps.total &&
        prevProps.isValid === nextProps.isValid &&
        prevProps.isLoading === nextProps.isLoading &&
        prevProps.isCheckingOut === nextProps.isCheckingOut
    )
})
