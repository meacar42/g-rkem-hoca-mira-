'use client'

import { IProduct } from '@/types/IProduct'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    ChevronLeft,
    RotateCcw,
    Shield,
    ShoppingCart,
    Star,
} from 'lucide-react'
import Button from '@/components/button'
import { getProductDetailAPI } from '@/api/product/product.api'
import formatPrice from '@/utils/format-price'
import { frameTypeLabels, genderLabels } from '@/app/catalog/page'
import { Spinner } from '@/components/ui/spinner'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import { useCart } from '@/contexts/cart-context'

export default function ProductDetail({ id }: { id: number }) {
    const [product, setProduct] = useState<IProduct | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        getProductDetailAPI(id).then((data) => {
            if (data) {
                setProduct(data)
                setIsLoading(false)
            }
        })
    }, [id])

    if (isLoading || !product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500"></div>
            </div>
        )
    }

    const { addToCart } = useCart()

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link
                    href={'/catalog'}
                    className="mb-8 inline-flex items-center text-emerald-500 hover:text-emerald-600"
                >
                    <ChevronLeft className="h-5 w-5" />
                    <span>Önceki Sayfa</span>
                </Link>

                <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
                        <div>
                            {/* Ana Resim Swiper */}
                            <Swiper
                                modules={[Navigation, Pagination, Thumbs]}
                                navigation
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper }}
                                className="mb-4 rounded-lg"
                                spaceBetween={10}
                            >
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                            <AspectRatio
                                                ratio={1}
                                                className="rounded-lg bg-muted"
                                            >
                                                <Image
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_STORAGE_URL +
                                                        image
                                                    }
                                                    alt={`${product.name} - ${index + 1}`}
                                                    fill
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            </AspectRatio>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Thumbnail Swiper - Sadece birden fazla resim varsa göster */}
                            {product.images.length > 1 && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    modules={[Thumbs, FreeMode]}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    className="rounded-lg"
                                >
                                    {product.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-transparent transition-all hover:border-emerald-500">
                                                <AspectRatio
                                                    ratio={1}
                                                    className="rounded-lg bg-muted"
                                                >
                                                    <Image
                                                        src={
                                                            process.env
                                                                .NEXT_PUBLIC_STORAGE_URL +
                                                            image
                                                        }
                                                        alt={`${product.name} thumbnail ${index + 1}`}
                                                        fill
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />
                                                </AspectRatio>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>

                        <div>
                            <div className="mb-4">
                                <h1 className="mb-4 mt-2 text-4xl font-bold text-black">
                                    {product.name}
                                </h1>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="h-5 w-5 fill-emerald-500 text-emerald-500"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">
                                        (127 reviews)
                                    </span>
                                </div>
                                <p className="text-4xl font-bold text-emerald-500">
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            {product.description && (
                                <div className="mb-4 border-b border-t border-gray-200 py-6">
                                    <p className="leading-relaxed text-gray-700">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="mb-3 text-lg font-bold">
                                    Ürün Özellikleri
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {product.frameType && (
                                        <div>
                                            <span className="text-gray-600">
                                                Çerçeve Tipi
                                            </span>
                                            <p className="font-medium text-gray-900">
                                                {
                                                    frameTypeLabels[
                                                        product.frameType
                                                    ]
                                                }
                                            </p>
                                        </div>
                                    )}

                                    {product.material && (
                                        <div>
                                            <span className="text-gray-600">
                                                Materyal
                                            </span>
                                            <p className="font-medium text-gray-900">
                                                {product.material}
                                            </p>
                                        </div>
                                    )}

                                    {product.color && (
                                        <div>
                                            <span className="text-gray-600">
                                                Renk
                                            </span>
                                            <p className="font-medium text-gray-900">
                                                {product.color}
                                            </p>
                                        </div>
                                    )}

                                    {product.lensWidth && (
                                        <div>
                                            <span className="text-gray-600">
                                                Lens Genişliği
                                            </span>
                                            <p className="font-medium text-gray-900">
                                                {product.lensWidth} mm
                                            </p>
                                        </div>
                                    )}

                                    {product.bridgeWidth && (
                                        <div>
                                            <span className="text-gray-600">
                                                Burun Köprüsü Genişliği
                                            </span>
                                            <p className="font-medium text-gray-900">
                                                {product.bridgeWidth} mm
                                            </p>
                                        </div>
                                    )}

                                    {product.templeLength && (
                                        <div>
                                            <span className="text-gray-600">
                                                Sap Uzunluğu
                                            </span>
                                            <p className="font-medium text-gray-900">
                                                {product.templeLength} mm
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-gray-600">
                                            Gender:
                                        </span>
                                        <p className="font-medium capitalize text-gray-900">
                                            {genderLabels[product.gender]}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block font-medium text-gray-700">
                                    Adet
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1),
                                            )
                                        }
                                        className="h-10 w-10 rounded-lg border border-gray-300 font-bold hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-xl font-medium">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        className="h-10 w-10 rounded-lg border border-gray-300 font-bold hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={() => {
                                    if (product.stockQuantity > 0) {
                                        addToCart(product.id, quantity)
                                    }
                                }}
                                disabled={product.stockQuantity === 0}
                                className="mb-4 w-full"
                                size="lg"
                            >
                                <ShoppingCart className="mr-2 inline h-5 w-5" />
                                {product.stockQuantity >= 0
                                    ? 'Sepete Ekle'
                                    : 'Stokta Yok'}
                            </Button>

                            <div className="mt-2 space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <RotateCcw className="h-5 w-5 text-emerald-500" />
                                    <span>
                                        30 gün içerisinde geri iade garantisi
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Shield className="h-5 w-5 text-emerald-500" />
                                    <span>2 yıl garanti</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg bg-white p-8 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold">
                        Customer Reviews
                    </h2>
                    <div className="space-y-6">
                        <div className="border-b border-gray-200 pb-6">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-emerald-500 text-emerald-500"
                                        />
                                    ))}
                                </div>
                                <span className="font-medium">Sarah M.</span>
                                <span className="text-sm text-gray-500">
                                    Verified Purchase
                                </span>
                            </div>
                            <p className="text-gray-700">
                                Absolutely love these glasses! Perfect fit and
                                great quality. The lenses are crystal clear.
                            </p>
                        </div>
                        <div className="border-b border-gray-200 pb-6">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-emerald-500 text-emerald-500"
                                        />
                                    ))}
                                </div>
                                <span className="font-medium">James T.</span>
                                <span className="text-sm text-gray-500">
                                    Verified Purchase
                                </span>
                            </div>
                            <p className="text-gray-700">
                                Great value for money. Comfortable to wear all
                                day long.
                            </p>
                        </div>
                        <div className="pb-6">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(4)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-emerald-500 text-emerald-500"
                                        />
                                    ))}
                                    <Star className="h-4 w-4 text-gray-300" />
                                </div>
                                <span className="font-medium">Emily R.</span>
                                <span className="text-sm text-gray-500">
                                    Verified Purchase
                                </span>
                            </div>
                            <p className="text-gray-700">
                                Nice design and good quality. Took a few days to
                                get used to the fit but overall very happy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
