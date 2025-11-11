import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Item,
    ItemGroup,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
} from '@/components/ui/item'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '@/components/ui/empty'
import { Separator } from '@/components/ui/separator'
import { ButtonGroup } from '@/components/ui/button-group'

// Mock sepet verisi
const mockCartItems = [
    {
        id: 1,
        name: 'Ray-Ban Aviator Güneş Gözlüğü',
        description: 'Klasik pilot model, altın çerçeve',
        price: 1299,
        quantity: 1,
        image: '/rayban-aviator.jpg',
    },
    {
        id: 2,
        name: 'Oakley Holbrook Güneş Gözlüğü',
        description: 'Mat siyah çerçeve, polarize cam',
        price: 899,
        quantity: 2,
        image: '/oakley-holbrook.jpg',
    },
    {
        id: 3,
        name: 'Gözlük Koruma Kılıfı',
        description: 'Sert koruma kılıfı, mikrofiber bez hediyeli',
        price: 149,
        quantity: 1,
        image: '/glasses-case.jpg',
    },
]

// Sepet boş mu kontrolü - demo için false, gerçek uygulamada mockCartItems.length === 0
const isCartEmpty = false

export const metadata = {
    title: 'Sepetim | Gözlük Mağazası',
    description: 'Alışveriş sepeti sayfası',
}

export default function CartPage() {
    // Toplam hesaplamalar
    const subtotal = mockCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )
    const shipping = subtotal > 500 ? 0 : 50 // 500 TL üzeri ücretsiz kargo
    const tax = subtotal * 0.2 // KDV %20
    const total = subtotal + shipping + tax

    if (isCartEmpty) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="border-b bg-white">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-semibold text-foreground">
                                Sepetim
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <div className="container mx-auto max-w-4xl px-4 py-12">
                    <Card>
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <ShoppingCart />
                                </EmptyMedia>
                                <EmptyTitle>Sepetiniz Boş</EmptyTitle>
                                <EmptyDescription>
                                    Gözlük koleksiyonumuza göz atın ve
                                    favorilerinizi sepete ekleyin
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link href="/" className="w-full">
                                    <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                                        Alışverişe Başla
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex-1">
                            <h1 className="text-2xl font-semibold text-foreground">
                                Sepetim
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {mockCartItems.length} ürün
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Sol Taraf - Ürün Listesi */}
                    <div className="space-y-4 lg:col-span-2">
                        <Card className="overflow-hidden p-0">
                            <ItemGroup>
                                {mockCartItems.map((item, index) => (
                                    <div key={item.id}>
                                        <Item size="default" className="p-6">
                                            <ItemMedia variant="image">
                                                <img
                                                    src={
                                                        item.image ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={item.name}
                                                    className="h-24 w-24 rounded-lg object-cover"
                                                />
                                            </ItemMedia>

                                            <ItemContent>
                                                <ItemTitle>
                                                    {item.name}
                                                </ItemTitle>
                                                <ItemDescription>
                                                    {item.description}
                                                </ItemDescription>
                                                <div className="mt-2 flex items-center gap-4">
                                                    <span className="text-lg font-semibold text-emerald-600">
                                                        {item.price.toLocaleString(
                                                            'tr-TR',
                                                        )}{' '}
                                                        TL
                                                    </span>
                                                </div>
                                            </ItemContent>

                                            <ItemActions className="flex-col items-end gap-3">
                                                <Button
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>

                                                <ButtonGroup>
                                                    <Button
                                                        variant="outline"
                                                        size="icon-sm"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <div className="flex h-8 min-w-12 items-center justify-center border-y bg-background text-sm font-medium">
                                                        {item.quantity}
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="icon-sm"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </ButtonGroup>
                                            </ItemActions>
                                        </Item>
                                        {index < mockCartItems.length - 1 && (
                                            <Separator />
                                        )}
                                    </div>
                                ))}
                            </ItemGroup>
                        </Card>

                        {/* Alışverişe Devam Butonu */}
                        <Link href="/">
                            <Button
                                variant="outline"
                                className="w-full bg-transparent"
                            >
                                Alışverişe Devam Et
                            </Button>
                        </Link>
                    </div>

                    {/* Sağ Taraf - Sipariş Özeti */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <Card>
                                <div className="px-6">
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Sipariş Özeti
                                    </h2>
                                </div>

                                <div className="space-y-4 px-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Ara Toplam
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {subtotal.toLocaleString('tr-TR')}{' '}
                                            TL
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Kargo
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {shipping === 0 ? (
                                                <span className="text-emerald-600">
                                                    Ücretsiz
                                                </span>
                                            ) : (
                                                `${shipping.toLocaleString('tr-TR')} TL`
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            KDV (%20)
                                        </span>
                                        <span className="font-medium text-foreground">
                                            {tax.toLocaleString('tr-TR')} TL
                                        </span>
                                    </div>

                                    {shipping > 0 && (
                                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                                            <p className="text-xs text-emerald-700">
                                                <span className="font-medium">
                                                    {(
                                                        500 - subtotal
                                                    ).toLocaleString(
                                                        'tr-TR',
                                                    )}{' '}
                                                    TL
                                                </span>{' '}
                                                daha alışveriş yapın, kargo
                                                ücretsiz!
                                            </p>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-semibold text-foreground">
                                            Toplam
                                        </span>
                                        <span className="text-xl font-bold text-emerald-600">
                                            {total.toLocaleString('tr-TR')} TL
                                        </span>
                                    </div>
                                </div>

                                <div className="px-6">
                                    <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                                        Ödemeye Geç
                                    </Button>
                                    <p className="mt-3 text-center text-xs text-muted-foreground">
                                        Güvenli ödeme ile alışverişinizi
                                        tamamlayın
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
