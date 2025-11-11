import Link from 'next/link'
import { User, MapPin, Package, Mail, Phone, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const mockUser = {
    name: 'Ahmet',
    surname: 'Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '+90 532 123 45 67',
}

export const metadata = {
    title: 'Profilim | Gözlük Mağazası',
    description: 'Kullanıcı profil sayfası',
}

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Profilim
                    </h1>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Kullanıcı Bilgileri Kartı */}
                <Card className="mb-6 p-6">
                    <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                <User className="h-8 w-8 text-emerald-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    {mockUser.name} {mockUser.surname}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {mockUser.email}
                                </p>
                            </div>
                        </div>
                        <Link href="/profile/edit">
                            <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                                Düzenle
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-3 border-t pt-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                                {mockUser.email}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                                {mockUser.phone}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Hızlı Erişim Menüsü */}
                <div className="space-y-3">
                    <Link href="/profile/addresses">
                        <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                                        <MapPin className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">
                                            Adreslerim
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Teslimat adreslerini yönet
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Card>
                    </Link>

                    <Link href="/profile/orders">
                        <Card className="cursor-pointer p-4 transition-shadow hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                                        <Package className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground">
                                            Siparişlerim
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Geçmiş siparişlerini görüntüle
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )
}
