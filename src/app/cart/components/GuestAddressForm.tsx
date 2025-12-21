'use client'

import { memo } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ICity, IDistrict } from '@/api/location/location.api'

export interface GuestAddress {
    cityId: string
    districtId: string
    addressDetail: string
}

interface GuestAddressFormProps {
    address: GuestAddress
    onChange: (address: GuestAddress) => void
    cities: ICity[]
    districts: IDistrict[]
    isLoadingDistricts: boolean
    onCityChange: (cityId: string) => void
    idPrefix?: string
}

function GuestAddressForm({
    address,
    onChange,
    cities,
    districts,
    isLoadingDistricts,
    onCityChange,
    idPrefix = '',
}: GuestAddressFormProps) {
    const handleChange = (field: keyof GuestAddress, value: string) => {
        onChange({ ...address, [field]: value })
    }

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor={`${idPrefix}city`}>Şehir *</Label>
                    <Select value={address.cityId} onValueChange={onCityChange}>
                        <SelectTrigger id={`${idPrefix}city`}>
                            <SelectValue placeholder="Şehir seçin" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city.id} value={city.id.toString()}>
                                    {city.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor={`${idPrefix}district`}>İlçe *</Label>
                    <Select
                        value={address.districtId}
                        onValueChange={(value) => handleChange('districtId', value)}
                        disabled={!address.cityId || isLoadingDistricts}
                    >
                        <SelectTrigger id={`${idPrefix}district`}>
                            <SelectValue
                                placeholder={
                                    isLoadingDistricts
                                        ? 'Yükleniyor...'
                                        : address.cityId
                                            ? 'İlçe seçin'
                                            : 'Önce şehir seçin'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map((district) => (
                                <SelectItem key={district.id} value={district.id.toString()}>
                                    {district.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor={`${idPrefix}addressDetail`}>Adres Detayı *</Label>
                <Textarea
                    id={`${idPrefix}addressDetail`}
                    placeholder="Mahalle, sokak, bina no, daire no gibi detaylı adres bilgilerini girin"
                    value={address.addressDetail}
                    onChange={(e) => handleChange('addressDetail', e.target.value)}
                    rows={3}
                    className="resize-none"
                />
                {address.addressDetail.length > 0 && address.addressDetail.length < 10 && (
                    <p className="text-xs text-orange-600">En az 10 karakter girmelisiniz</p>
                )}
            </div>
        </div>
    )
}

export default memo(GuestAddressForm)
