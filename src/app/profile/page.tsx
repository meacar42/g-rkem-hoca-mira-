'use client'
import Link from 'next/link'
import {
    User,
    MapPin,
    Package,
    Mail,
    Phone,
    ChevronRight,
    AlertOctagon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/use-user'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function ProfilePage() {
    const { currentUser } = useUser()

    const isUserDataIncomplete =
        !currentUser?.phone || !currentUser?.name || !currentUser?.surname

    if (!currentUser) {
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
                    <Card className="mb-6 p-6">
                        <div className="mb-6 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-40" />
                                    <Skeleton className="h-4 w-56" />
                                </div>
                            </div>
                            <Skeleton className="h-10 w-24" />
                        </div>

                        <div className="space-y-3 border-t pt-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-3">
                        <Card className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </div>
                                <Skeleton className="h-5 w-5" />
                            </div>
                        </Card>

                        <Card className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </div>
                                <Skeleton className="h-5 w-5" />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }

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
                <Card className="mb-6 p-6">
                    {isUserDataIncomplete && (
                        <div className="mb-4 flex items-center gap-4">
                            <Alert className="space-x-2">
                                <AlertOctagon color="orange" />
                                <AlertTitle>Bilgileri Güncelle</AlertTitle>
                                <AlertDescription>
                                    Eksik veya yanlış bilgilerinizi güncellemek
                                    için &#34;Düzenle&#34; butonuna tıklayın.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                    <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                                <User className="h-8 w-8 text-emerald-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    {currentUser?.name} {currentUser?.surname}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {currentUser?.email}
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
                                {currentUser?.email}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-foreground">
                                {currentUser?.phone}
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
