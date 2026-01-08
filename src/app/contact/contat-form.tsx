'use client'
import { FormEvent, useState } from 'react'
import Button from '@/components/button'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const mailTo = `mailto:support@miraoptik.com?subject=${encodeURIComponent(
            formData.subject,
        )}&body=${encodeURIComponent(
            `Ad Soyad: ${formData.name}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`,
        )}`

        window.location.href = mailTo
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Ad Soyad *
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Adınız ve soyadınız"
                />
            </div>

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                    E-posta *
                </label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="ornek@mail.com"
                />
            </div>

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Konu *
                </label>
                <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Mesaj konusu"
                />
            </div>

            <div>
                <label className="mb-2 block font-medium text-gray-700">
                    Mesaj *
                </label>
                <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Size nasıl yardımcı olabiliriz?"
                />
            </div>

            <Button type="submit" size="lg" className="w-full">
                Mesaj Gönder
            </Button>
        </form>
    )
}
