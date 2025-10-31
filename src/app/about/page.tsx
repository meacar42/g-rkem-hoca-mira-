import { Eye, Heart, Award, Users } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">About Mira Optik</h1>
                    <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                        Your trusted partner in vision care since 2010. We believe everyone deserves to see clearly and look great doing it.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-black mb-6">Our Story</h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Mira Optik was founded with a simple mission: to provide high-quality eyewear that combines style, comfort, and affordability. What started as a small local shop has grown into a trusted online destination for thousands of customers.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                We carefully curate our collection to include frames that suit every face shape, personal style, and budget. From classic designs to trendy statement pieces, we have something for everyone.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Our commitment to quality means we only work with reputable manufacturers and use premium materials. Every pair of glasses is inspected to ensure it meets our high standards before reaching you.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Eyewear collection"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-black text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality Vision</h3>
                            <p className="text-gray-600">
                                We ensure every lens provides crystal-clear vision with the latest optical technology.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Customer Care</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our priority. We're here to help you find the perfect pair.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                            <p className="text-gray-600">
                                Only the finest materials and craftsmanship go into every frame we sell.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Community</h3>
                            <p className="text-gray-600">
                                We're committed to giving back and supporting eye health initiatives worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-black text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose Mira Optik?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-900 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-emerald-500 mb-3">10,000+</h3>
                            <p className="text-gray-300">Happy customers worldwide</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-emerald-500 mb-3">500+</h3>
                            <p className="text-gray-300">Unique frame styles</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold text-emerald-500 mb-3">15+ Years</h3>
                            <p className="text-gray-300">In the eyewear industry</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-black mb-6">Our Commitment</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                        At Mira Optik, we're not just selling glasses we're helping you see the world in a whole new way. Whether you need prescription eyeglasses for daily wear, protective blue light glasses for screen time, or stylish sunglasses for sunny days, we have you covered.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Thank you for choosing Mira Optik. We look forward to being part of your vision journey.
                    </p>
                </div>
            </section>
        </div>
    );
}
