'use client'
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product-card'
import { IProduct, FrameTypeLabel, Gender, ProductType } from '@/types/IProduct'
import { getProductsAPI, IProductsParams } from '@/api/product/product.api'
import { useCart } from '@/contexts/cart-context'
import {
    frameTypeLabels,
    genderLabels,
    productTypeLabels,
} from '@/types/IFrameTypeLabel'

interface FilterOptions {
    frameType: FrameTypeLabel | ''
    gender: Gender | ''
}

const ITEMS_PER_PAGE = 12

// URL'den gelen type değerinin geçerli olup olmadığını kontrol et
const isValidProductType = (value: string | null): value is ProductType => {
    return Object.values(ProductType).includes(value as ProductType)
}

export default function CatalogContent() {
    const searchParams = useSearchParams()
    const typeFromUrl = searchParams.get('type')

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState<FilterOptions>({
        frameType: '',
        gender: '',
    })
    const [productType, setProductType] = useState<ProductType | ''>(
        isValidProductType(typeFromUrl) ? typeFromUrl : '',
    )
    const [sortBy, setSortBy] = useState<'price-low' | 'price-high'>(
        'price-low',
    )
    const [showFilters, setShowFilters] = useState(false)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)

    const { addToCart } = useCart()

    const productTypes = Object.values(ProductType)

    const fetchProducts = useCallback(
        async (
            page: number,
            sort: 'price-low' | 'price-high',
            type: ProductType | '',
        ) => {
            setLoading(true)
            try {
                const params: IProductsParams = {
                    page,
                    limit: ITEMS_PER_PAGE,
                    sortBy: 'price',
                    sortOrder: sort === 'price-low' ? 'asc' : 'desc',
                }

                if (type) {
                    params.type = type
                }

                const response = await getProductsAPI(params)
                setProducts(response.data)
                setTotalPages(response.totalPages)
                setTotalProducts(response.total)
                setCurrentPage(response.page)
            } catch {
                // Hata sessizce yönetiliyor
            } finally {
                setLoading(false)
            }
        },
        [],
    )

    const filteredProducts = products.filter((product) => {
        if (filters.frameType && product.frameType !== filters.frameType)
            return false
        if (filters.gender && product.gender !== filters.gender) return false
        return true
    })

    const frameTypes = Object.values(FrameTypeLabel)
    const genders = Object.values(Gender)

    const clearFilters = () => {
        setFilters({
            frameType: '',
            gender: '',
        })
    }

    const activeFiltersCount = Object.values(filters).filter((v) => v).length

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            fetchProducts(page, sortBy, productType)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleSortChange = (newSort: 'price-low' | 'price-high') => {
        setSortBy(newSort)
        fetchProducts(1, newSort, productType)
    }

    const handleProductTypeChange = (newType: ProductType | '') => {
        setProductType(newType)
        fetchProducts(1, sortBy, newType)
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                pages.push(currentPage - 1)
                pages.push(currentPage)
                pages.push(currentPage + 1)
                pages.push('...')
                pages.push(totalPages)
            }
        }

        return pages
    }

    // URL'den type değiştiğinde state'i güncelle
    useEffect(() => {
        const newType = isValidProductType(typeFromUrl) ? typeFromUrl : ''
        setProductType(newType)
        fetchProducts(1, sortBy, newType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeFromUrl])

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
                        {productType
                            ? productTypeLabels[productType]
                            : 'Tüm Ürünler'}
                    </h1>
                    <p className="text-gray-600">
                        Toplam {totalProducts} Ürün Bulundu
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
                                {(activeFiltersCount > 0 || productType) && (
                                    <button
                                        onClick={() => {
                                            clearFilters()
                                            handleProductTypeChange('')
                                        }}
                                        className="flex items-center gap-1 text-sm text-emerald-500 hover:text-emerald-600"
                                    >
                                        <X className="h-4 w-4" />
                                        Temizle
                                    </button>
                                )}
                            </div>

                            {/* Ürün Tipi */}
                            <div className="mb-6">
                                <h3 className="mb-3 font-semibold text-gray-900">
                                    Ürün Tipi
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() =>
                                            handleProductTypeChange('')
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <span
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                productType === ''
                                                    ? 'border-emerald-500 bg-emerald-500'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {productType === '' && (
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </span>
                                        <span className="text-gray-700">
                                            Tümü
                                        </span>
                                    </button>
                                    {productTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() =>
                                                handleProductTypeChange(type)
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                                        >
                                            <span
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                    productType === type
                                                        ? 'border-emerald-500 bg-emerald-500'
                                                        : 'border-gray-300'
                                                }`}
                                            >
                                                {productType === type && (
                                                    <span className="h-2 w-2 rounded-full bg-white" />
                                                )}
                                            </span>
                                            <span className="text-gray-700">
                                                {productTypeLabels[type]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Çerçeve Tipi */}
                            <div className="mb-6">
                                <h3 className="mb-3 font-semibold text-gray-900">
                                    Çerçeve Tipi
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                frameType: '',
                                            })
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <span
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                filters.frameType === ''
                                                    ? 'border-emerald-500 bg-emerald-500'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {filters.frameType === '' && (
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </span>
                                        <span className="text-gray-700">
                                            Tümü
                                        </span>
                                    </button>
                                    {frameTypes.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() =>
                                                setFilters({
                                                    ...filters,
                                                    frameType: type,
                                                })
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                                        >
                                            <span
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                    filters.frameType === type
                                                        ? 'border-emerald-500 bg-emerald-500'
                                                        : 'border-gray-300'
                                                }`}
                                            >
                                                {filters.frameType === type && (
                                                    <span className="h-2 w-2 rounded-full bg-white" />
                                                )}
                                            </span>
                                            <span className="text-gray-700">
                                                {frameTypeLabels[type]}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cinsiyet */}
                            <div className="mb-6">
                                <h3 className="mb-3 font-semibold text-gray-900">
                                    Cinsiyet
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                gender: '',
                                            })
                                        }
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <span
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                filters.gender === ''
                                                    ? 'border-emerald-500 bg-emerald-500'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            {filters.gender === '' && (
                                                <span className="h-2 w-2 rounded-full bg-white" />
                                            )}
                                        </span>
                                        <span className="text-gray-700">
                                            Tümü
                                        </span>
                                    </button>
                                    {genders.map((gender) => (
                                        <button
                                            key={gender}
                                            onClick={() =>
                                                setFilters({
                                                    ...filters,
                                                    gender,
                                                })
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-50"
                                        >
                                            <span
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                    filters.gender === gender
                                                        ? 'border-emerald-500 bg-emerald-500'
                                                        : 'border-gray-300'
                                                }`}
                                            >
                                                {filters.gender === gender && (
                                                    <span className="h-2 w-2 rounded-full bg-white" />
                                                )}
                                            </span>
                                            <span className="text-gray-700">
                                                {genderLabels[gender]}
                                            </span>
                                        </button>
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
                                    handleSortChange(
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

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={() =>
                                            addToCart(product.id, 1)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                                <p className="text-lg text-gray-500">
                                    Filtrelere uygun ürün bulunamadı.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 font-medium text-emerald-500 hover:text-emerald-600"
                                >
                                    Filtreleri Temizle
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination - Sayfanın altında */}
                {totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            {getPageNumbers().map((page, index) =>
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(page)}
                                        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                                            currentPage === page
                                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                                : 'border-gray-300 bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span
                                        key={index}
                                        className="flex h-10 w-10 items-center justify-center text-gray-500"
                                    >
                                        {page}
                                    </span>
                                ),
                            )}

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500">
                            Sayfa {currentPage} / {totalPages} (Toplam{' '}
                            {totalProducts} ürün)
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
