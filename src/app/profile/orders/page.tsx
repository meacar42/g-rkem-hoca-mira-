'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowLeft,
    Package,
    ChevronDown,
    ChevronUp,
    Loader2,
    Truck,
    ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    getMyOrdersAPI,
    IOrder,
    IOrderProduct,
    ORDER_STATUS_MAP,
} from '@/api/orders/orders.api'

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

// Fiyat formatlama
function formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(price)
}

// Tarih formatlama
function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(dateString))
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getMyOrdersAPI()
                setOrders(data)
            } catch (err) {
                console.error('Siparişler yüklenirken hata:', err)
                setError('Siparişler yüklenirken bir hata oluştu')
            } finally {
                setIsLoading(false)
            }
        }

        fetchOrders()
    }, [])

    const toggleOrder = (orderId: string) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
    }

    // Loading durumu
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <OrdersHeader />
                <div className="container mx-auto flex max-w-4xl items-center justify-center px-4 py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                        <p className="text-muted-foreground">
                            Siparişleriniz yükleniyor...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Hata durumu
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <OrdersHeader />
                <div className="container mx-auto max-w-4xl px-4 py-8">
                    <Card className="p-12">
                        <div className="space-y-4 text-center">
                            <p className="text-red-500">{error}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-emerald-500 text-white hover:bg-emerald-600"
                            >
                                Tekrar Dene
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <OrdersHeader />

            <div className="container mx-auto max-w-4xl px-4 py-8">
                {orders.length === 0 ? (
                    <Card className="p-12">
                        <div className="space-y-4 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Package className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-medium text-foreground">
                                    Henüz sipariş yok
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    İlk siparişinizi vererek başlayın
                                </p>
                                <Link href="/catalog">
                                    <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                                        Alışverişe Başla
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                isExpanded={expandedOrderId === order.id}
                                onToggle={() => toggleOrder(order.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// Header component
function OrdersHeader() {
    return (
        <div className="border-b bg-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-4">
                    <Link href="/profile">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Siparişlerim
                    </h1>
                </div>
            </div>
        </div>
    )
}

// Sipariş kartı component
function OrderCard({
    order,
    isExpanded,
    onToggle,
}: {
    order: IOrder
    isExpanded: boolean
    onToggle: () => void
}) {
    const status = ORDER_STATUS_MAP[order.status] || {
        label: order.status,
        color: 'bg-gray-100 text-gray-700',
    }

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
            {/* Sipariş özeti - tıklanabilir */}
            <button
                onClick={onToggle}
                className="w-full p-6 text-left transition-colors hover:bg-gray-50"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                            <h3 className="font-semibold text-foreground">
                                Sipariş No: {order.id.slice(0, 18).toUpperCase()}
                            </h3>
                            <Badge variant="secondary" className={status.color}>
                                {status.label}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span>{formatDate(order.createdAt)}</span>
                            <span>•</span>
                            <span>{order.products.length} ürün</span>
                            <span>•</span>
                            <span className="font-medium text-foreground">
                                {formatPrice(order.paidPrice)}
                            </span>
                        </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                </div>
            </button>

            {/* Detay bölümü - accordion */}
            {isExpanded && (
                <div className="border-t bg-gray-50/50 p-6">
                    {/* Ürün listesi */}
                    <div className="mb-6">
                        <h4 className="mb-4 text-sm font-medium text-foreground">
                            Sipariş Detayları
                        </h4>
                        <div className="space-y-3">
                            {order.products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Kargo takip */}
                    {order.shipmentTrackingNumber && (
                        <div className="mb-6 flex items-center gap-2 rounded-lg bg-blue-50 p-3">
                            <Truck className="h-5 w-5 text-blue-600" />
                            <span className="text-sm text-blue-700">
                                Kargo Takip: {order.shipmentTrackingNumber}
                            </span>
                            {order.shipmentURL && (
                                <a
                                    href={order.shipmentURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto"
                                >
                                    <Button variant="ghost" size="sm">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </a>
                            )}
                        </div>
                    )}

                    {/* Ödeme detayları */}
                    <div className="rounded-lg bg-white p-4">
                        <h4 className="mb-3 text-sm font-medium text-foreground">
                            Ödeme Bilgileri
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Ara Toplam
                                </span>
                                <span>{formatPrice(order.price)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Kargo
                                </span>
                                <span>
                                    {order.shipmentPrice > 0
                                        ? formatPrice(order.shipmentPrice)
                                        : 'Ücretsiz'}
                                </span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-medium">
                                <span>Toplam</span>
                                <span>{formatPrice(order.paidPrice)}</span>
                            </div>
                        </div>
                        {order.cardLastFourDigits && (
                            <div className="mt-3 border-t pt-3 text-sm text-muted-foreground">
                                Kart: **** **** **** {order.cardLastFourDigits}
                                {order.installment > 1 && (
                                    <span className="ml-2">
                                        ({order.installment} taksit)
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Card>
    )
}

// Ürün satırı component
function ProductItem({ product }: { product: IOrderProduct }) {
    const getImageUrl = () => {
        if (!product.image) return '/placeholder.svg'
        if (product.image.startsWith('http')) return product.image
        if (IMAGE_BASE_URL) return `${IMAGE_BASE_URL}/${product.image}`
        return `/uploads/${product.image}`
    }

    const imageUrl = getImageUrl()

    return (
        <div className="flex items-center gap-4 rounded-lg bg-white p-3">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">
                    {product.name}
                </p>
                <p className="text-sm text-muted-foreground">
                    {formatPrice(product.price)}
                </p>
            </div>
        </div>
    )
}
