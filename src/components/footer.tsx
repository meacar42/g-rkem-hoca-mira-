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
                                sub: '500₺ üzeri siparişlerde',
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
                            Quality eyewear for every style and vision need.
                            Your trusted partner in eye care.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-emerald-500"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-emerald-500"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-emerald-500"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link
                                    href="/sunglasses"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Shop Sunglasses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/eyeglasses"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Shop Eyeglasses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold">
                            Customer Service
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Size Guide
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-emerald-500"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold">Contact Info</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-emerald-500" />
                                <span>info@miraoptik.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-emerald-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-1 h-4 w-4 text-emerald-500" />
                                <span>
                                    123 Vision Street
                                    <br />
                                    New York, NY 10001
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
                    <p className="text-sm text-gray-400">
                        © 2025 Mira Optik. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>American Express</span>
                        <span>PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
