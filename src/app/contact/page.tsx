'use client'
import { FormEvent, useState } from 'react'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Button from '@/components/button'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                        Have questions? We're here to help. Contact us and we'll
                        respond as soon as possible.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-6">
                                Contact Information
                            </h2>
                            <p className="text-gray-700 mb-8">
                                Feel free to reach out through any of these
                                channels. Our customer service team is ready to
                                assist you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">
                                            Email
                                        </h3>
                                        <p className="text-gray-600">
                                            info@miraoptik.com
                                        </p>
                                        <p className="text-gray-600">
                                            support@miraoptik.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">
                                            Phone
                                        </h3>
                                        <p className="text-gray-600">
                                            +1 (555) 123-4567
                                        </p>
                                        <p className="text-gray-600">
                                            Toll Free: 1-800-MIRA-OPT
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">
                                            Address
                                        </h3>
                                        <p className="text-gray-600">
                                            123 Vision Street
                                        </p>
                                        <p className="text-gray-600">
                                            New York, NY 10001
                                        </p>
                                        <p className="text-gray-600">
                                            United States
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-100 p-3 rounded-lg">
                                        <Clock className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">
                                            Business Hours
                                        </h3>
                                        <p className="text-gray-600">
                                            Monday - Friday: 9:00 AM - 6:00 PM
                                        </p>
                                        <p className="text-gray-600">
                                            Saturday: 10:00 AM - 4:00 PM
                                        </p>
                                        <p className="text-gray-600">
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-emerald-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg mb-2 text-emerald-900">
                                    Quick Response
                                </h3>
                                <p className="text-emerald-800">
                                    We typically respond to all inquiries within
                                    24 hours during business days.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-black mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subject: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        placeholder="What is this regarding?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-2">
                                What is your return policy?
                            </h3>
                            <p className="text-gray-600">
                                We offer a 30-day return policy for all
                                products. Items must be in original condition
                                with all packaging.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-2">
                                Do you offer prescription lenses?
                            </h3>
                            <p className="text-gray-600">
                                Yes! All our eyeglasses can be fitted with
                                prescription lenses. Contact us for details.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-2">
                                How long does shipping take?
                            </h3>
                            <p className="text-gray-600">
                                Standard shipping takes 5-7 business days.
                                Express shipping options are available at
                                checkout.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="font-bold text-lg mb-2">
                                Do you have a warranty?
                            </h3>
                            <p className="text-gray-600">
                                All our products come with a 2-year warranty
                                against manufacturing defects.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
