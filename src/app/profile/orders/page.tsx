import Link from 'next/link'
import { ArrowLeft, Package, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock sipariş verisi
const mockOrders = [
    {
        id: 'ORD-2024-001',
        date: '15 Mart 2024',
        status: 'Teslim Edildi',
        statusColor: 'bg-emerald-100 text-emerald-700',
        total: '1.299,00 TL',
        items: [
            {
                name: 'Ray-Ban Aviator Güneş Gözlüğü',
                quantity: 1,
                image: '/rayban-aviator.jpg',
            },
        ],
    },
    {
        id: 'ORD-2024-002',
        date: '8 Mart 2024',
        status: 'Kargoda',
        statusColor: 'bg-blue-100 text-blue-700',
        total: '899,00 TL',
        items: [
            {
                name: 'Oakley Holbrook Güneş Gözlüğü',
                quantity: 1,
                image: '/oakley-holbrook.jpg',
            },
        ],
    },
    {
        id: 'ORD-2024-003',
        date: '1 Mart 2024',
        status: 'Hazırlanıyor',
        statusColor: 'bg-yellow-100 text-yellow-700',
        total: '1.599,00 TL',
        items: [
            {
                name: 'Persol PO3019S Güneş Gözlüğü',
                quantity: 1,
                image: '/persol-sunglasses.jpg',
            },
            {
                name: 'Gözlük Koruma Kılıfı',
                quantity: 1,
                image: '/glasses-case.jpg',
            },
        ],
    },
]

export const metadata = {
    title: 'Siparişlerim | Gözlük Mağazası',
    description: 'Sipariş geçmişi sayfası',
}

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
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

            <div className="container mx-auto max-w-4xl px-4 py-8">
                {mockOrders.length === 0 ? (
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
                                <Link href="/">
                                    <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                                        Alışverişe Başla
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {mockOrders.map((order) => (
                            <Card
                                key={order.id}
                                className="p-6 transition-shadow hover:shadow-md"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <div className="mb-2 flex items-center gap-3">
                                            <h3 className="font-semibold text-foreground">
                                                {order.id}
                                            </h3>
                                            <Badge
                                                variant="secondary"
                                                className={order.statusColor}
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {order.date}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="mb-4 space-y-3">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <img
                                                src={
                                                    item.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={item.name}
                                                className="h-16 w-16 rounded-lg bg-gray-100 object-cover"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-foreground">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Adet: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t pt-4">
                                    <span className="text-sm text-muted-foreground">
                                        Toplam Tutar
                                    </span>
                                    <span className="text-lg font-semibold text-foreground">
                                        {order.total}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
