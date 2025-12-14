'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, MapPin, Edit, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    getAddressesAPI,
    deleteAddressAPI,
    setDefaultAddressAPI,
    IAddress,
} from '@/api/address/addresses.api'

export default function AddressesPage() {
    const router = useRouter()
    const [addresses, setAddresses] = useState<IAddress[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<number | null>(null)

    // Adresleri yükle
    useEffect(() => {
        loadAddresses()
    }, [])

    const loadAddresses = async () => {
        try {
            setLoading(true)
            const data = await getAddressesAPI()
            setAddresses(data)
        } catch (error: any) {
            toast.error(error.message || 'Adresler yüklenirken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (addressId: number, title: string) => {
        const confirmed = window.confirm(
            `"${title}" adresini silmek istediğinizden emin misiniz?`,
        )

        if (!confirmed) return

        try {
            setActionLoading(addressId)
            await deleteAddressAPI(addressId)
            toast.success('Adres başarıyla silindi')
            loadAddresses()
        } catch (error: any) {
            toast.error(error.message || 'Adres silinirken bir hata oluştu')
        } finally {
            setActionLoading(null)
        }
    }

    const handleSetDefault = async (addressId: number) => {
        try {
            setActionLoading(addressId)
            await setDefaultAddressAPI(addressId)
            toast.success('Varsayılan adres güncellendi')
            loadAddresses()
        } catch (error: any) {
            toast.error(
                error.message ||
                    'Varsayılan adres ayarlanırken bir hata oluştu',
            )
        } finally {
            setActionLoading(null)
        }
    }

    // Loading skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
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
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="p-6">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <Skeleton className="h-10 w-10 rounded-lg" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-5 w-32" />
                                            <Skeleton className="h-4 w-40" />
                                            <Skeleton className="h-4 w-36" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-9 w-9" />
                                        <Skeleton className="h-9 w-9" />
                                    </div>
                                </div>
                                <div className="pl-13 space-y-1">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
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
                                        {!address.isDefault && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleSetDefault(address.id)
                                                }
                                                disabled={
                                                    actionLoading === address.id
                                                }
                                                title="Varsayılan yap"
                                            >
                                                <Star className="h-4 w-4 text-yellow-500" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                router.push(
                                                    `/profile/addresses/new?edit=${address.id}`,
                                                )
                                            }
                                            disabled={
                                                actionLoading === address.id
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(
                                                    address.id,
                                                    address.title,
                                                )
                                            }
                                            disabled={
                                                actionLoading === address.id
                                            }
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="pl-13 text-sm text-muted-foreground">
                                    <p>{address.addressDetail}</p>
                                    <p>
                                        {address.districtName} /{' '}
                                        {address.cityName}{' '}
                                        {address.postalCode &&
                                            `- ${address.postalCode}`}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
