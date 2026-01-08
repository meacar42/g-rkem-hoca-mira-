'use client'
import { useState } from 'react'
import { ShoppingCart, User as UserIcon, Menu, X, Glasses } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/contexts/cart-context'

export default function Header() {
    const { localCart } = useCart()
    const cartItemCount = localCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
    )
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        { name: 'Ana Sayfa', href: '/' },
        { name: 'Güneş Gözlüğü', href: '/catalog' },
        { name: 'Optik Gözlük', href: '/catalog' },
        { name: 'Lens Solüsyonu', href: '/about' },
        { name: 'Hakkımızda', href: '/contact' },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2">
                        <Glasses className="h-8 w-8 text-emerald-500 transition-transform group-hover:scale-110" />
                        <span className="text-2xl font-bold text-black">
                            Mira <span className="text-emerald-500">Optik</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="font-medium text-gray-700 transition-colors hover:text-emerald-500"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/profile">
                            <UserIcon className="h-5 w-5 text-gray-700" />
                        </Link>
                        <Link
                            href="/cart"
                            className="relative rounded-full p-2 transition-colors hover:bg-gray-100"
                        >
                            <ShoppingCart className="h-5 w-5 text-gray-700" />
                            {cartItemCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-gray-200 bg-white md:hidden">
                    <nav className="space-y-3 px-4 py-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-2 font-medium text-gray-700 transition-colors hover:text-emerald-500"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}
