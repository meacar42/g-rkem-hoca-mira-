'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

export default function NewAddressPage() {
    const [formData, setFormData] = useState({
        title: '',
        fullName: '',
        phone: '',
        address: '',
        district: '',
        city: '',
        postalCode: '',
        isDefault: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Address data:', formData)
        // Kaydetme işlemi burada yapılacak
    }

    return (
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
                            Yeni Adres Ekle
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
                                required
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Ad Soyad</Label>
                                <Input
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            fullName: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefon</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Adres</Label>
                            <Textarea
                                id="address"
                                rows={3}
                                placeholder="Sokak, mahalle, bina no, daire no"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="district">İlçe</Label>
                                <Input
                                    id="district"
                                    value={formData.district}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            district: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">İl</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            city: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Posta Kodu</Label>
                                <Input
                                    id="postalCode"
                                    value={formData.postalCode}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            postalCode: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
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
                            >
                                Kaydet
                            </Button>
                            <Link href="/profile/addresses" className="flex-1">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full bg-transparent"
                                >
                                    İptal
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
