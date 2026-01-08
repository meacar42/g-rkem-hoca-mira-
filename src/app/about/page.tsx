import { Eye, Heart, Award, Users } from 'lucide-react'

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-5xl font-bold">Hakkımızda</h1>
                    <p className="mx-auto max-w-3xl text-xl text-emerald-100">
                        2015 yılından bu yana göz sağlığında güvenilir
                        partneriniz. Herkesin net görmesi ve bunu yaparken
                        harika görünmesi gerektiğine inanıyoruz.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-4xl font-bold text-black">
                                Hikayemiz
                            </h2>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Mira Optik, basit bir misyonla kuruldu: stil,
                                konfor ve uygun fiyatı bir arada sunan yüksek
                                kaliteli gözlükler sağlamak. Küçük bir yerel
                                mağaza olarak başlayan serüvenimiz, binlerce
                                müşterinin güvendiği bir online destinasyona
                                dönüştü.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Koleksiyonumuzu her yüz şekline, kişisel tarza
                                ve bütçeye uygun çerçeveler içerecek şekilde
                                özenle seçiyoruz. Klasik tasarımlardan trend
                                parçalara kadar herkes için bir şeyler var.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Kaliteye olan bağlılığımız, yalnızca saygın
                                üreticilerle çalışmamız ve premium malzemeler
                                kullanmamız anlamına gelir. Her gözlük, size
                                ulaşmadan önce yüksek standartlarımızı
                                karşıladığından emin olmak için kontrol edilir.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-xl">
                            <img
                                src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Gözlük koleksiyonu"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center text-4xl font-bold text-black">
                        Değerlerimiz
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Eye className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Kaliteli Görüş
                            </h3>
                            <p className="text-gray-600">
                                Her lensin en son optik teknoloji ile kristal
                                netliğinde görüş sağlamasını garantiliyoruz.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Heart className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Müşteri İlgisi
                            </h3>
                            <p className="text-gray-600">
                                Memnuniyetiniz önceliğimizdir. Mükemmel çifti
                                bulmanıza yardımcı olmak için buradayız.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Award className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Premium Kalite
                            </h3>
                            <p className="text-gray-600">
                                Sattığımız her çerçevede yalnızca en kaliteli
                                malzemeler ve işçilik kullanılır.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Users className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">Topluluk</h3>
                            <p className="text-gray-600">
                                Türkiye genelinde göz sağlığı girişimlerini
                                desteklemeye ve geri vermeye kararlıyız.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center text-4xl font-bold">
                        Neden Mira Optik?
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-lg bg-gray-900 p-6">
                            <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                                10.000+
                            </h3>
                            <p className="text-gray-300">Mutlu müşteri</p>
                        </div>
                        <div className="rounded-lg bg-gray-900 p-6">
                            <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                                200+
                            </h3>
                            <p className="text-gray-300">
                                Farklı marka ve model
                            </p>
                        </div>
                        <div className="rounded-lg bg-gray-900 p-6">
                            <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                                10+ Yıl
                            </h3>
                            <p className="text-gray-300">Sektör deneyimi</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-4xl font-bold text-black">
                        Taahhüdümüz
                    </h2>
                    <p className="mb-8 text-lg leading-relaxed text-gray-700">
                        Mira Optik olarak sadece gözlük satmıyoruz, dünyayı
                        tamamen yeni bir şekilde görmenize yardımcı oluyoruz.
                        Günlük kullanım için numaralı gözlük, ekran süresi için
                        koruyucu mavi ışık gözlükleri veya güneşli günler için
                        şık güneş gözlükleri arıyor olun, yanınızdayız.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Mira Optik'i tercih ettiğiniz için teşekkür ederiz.
                        Görüş yolculuğunuzun bir parçası olmayı dört gözle
                        bekliyoruz.
                    </p>
                </div>
            </section>
        </div>
    )
}
