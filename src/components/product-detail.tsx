'use client'

import { IProduct } from '@/types/IProduct'
import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import {
    ChevronLeft,
    RotateCcw,
    Shield,
    ShoppingCart,
    Star,
    Send,
} from 'lucide-react'
import Button from '@/components/button'
import { getProductDetailAPI } from '@/api/product/product.api'
import formatPrice from '@/utils/format-price'
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
import { frameTypeLabels, genderLabels } from '@/types/IFrameTypeLabel'
import { UserContext } from '@/contexts/user-context'
import { IReview, ICanReviewResponse } from '@/types/IReview'
import {
    getProductReviewsAPI,
    canReviewProductAPI,
    createReviewAPI,
} from '@/api/reviews/reviews.api'

export default function ProductDetail({ id }: { id: number }) {
    const userContext = useContext(UserContext)
    const [product, setProduct] = useState<IProduct | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
    const [quantity, setQuantity] = useState(1)

    // Review states
    const [reviews, setReviews] = useState<IReview[]>([])
    const [averageRating, setAverageRating] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [canReviewInfo, setCanReviewInfo] = useState<ICanReviewResponse | null>(null)
    const [reviewRating, setReviewRating] = useState(5)
    const [reviewComment, setReviewComment] = useState('')
    const [isSubmittingReview, setIsSubmittingReview] = useState(false)
    const [reviewError, setReviewError] = useState<string | null>(null)
    const [hoverRating, setHoverRating] = useState(0)

    // Fetch product and reviews
    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            getProductDetailAPI(id),
            getProductReviewsAPI(id),
        ]).then(([productData, reviewsData]) => {
            if (productData) {
                setProduct(productData)
            }
            setReviews(reviewsData.reviews)
            setAverageRating(reviewsData.averageRating)
            setTotalReviews(reviewsData.totalReviews)
            setIsLoading(false)
        }).catch(() => {
            setIsLoading(false)
        })
    }, [id])

    // Check if user can review (only when logged in)
    useEffect(() => {
        if (userContext?.currentUser) {
            canReviewProductAPI(id)
                .then((data) => setCanReviewInfo(data))
                .catch(() => setCanReviewInfo(null))
        } else {
            setCanReviewInfo(null)
        }
    }, [id, userContext?.currentUser])

    const handleSubmitReview = async () => {
        if (!userContext?.currentUser) return

        setIsSubmittingReview(true)
        setReviewError(null)

        try {
            const newReview = await createReviewAPI({
                productId: id,
                rating: reviewRating,
                comment: reviewComment || undefined,
            })

            // Add new review to list with user info
            const reviewWithUser: IReview = {
                ...newReview,
                user: {
                    id: userContext.currentUser.id,
                    name: userContext.currentUser.name || '',
                    surname: userContext.currentUser.surname || '',
                },
            }
            setReviews((prev) => [reviewWithUser, ...prev])

            // Update stats
            const newTotal = totalReviews + 1
            const newAverage = ((averageRating * totalReviews) + reviewRating) / newTotal
            setTotalReviews(newTotal)
            setAverageRating(newAverage)

            // Reset form and update canReview
            setReviewRating(5)
            setReviewComment('')
            setCanReviewInfo((prev) => prev ? { ...prev, canReview: false, hasReviewed: true } : null)
        } catch (error) {
            setReviewError(error instanceof Error ? error.message : 'Yorum gönderilirken bir hata oluştu')
        } finally {
            setIsSubmittingReview(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

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
                                                className={`h-5 w-5 ${
                                                    i < Math.round(averageRating)
                                                        ? 'fill-emerald-500 text-emerald-500'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-medium text-gray-700">
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-gray-600">
                                        ({totalReviews} yorum)
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
                        Müşteri Yorumları
                    </h2>

                    {/* Yorum Yazma Formu */}
                    {userContext?.currentUser ? (
                        canReviewInfo?.canReview ? (
                            <div className="mb-8 rounded-lg border border-gray-200 p-6">
                                <h3 className="mb-4 text-lg font-semibold">
                                    Yorum Yazın
                                </h3>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Puanınız
                                    </label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setReviewRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`h-8 w-8 ${
                                                        star <= (hoverRating || reviewRating)
                                                            ? 'fill-emerald-500 text-emerald-500'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Yorumunuz (isteğe bağlı)
                                    </label>
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Ürün hakkındaki düşüncelerinizi paylaşın..."
                                        className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        rows={4}
                                        maxLength={1000}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        {reviewComment.length}/1000 karakter
                                    </p>
                                </div>
                                {reviewError && (
                                    <p className="mb-4 text-sm text-red-600">
                                        {reviewError}
                                    </p>
                                )}
                                <Button
                                    onClick={handleSubmitReview}
                                    disabled={isSubmittingReview}
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {isSubmittingReview ? 'Gönderiliyor...' : 'Yorum Gönder'}
                                </Button>
                            </div>
                        ) : canReviewInfo?.hasReviewed ? (
                            <div className="mb-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                                <p className="text-emerald-700">
                                    Bu ürüne zaten yorum yapmışsınız.
                                </p>
                            </div>
                        ) : canReviewInfo && !canReviewInfo.hasPurchased ? (
                            <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                                <p className="text-yellow-700">
                                    Yorum yapabilmek için bu ürünü satın almış ve teslim almış olmanız gerekmektedir.
                                </p>
                            </div>
                        ) : null
                    ) : (
                        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <p className="text-gray-700">
                                Yorum yapabilmek için{' '}
                                <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
                                    giriş yapın
                                </Link>
                                .
                            </p>
                        </div>
                    )}

                    {/* Yorumlar Listesi */}
                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Henüz yorum yapılmamış. İlk yorumu siz yapın!
                            </p>
                        ) : (
                            reviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className={`pb-6 ${
                                        index < reviews.length - 1
                                            ? 'border-b border-gray-200'
                                            : ''
                                    }`}
                                >
                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < review.rating
                                                            ? 'fill-emerald-500 text-emerald-500'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="font-medium">
                                            {review.user.name} {review.user.surname.charAt(0)}.
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    {review.comment && (
                                        <p className="text-gray-700">{review.comment}</p>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
