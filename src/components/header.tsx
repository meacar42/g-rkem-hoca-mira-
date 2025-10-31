"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart, User as UserIcon, Menu, X, Glasses, LogOut } from 'lucide-react';
import Link from "next/link";

interface HeaderProps {
    cartItemCount: number;
}

export default function Header({ cartItemCount }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<any>(null);
    // const [user, setUser] = useState<User | null>(null);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Sunglasses', href: '/catalog' },
        { name: 'Eyeglasses', href: '/catalog' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ];

    useEffect(() => {
        // Başlangıçta user kontrolü
        // const checkUser = async () => {
        //     const currentUser = await authService.getCurrentUser();
        //     setUser(currentUser);
        // };
        // checkUser();

        // Auth state değişikliklerini dinle
        // const unsubscribe = authService.onAuthStateChange((currentUser) => {
        //     setUser(currentUser);
        // });
        //
        // return () => {
        //     unsubscribe();
        // };
    }, []);

    // const handleSignOut = async () => {
    //     try {
    //         await authService.signOut();
    //         setUser(null);
    //     } catch (error) {
    //         console.error('Error signing out:', error);
    //     }
    // };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <Glasses className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
                        <span className="text-2xl font-bold text-black">
              Mira <span className="text-emerald-500">Optik</span>
            </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-emerald-500 font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="text-sm text-gray-700">{user.email}</span>
                                <button
                                    onClick={() => {}}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Sign out"
                                >
                                    <LogOut className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
                            >
                                <UserIcon className="w-5 h-5 text-gray-700" />
                            </button>
                        )}
                        <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingCart className="w-5 h-5 text-gray-700" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
                            )}
                        </Link>
                        <button
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <nav className="px-4 py-4 space-y-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-2 text-gray-700 hover:text-emerald-500 font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}

            {/*<AuthModal*/}
            {/*    isOpen={showAuthModal}*/}
            {/*    onClose={() => setShowAuthModal(false)}*/}
            {/*    onSuccess={() => {}}*/}
            {/*/>*/}
        </header>
    );
}
