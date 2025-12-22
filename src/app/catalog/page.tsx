'use client'
import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/product-card'
import { IProduct, FrameType, Gender } from '@/types/IProduct'
import { getProductsAPI } from '@/api/product/product.api'
import { useCart } from '@/contexts/cart-context'

interface FilterOptions {
    frameType: FrameType | ''
    gender: Gender | ''
}

const frameTypeLabels: Record<FrameType, string> = {
    [FrameType.FULL_RIM]: 'Tam Çerçeve',
    [FrameType.SEMI_RIMLESS]: 'Yarım Çerçeve',
    [FrameType.RIMLESS]: 'Çerçevesiz',
    [FrameType.CATE_EYE]: 'Kedi Gözü',
    [FrameType.ROUND]: 'Yuvarlak',
    [FrameType.AVIATOR]: 'Pilot',
    [FrameType.SQUARE]: 'Kare',
    [FrameType.RECTANGLE]: 'Dikdörtgen',
    [FrameType.WAYFARER]: 'Wayfarer',
    [FrameType.OVERSIZED]: 'Büyük Boy',
}

const genderLabels: Record<Gender, string> = {
    [Gender.MALE]: 'Erkek',
    [Gender.FEMALE]: 'Kadın',
    [Gender.UNISEX]: 'Unisex',
}

export default function CatalogPage() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState<FilterOptions>({
        frameType: '',
        gender: '',
    })
    const [sortBy, setSortBy] = useState<'price-low' | 'price-high'>(
        'price-low',
    )
    const [showFilters, setShowFilters] = useState(false)

    const { addToCart } = useCart()

    const filteredProducts = products.filter((product) => {
        if (filters.frameType && product.frameType !== filters.frameType)
            return false
        if (filters.gender && product.gender !== filters.gender) return false
        return true
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') {
            return a.price - b.price
        } else {
            return b.price - a.price
        }
    })

    const frameTypes = Object.values(FrameType)
    const genders = Object.values(Gender)

    const clearFilters = () => {
        setFilters({
            frameType: '',
            gender: '',
        })
    }

    const activeFiltersCount = Object.values(filters).filter((v) => v).length

    useEffect(() => {
        getProductsAPI().then((data) => {
            setProducts(data)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-bold text-black">
                        Gözlükler
                    </h1>
                    <p className="text-gray-600">
                        Toplam {sortedProducts.length} Ürün Bulundu
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 lg:hidden"
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                        <span>Filtreler</span>
                        {activeFiltersCount > 0 && (
                            <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs font-bold text-white">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    <aside
                        className={`${showFilters ? 'block' : 'hidden'} w-full flex-shrink-0 lg:block lg:w-64`}
                    >
                        <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-lg font-bold">Filtreler</h2>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 text-sm text-emerald-500 hover:text-emerald-600"
                                    >
                                        <X className="h-4 w-4" />
                                        Temizle
                                    </button>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-3 font-semibold text-gray-900">
                                    Çerçeve Tipi
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="frameType"
                                            checked={filters.frameType === ''}
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    frameType: '',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            Tümü
                                        </span>
                                    </label>
                                    {frameTypes.map((type) => (
                                        <label
                                            key={type}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                name="frameType"
                                                checked={
                                                    filters.frameType === type
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        ...filters,
                                                        frameType: type,
                                                    })
                                                }
                                                className="mr-2 accent-emerald-500"
                                            />
                                            <span className="text-gray-700">
                                                {frameTypeLabels[type]}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-3 font-semibold text-gray-900">
                                    Cinsiyet
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={filters.gender === ''}
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    gender: '',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            Tümü
                                        </span>
                                    </label>
                                    {genders.map((gender) => (
                                        <label
                                            key={gender}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                name="gender"
                                                checked={
                                                    filters.gender === gender
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        ...filters,
                                                        gender,
                                                    })
                                                }
                                                className="mr-2 accent-emerald-500"
                                            />
                                            <span className="capitalize text-gray-700">
                                                {genderLabels[gender]}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                            <span className="font-medium text-gray-700">
                                Sırala
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value as
                                            | 'price-low'
                                            | 'price-high',
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="price-low">Fiyat (Düşük)</option>
                                <option value="price-high">
                                    Fiyat (Yüksek)
                                </option>
                            </select>
                        </div>

                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={() =>
                                            addToCart(product.id, 1, {
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                discount: product.discount,
                                                imageUrl: product.images?.[0],
                                                stockQuantity:
                                                    product.stockQuantity,
                                            })
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                                <p className="text-lg text-gray-500">
                                    No products found matching your filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 font-medium text-emerald-500 hover:text-emerald-600"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { frameTypeLabels, genderLabels }
