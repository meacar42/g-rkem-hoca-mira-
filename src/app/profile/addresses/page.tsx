'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, MapPin, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock adres verisi
const mockAddresses = [
    {
        id: 1,
        title: 'Ev',
        fullName: 'Ahmet Yılmaz',
        phone: '+90 532 123 45 67',
        address: 'Atatürk Caddesi No:123 Daire:5',
        district: 'Kadıköy',
        city: 'İstanbul',
        postalCode: '34710',
        isDefault: true,
    },
    {
        id: 2,
        title: 'İş',
        fullName: 'Ahmet Yılmaz',
        phone: '+90 532 123 45 67',
        address: 'İş Merkezi Kat:8 No:42',
        district: 'Şişli',
        city: 'İstanbul',
        postalCode: '34360',
        isDefault: false,
    },
]

export default function AddressesPage() {
    const [addresses] = useState(mockAddresses)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/profile">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-semibold text-foreground">
                                Adreslerim
                            </h1>
                        </div>
                        <Link href="/profile/addresses/new">
                            <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Yeni Adres
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-8">
                {addresses.length === 0 ? (
                    <Card className="p-12">
                        <div className="space-y-4 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <MapPin className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-medium text-foreground">
                                    Henüz adres eklenmemiş
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Teslimat için bir adres ekleyin
                                </p>
                                <Link href="/profile/addresses/new">
                                    <Button className="bg-emerald-500 text-white hover:bg-emerald-600">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Adres Ekle
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <Card key={address.id} className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                            <MapPin className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <div className="mb-1 flex items-center gap-2">
                                                <h3 className="font-semibold text-foreground">
                                                    {address.title}
                                                </h3>
                                                {address.isDefault && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                    >
                                                        Varsayılan
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="mb-1 text-sm font-medium text-foreground">
                                                {address.fullName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {address.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="pl-13 text-sm text-muted-foreground">
                                    <p>{address.address}</p>
                                    <p>
                                        {address.district} / {address.city}{' '}
                                        {address.postalCode}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
