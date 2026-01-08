import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/app/contact/contat-form'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-5xl font-bold">
                        Bizimle İletişime Geçin
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-emerald-100">
                        Sorularınız mı var? Yardım etmek için buradayız. En kısa
                        sürede dönüş yaparız.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-black">
                                İletişim Bilgileri
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-emerald-100 p-3">
                                        <Mail className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-lg font-bold">
                                            E-posta
                                        </h3>
                                        <p className="text-gray-600">
                                            support@miraoptik.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-emerald-100 p-3">
                                        <Phone className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-lg font-bold">
                                            Telefon
                                        </h3>
                                        <p className="text-gray-600">
                                            +90 530 064 17 00
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-emerald-100 p-3">
                                        <MapPin className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-lg font-bold">
                                            Adres
                                        </h3>
                                        <p className="text-gray-600">
                                            Kocatepe Caddesi No: 1/C, 34045
                                        </p>
                                        <p className="text-gray-600">
                                            Bayrampaşa / İstanbul
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-emerald-100 p-3">
                                        <Clock className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-lg font-bold">
                                            Çalışma Saatleri
                                        </h3>
                                        <p className="text-gray-600">
                                            Hafta içi: 09:30 – 20:30
                                        </p>
                                        <p className="text-gray-600">
                                            Cumartesi: 09:30 – 20:30
                                        </p>
                                        <p className="text-gray-600">
                                            Pazar: Kapalı
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 shadow-lg">
                            <div className="google-map-code rounded-lg bg-emerald-50 p-6">
                                <iframe
                                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Mira Optik, Kocatepe, Kocatepe Cd. no:1/C, 34045 Bayrampaşa/İstanbul&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                    width="600"
                                    height="450"
                                    style={{ border: '1px' }}
                                    aria-hidden="false"
                                />
                            </div>

                            <h2 className="mb-6 text-3xl font-bold text-black">
                                Bize Mesaj Gönderin
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
