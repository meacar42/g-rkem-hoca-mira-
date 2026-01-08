import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    Phone,
    MapPin,
    Glasses,
    Truck,
    Shield,
    CreditCard,
    Sparkles,
} from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="border-b border-background/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 gap-6 py-8 text-emerald-500 md:grid-cols-4">
                        {[
                            {
                                icon: Truck,
                                text: 'Ücretsiz Kargo',
                                sub: '1000₺ üzeri siparişlerde',
                            },
                            {
                                icon: Shield,
                                text: '2 Yıl Garanti',
                                sub: 'Tüm ürünlerde',
                            },
                            {
                                icon: CreditCard,
                                text: 'Güvenli Ödeme',
                                sub: '256-bit SSL',
                            },
                            {
                                icon: Sparkles,
                                text: 'Orijinal Ürün',
                                sub: '100% garantili',
                            },
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-background/10">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">
                                        {feature.text}
                                    </p>
                                    <p className="text-xs text-background/50">
                                        {feature.sub}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Glasses className="h-8 w-8 text-emerald-500" />
                            <span className="text-2xl font-bold">
                                Mira{' '}
                                <span className="text-emerald-500">Optik</span>
                            </span>
                        </div>
                        <p className="mb-4 text-sm text-gray-400">
                            En kaliteli gözlükleri en uygun fiyatlarla sunan
                            Mira Optik, stilinizi ve görüşünüzü
                            mükemmelleştirir.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="https://www.instagram.com/miraoptik/"
                                className="hover:text-emerald-500"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="https://wa.me/905300641700"
                                className="hover:text-emerald-500"
                            >
                                <Phone className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold">Alışveriş</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link
                                    href="/catalog?type=sunglasses"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Güneş Gözlükleri
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog?type=prescription"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Optik Gözlükler
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/catalog?type=solution"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Lens Solüsyonları
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold">
                            Müşteri Hizmetleri
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="/about">Hakkımızda</Link>
                            </li>
                            <li>
                                <Link href="/contact">İletişim</Link>
                            </li>
                            <li>
                                <Link href="/order/track">Sipariş Takibi</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold">İletişim</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-emerald-500" />
                                <span>support@miraoptik.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-emerald-500" />
                                <span>0530 064 17 00</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-1 h-4 w-4 text-emerald-500" />
                                <span>
                                    Kocatepe Cd. no:1/C, 34045
                                    <br />
                                    Bayrampaşa/İstanbul
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
                    <p className="text-sm text-gray-400">
                        © 2026 Mira Optik. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                        <span>Visa</span>
                        <span>Mastercard</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
