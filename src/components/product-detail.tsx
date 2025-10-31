"use client";

import {IProduct} from "@/types/IProduct";
import {useEffect, useState} from "react";
import Link from "next/link";
import {ChevronLeft, RotateCcw, Shield, ShoppingCart, Star, Truck} from "lucide-react";
import Button from "@/components/button";
import {getProductDetailAPI} from "@/api/product/product.api";

export default function ProductDetail({ id }: { id: number}) {
    const [product, setProduct] = useState<IProduct>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
         setIsLoading(true);
         getProductDetailAPI(id).then((data) => {
                setProduct(data);
                setIsLoading(false);
         })
    }, [id]);

    if (isLoading || !product) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    console.log(product);



    // const handleAddToCart = () => {
    //     for (let i = 0; i < quantity; i++) {
    //         onAddToCart(product);
    //     }
    // };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href={''} className="inline-flex items-center text-emerald-500 hover:text-emerald-600 mb-8">
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        <div>
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/*{product.images.length > 1 && (*/}
                            {/*    <div className="grid grid-cols-4 gap-4">*/}
                            {/*        {product.images.map((image, index) => (*/}
                            {/*            <button*/}
                            {/*                key={index}*/}
                            {/*                onClick={() => {}}*/}
                            {/*                className={`aspect-square rounded-lg overflow-hidden border-2 ${*/}
                            {/*                    selectedImage === index ? 'border-emerald-500' : 'border-gray-200'*/}
                            {/*                }`}*/}
                            {/*            >*/}
                            {/*                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />*/}
                            {/*            </button>*/}
                            {/*        ))}*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>

                        <div>
                            <div className="mb-4">
                                <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
                                <h1 className="text-4xl font-bold text-black mt-2 mb-4">{product.name}</h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">(127 reviews)</span>
                                </div>
                                <p className="text-4xl font-bold text-emerald-500">${product.price}</p>
                            </div>

                            <div className="border-t border-b border-gray-200 py-6 mb-6">
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-3">Specifications</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Material:</span>
                                        <p className="font-medium text-gray-900">{product.material}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Frame Shape:</span>
                                        <p className="font-medium text-gray-900">{product.frameShape}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Dimensions:</span>
                                        <p className="font-medium text-gray-900">{product.dimensions}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Weight:</span>
                                        <p className="font-medium text-gray-900">{product.weight}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Color:</span>
                                        <p className="font-medium text-gray-900">{product.color}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Gender:</span>
                                        <p className="font-medium text-gray-900 capitalize">{product.gender}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={() => {}}
                                disabled={!product.inStock}
                                className="w-full mb-4"
                                size="lg"
                            >
                                <ShoppingCart className="w-5 h-5 inline mr-2" />
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>

                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Truck className="w-5 h-5 text-emerald-500" />
                                    <span>Free shipping on orders over $100</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <RotateCcw className="w-5 h-5 text-emerald-500" />
                                    <span>30-day return policy</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Shield className="w-5 h-5 text-emerald-500" />
                                    <span>2-year warranty included</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                    ))}
                                </div>
                                <span className="font-medium">Sarah M.</span>
                                <span className="text-gray-500 text-sm">Verified Purchase</span>
                            </div>
                            <p className="text-gray-700">Absolutely love these glasses! Perfect fit and great quality. The lenses are crystal clear.</p>
                        </div>
                        <div className="border-b border-gray-200 pb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                    ))}
                                </div>
                                <span className="font-medium">James T.</span>
                                <span className="text-gray-500 text-sm">Verified Purchase</span>
                            </div>
                            <p className="text-gray-700">Great value for money. Comfortable to wear all day long.</p>
                        </div>
                        <div className="pb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    {[...Array(4)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                    ))}
                                    <Star className="w-4 h-4 text-gray-300" />
                                </div>
                                <span className="font-medium">Emily R.</span>
                                <span className="text-gray-500 text-sm">Verified Purchase</span>
                            </div>
                            <p className="text-gray-700">Nice design and good quality. Took a few days to get used to the fit but overall very happy.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
