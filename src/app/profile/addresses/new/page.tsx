'use client'

import type React from 'react'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    createAddressAPI,
    updateAddressAPI,
    getAddressByIdAPI,
} from '@/api/address/addresses.api'
import { useLocation } from '@/contexts/location-context'
import type { IDistrict } from '@/api/location/location.api'

export default function NewAddressPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const editId = searchParams.get('edit')
    const isEditMode = !!editId

    const { cities, getDistrictsByCity } = useLocation()

    const [loading, setLoading] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        addressDetail: '',
        cityId: '',
        districtId: '',
        postalCode: '',
        isDefault: false,
    })
    const [districts, setDistricts] = useState<IDistrict[]>([])
    const [districtsLoading, setDistrictsLoading] = useState(false)

    const loadAddress = useCallback(
        async (addressId: number) => {
            try {
                setFormLoading(true)
                const address = await getAddressByIdAPI(addressId)

                // İlçeleri yükle
                const loadedDistricts = await getDistrictsByCity(
                    address.cityId,
                )
                setDistricts(loadedDistricts)

                setFormData({
                    title: address.title,
                    addressDetail: address.addressDetail,
                    cityId: address.cityId.toString(),
                    districtId: address.districtId.toString(),
                    postalCode: address.postalCode || '',
                    isDefault: address.isDefault,
                })
            } catch (error: any) {
                console.error('Adres yükleme hatası:', error)
                toast.error(
                    error.message || 'Adres yüklenirken bir hata oluştu',
                )
                router.push('/profile/addresses')
            } finally {
                setFormLoading(false)
            }
        },
        [getDistrictsByCity, router],
    )

    // Edit modda adresi yükle
    useEffect(() => {
        if (isEditMode && editId) {
            loadAddress(parseInt(editId))
        }
    }, [editId, isEditMode, loadAddress])

    const handleCityChange = async (cityId: string) => {
        setFormData({
            ...formData,
            cityId,
            districtId: '', // Reset district when city changes
        })

        // Geçersiz cityId kontrolü
        if (!cityId || cityId === '') {
            setDistricts([])
            return
        }

        const cityIdNum = parseInt(cityId)
        if (isNaN(cityIdNum)) {
            console.error('Geçersiz city ID:', cityId)
            setDistricts([])
            return
        }

        // İlçeleri API'den yükle
        try {
            setDistrictsLoading(true)
            const loadedDistricts = await getDistrictsByCity(cityIdNum)
            setDistricts(loadedDistricts)
        } catch (error) {
            console.error('İlçeler yüklenirken hata:', error)
            toast.error('İlçeler yüklenirken bir hata oluştu')
            setDistricts([])
        } finally {
            setDistrictsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Validasyon
        if (!formData.cityId || !formData.districtId) {
            toast.error('Lütfen şehir ve ilçe seçin')
            setLoading(false)
            return
        }

        const cityId = parseInt(formData.cityId)
        const districtId = parseInt(formData.districtId)

        if (isNaN(cityId) || isNaN(districtId)) {
            toast.error('Geçersiz şehir veya ilçe seçimi')
            setLoading(false)
            return
        }

        try {
            const requestData = {
                title: formData.title,
                addressDetail: formData.addressDetail,
                cityId,
                districtId,
                postalCode: formData.postalCode || undefined,
                isDefault: formData.isDefault,
            }

            if (isEditMode && editId) {
                await updateAddressAPI(parseInt(editId), requestData)
                toast.success('Adres başarıyla güncellendi')
            } else {
                await createAddressAPI(requestData)
                toast.success('Adres başarıyla eklendi')
            }

            setTimeout(() => {
                router.push('/profile/addresses')
            }, 1500)
        } catch (error: any) {
            toast.error(error.message || 'Adres kaydedilirken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    if (formLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="border-b bg-white">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center gap-4">
                            <Link href="/profile/addresses">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-semibold text-foreground">
                                {isEditMode
                                    ? 'Adres Düzenle'
                                    : 'Yeni Adres Ekle'}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-2xl px-4 py-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                        </div>
                    </Card>
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
                        <div className="flex items-center gap-4">
                            <Link href="/profile/addresses">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-semibold text-foreground">
                                {isEditMode
                                    ? 'Adres Düzenle'
                                    : 'Yeni Adres Ekle'}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto max-w-2xl px-4 py-8">
                    <Card className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Adres Başlığı</Label>
                                <Input
                                    id="title"
                                    placeholder="Örn: Ev, İş"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                        })
                                    }
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="cityId">Şehir</Label>
                                    <Select
                                        value={formData.cityId}
                                        onValueChange={handleCityChange}
                                        disabled={loading}
                                        required
                                    >
                                        <SelectTrigger id="cityId">
                                            <SelectValue placeholder="Şehir seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map((city) => (
                                                <SelectItem
                                                    key={city.id}
                                                    value={city.id.toString()}
                                                >
                                                    {city.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="districtId">İlçe</Label>
                                    <Select
                                        value={formData.districtId}
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                districtId: value,
                                            })
                                        }
                                        disabled={
                                            loading ||
                                            !formData.cityId ||
                                            districtsLoading
                                        }
                                        required
                                    >
                                        <SelectTrigger id="districtId">
                                            <SelectValue
                                                placeholder={
                                                    districtsLoading
                                                        ? 'Yükleniyor...'
                                                        : formData.cityId
                                                          ? 'İlçe seçin'
                                                          : 'Önce şehir seçin'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {districts.map((district) => (
                                                <SelectItem
                                                    key={district.id}
                                                    value={district.id.toString()}
                                                >
                                                    {district.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="addressDetail">
                                    Adres Detayı
                                </Label>
                                <Textarea
                                    id="addressDetail"
                                    rows={3}
                                    placeholder="Sokak, mahalle, bina no, daire no"
                                    value={formData.addressDetail}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            addressDetail: e.target.value,
                                        })
                                    }
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postalCode">
                                    Posta Kodu (Opsiyonel)
                                </Label>
                                <Input
                                    id="postalCode"
                                    value={formData.postalCode}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            postalCode: e.target.value,
                                        })
                                    }
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onCheckedChange={(checked) =>
                                        setFormData({
                                            ...formData,
                                            isDefault: checked as boolean,
                                        })
                                    }
                                    disabled={loading}
                                />
                                <label
                                    htmlFor="isDefault"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Varsayılan adres olarak ayarla
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Kaydediliyor...
                                        </>
                                    ) : isEditMode ? (
                                        'Güncelle'
                                    ) : (
                                        'Kaydet'
                                    )}
                                </Button>
                                <Link
                                    href="/profile/addresses"
                                    className="flex-1"
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full bg-transparent"
                                        disabled={loading}
                                    >
                                        İptal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}
