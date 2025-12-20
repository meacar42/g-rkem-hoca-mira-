'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@/hooks/use-user'

export default function EditProfilePage() {
    const router = useRouter()
    const { currentUser, updateProfile } = useUser()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                surname: currentUser.surname || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                password: '',
                confirmPassword: '',
            })
        }
    }, [currentUser])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (
            formData.password &&
            formData.password !== formData.confirmPassword
        ) {
            toast.error('Şifreler eşleşmiyor')
            setLoading(false)
            return
        }

        if (formData.password && formData.password.length < 6) {
            toast.error('Şifre en az 6 karakter olmalıdır')
            setLoading(false)
            return
        }

        try {
            const updateData: any = {}

            // Sadece değişen alanları ekle (null ve boş string aynı kabul edilir)
            const normalizeValue = (val: string | null) =>
                val === null || val === '' ? '' : val

            if (
                formData.name &&
                normalizeValue(formData.name) !==
                    normalizeValue(currentUser?.name || null)
            ) {
                updateData.name = formData.name
            }
            if (
                formData.surname &&
                normalizeValue(formData.surname) !==
                    normalizeValue(currentUser?.surname || null)
            ) {
                updateData.surname = formData.surname
            }
            if (
                formData.email &&
                normalizeValue(formData.email) !==
                    normalizeValue(currentUser?.email || null)
            ) {
                updateData.email = formData.email
            }
            if (
                formData.phone &&
                normalizeValue(formData.phone) !==
                    normalizeValue(currentUser?.phone || null)
            ) {
                updateData.phone = formData.phone
            }
            if (formData.password) {
                updateData.password = formData.password
            }

            // Eğer hiçbir alan değişmediyse
            if (Object.keys(updateData).length === 0) {
                toast.info('Hiçbir değişiklik yapılmadı')
                setLoading(false)
                return
            }

            await updateProfile(updateData)

            toast.success('Profil başarıyla güncellendi!')

            setTimeout(() => {
                router.push('/profile')
            }, 1500)
        } catch (err: any) {
            toast.error(err.message || 'Profil güncellenirken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
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
                                        disabled={loading}
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
                                        disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
                                />
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Şifre Değiştir (Opsiyonel)
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Yeni Şifre
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="En az 6 karakter"
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    password: e.target.value,
                                                })
                                            }
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">
                                            Şifre Tekrarı
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Şifrenizi tekrar girin"
                                            value={formData.confirmPassword}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
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
                                    ) : (
                                        'Kaydet'
                                    )}
                                </Button>
                                <Link href="/profile" className="flex-1">
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
