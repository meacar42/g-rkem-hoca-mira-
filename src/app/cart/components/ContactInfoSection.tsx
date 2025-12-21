'use client'

import { memo } from 'react'
import { User, Mail, Phone } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export interface ContactInfo {
    name: string
    surname: string
    email: string
    phone: string
}

interface ContactInfoSectionProps {
    contactInfo: ContactInfo
    onChange: (info: ContactInfo) => void
    isPhoneValid: (phone: string) => boolean
    isEmailValid: (email: string) => boolean
}

function ContactInfoSection({
    contactInfo,
    onChange,
    isPhoneValid,
    isEmailValid,
}: ContactInfoSectionProps) {
    const handleChange = (field: keyof ContactInfo, value: string) => {
        onChange({ ...contactInfo, [field]: value })
    }

    return (
        <Card className="py-4">
            <div className="px-6">
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-500" />
                    <h2 className="text-xl font-semibold text-foreground">
                        İletişim Bilgileri
                    </h2>
                </div>
            </div>

            <div className="space-y-4 px-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="contact-name">Ad *</Label>
                        <Input
                            id="contact-name"
                            placeholder="Adınız"
                            value={contactInfo.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                        />
                        {contactInfo.name.length > 0 &&
                            contactInfo.name.trim().length < 2 && (
                                <p className="text-xs text-orange-600">
                                    En az 2 karakter girmelisiniz
                                </p>
                            )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-surname">Soyad *</Label>
                        <Input
                            id="contact-surname"
                            placeholder="Soyadınız"
                            value={contactInfo.surname}
                            onChange={(e) =>
                                handleChange('surname', e.target.value)
                            }
                        />
                        {contactInfo.surname.length > 0 &&
                            contactInfo.surname.trim().length < 2 && (
                                <p className="text-xs text-orange-600">
                                    En az 2 karakter girmelisiniz
                                </p>
                            )}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="contact-email">E-posta *</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="contact-email"
                                type="email"
                                placeholder="ornek@email.com"
                                value={contactInfo.email}
                                onChange={(e) =>
                                    handleChange('email', e.target.value)
                                }
                                className="pl-10"
                            />
                        </div>
                        {contactInfo.email.length > 0 &&
                            !isEmailValid(contactInfo.email) && (
                                <p className="text-xs text-orange-600">
                                    Geçerli bir e-posta adresi girin
                                </p>
                            )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact-phone">Telefon *</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="contact-phone"
                                type="tel"
                                placeholder="05XX XXX XX XX"
                                value={contactInfo.phone}
                                onChange={(e) =>
                                    handleChange('phone', e.target.value)
                                }
                                className="pl-10"
                            />
                        </div>
                        {contactInfo.phone.length > 0 &&
                            !isPhoneValid(contactInfo.phone) && (
                                <p className="text-xs text-orange-600">
                                    Geçerli bir telefon numarası girin
                                </p>
                            )}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default memo(ContactInfoSection)
