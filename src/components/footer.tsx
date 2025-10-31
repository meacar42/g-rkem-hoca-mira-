
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Glasses } from 'lucide-react';
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Glasses className="w-8 h-8 text-emerald-500" />
                            <span className="text-2xl font-bold">Mira <span className="text-emerald-500">Optik</span></span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Quality eyewear for every style and vision need. Your trusted partner in eye care.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/sunglasses" className="hover:text-emerald-500 transition-colors">Shop Sunglasses</Link></li>
                            <li><Link href="/eyeglasses" className="hover:text-emerald-500 transition-colors">Shop Eyeglasses</Link></li>
                            <li><Link href="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Size Guide</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                <span>info@miraoptik.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-emerald-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-emerald-500 mt-1" />
                                <span>123 Vision Street<br />New York, NY 10001</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
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
    );
}
