'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        name: 'Ahmet',
        surname: 'Yılmaz',
        email: 'ahmet.yilmaz@example.com',
        phone: '+90 532 123 45 67',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Kaydetme işlemi burada yapılacak
        console.log('Form data:', formData)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-4">
                        <Link href="/profile">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-semibold text-foreground">
                            Profili Düzenle
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-2xl px-4 py-8">
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Ad</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="surname">Soyad</Label>
                                <Input
                                    id="surname"
                                    value={formData.surname}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            surname: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
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

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600"
                            >
                                Kaydet
                            </Button>
                            <Link href="/profile" className="flex-1">
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
