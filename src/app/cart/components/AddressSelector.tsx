'use client'

import { memo } from 'react'
import Link from 'next/link'
import { MapPin, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IAddress } from '@/api/address/addresses.api'

interface AddressSelectorProps {
    addresses: IAddress[]
    selectedAddressId: number | null
    onSelect: (id: number) => void
    isLoading: boolean
    emptyIcon?: React.ReactNode
    emptyMessage?: string
    showAddButton?: boolean
}

function AddressSelector({
    addresses,
    selectedAddressId,
    onSelect,
    isLoading,
    emptyIcon,
    emptyMessage = 'Henüz kayıtlı adresiniz yok',
    showAddButton = true,
}: AddressSelectorProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            </div>
        )
    }

    if (addresses.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                {emptyIcon || <MapPin className="mx-auto h-10 w-10 text-gray-400" />}
                <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
                {showAddButton && (
                    <Link href="/profile/addresses/new">
                        <Button variant="outline" className="mt-3">
                            Adres Ekle
                        </Button>
                    </Link>
                )}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-3">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        onClick={() => onSelect(address.id)}
                        className={`cursor-pointer rounded-lg border p-4 transition-all ${
                            selectedAddressId === address.id
                                ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground">
                                        {address.title}
                                    </span>
                                    {address.isDefault && (
                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                            Varsayılan
                                        </span>
                                    )}
                                </div>
                                {address.fullName && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {address.fullName}
                                    </p>
                                )}
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {address.addressDetail}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {address.districtName} / {address.cityName}
                                    {address.postalCode && ` - ${address.postalCode}`}
                                </p>
                                {address.phone && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Tel: {address.phone}
                                    </p>
                                )}
                            </div>
                            <div className="ml-4">
                                {selectedAddressId === address.id ? (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                ) : (
                                    <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showAddButton && (
                <Link href="/profile/addresses/new">
                    <Button variant="outline" className="w-full">
                        Yeni Adres Ekle
                    </Button>
                </Link>
            )}
        </div>
    )
}

export default memo(AddressSelector)
