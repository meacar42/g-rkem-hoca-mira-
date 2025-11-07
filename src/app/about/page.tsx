'use client'
import { Eye, Heart, Award, Users } from 'lucide-react'
import { UserContext } from '@/contexts/user-context'
import { useUser } from '@/hooks/use-user'

export default function About() {
    const { currentUser } = useUser()

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-5xl font-bold">
                        About Mira Optik
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-emerald-100">
                        Your trusted partner in vision care since 2010. We
                        believe everyone deserves to see clearly and look great
                        doing it.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-4xl font-bold text-black">
                                Our Story
                            </h2>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                Mira Optik was founded with a simple mission: to
                                provide high-quality eyewear that combines
                                style, comfort, and affordability. What started
                                as a small local shop has grown into a trusted
                                online destination for thousands of customers.
                            </p>
                            <p className="mb-4 leading-relaxed text-gray-700">
                                We carefully curate our collection to include
                                frames that suit every face shape, personal
                                style, and budget. From classic designs to
                                trendy statement pieces, we have something for
                                everyone.
                            </p>
                            <p className="leading-relaxed text-gray-700">
                                Our commitment to quality means we only work
                                with reputable manufacturers and use premium
                                materials. Every pair of glasses is inspected to
                                ensure it meets our high standards before
                                reaching you.
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-xl">
                            <img
                                src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Eyewear collection"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center text-4xl font-bold text-black">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Eye className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Quality Vision
                            </h3>
                            <p className="text-gray-600">
                                We ensure every lens provides crystal-clear
                                vision with the latest optical technology.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Heart className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Customer Care
                            </h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We're here to
                                help you find the perfect pair.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Award className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Premium Quality
                            </h3>
                            <p className="text-gray-600">
                                Only the finest materials and craftsmanship go
                                into every frame we sell.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                                <Users className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">
                                Community
                            </h3>
                            <p className="text-gray-600">
                                We're committed to giving back and supporting
                                eye health initiatives worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center text-4xl font-bold">
                        Why Choose Mira Optik?
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-lg bg-gray-900 p-6">
                            <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                                10,000+
                            </h3>
                            <p className="text-gray-300">
                                Happy customers worldwide
                            </p>
                        </div>
                        <div className="rounded-lg bg-gray-900 p-6">
                            <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                                500+
                            </h3>
                            <p className="text-gray-300">Unique frame styles</p>
                        </div>
                        <div className="rounded-lg bg-gray-900 p-6">
                            <h3 className="mb-3 text-2xl font-bold text-emerald-500">
                                15+ Years
                            </h3>
                            <p className="text-gray-300">
                                In the eyewear industry
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-4xl font-bold text-black">
                        Our Commitment
                    </h2>
                    <p className="mb-8 text-lg leading-relaxed text-gray-700">
                        At Mira Optik, we're not just selling glasses we're
                        helping you see the world in a whole new way. Whether
                        you need prescription eyeglasses for daily wear,
                        protective blue light glasses for screen time, or
                        stylish sunglasses for sunny days, we have you covered.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Thank you for choosing Mira Optik. We look forward to
                        being part of your vision journey.
                    </p>
                </div>
            </section>
        </div>
    )
}
