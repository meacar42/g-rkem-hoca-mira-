'use client'
import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/product-card'
import { IProduct } from '@/types/IProduct'
import { getProductsAPI } from '@/api/product/product.api'

interface FilterOptions {
    category: string
    frameShape: string
    color: string
    priceRange: string
    gender: string
}

export default function CatalogPage() {
    const [category, setCategory] = useState('sunglasses')
    const [products, setProducts] = useState<IProduct[]>([])

    const [filters, setFilters] = useState<FilterOptions>({
        category: category || '',
        frameShape: '',
        color: '',
        priceRange: '',
        gender: '',
    })
    const [sortBy, setSortBy] = useState('featured')
    const [showFilters, setShowFilters] = useState(false)

    const filteredProducts = products.filter((product) => {
        if (filters.category && product.category !== filters.category)
            return false
        if (filters.frameShape && product.frameShape !== filters.frameShape)
            return false
        if (
            filters.gender &&
            product.gender !== filters.gender &&
            product.gender !== 'unisex'
        )
            return false
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number)
            if (max && (product.price < min || product.price > max))
                return false
            if (!max && product.price < min) return false
        }
        return true
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price
            case 'price-high':
                return b.price - a.price
            case 'name':
                return a.name.localeCompare(b.name)
            default:
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        }
    })

    const frameShapes = [...new Set(products.map((p) => p.frameShape))]
    const genders = ['men', 'women', 'unisex']

    const clearFilters = () => {
        setFilters({
            category: category || '',
            frameShape: '',
            color: '',
            priceRange: '',
            gender: '',
        })
    }

    const activeFiltersCount = Object.values(filters).filter(
        (v) => v && v !== category,
    ).length

    useEffect(() => {
        getProductsAPI().then((data) => setProducts(data))
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-black mb-2">
                        {category
                            ? category === 'sunglasses'
                                ? 'Sunglasses'
                                : 'Eyeglasses'
                            : 'All Products'}
                    </h1>
                    {/*<p className="text-gray-600">{sortedProducts.length} products found</p>*/}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <button
                        onClick={() => {}}
                        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        <span>Filters</span>
                        {activeFiltersCount > 0 && (
                            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    <aside
                        className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}
                    >
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-lg">Filters</h2>
                                {activeFiltersCount > 0 && (
                                    <button
                                        onClick={() => {}}
                                        className="text-emerald-500 text-sm hover:text-emerald-600 flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear
                                    </button>
                                )}
                            </div>

                            {!category && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 text-gray-900">
                                        Category
                                    </h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={
                                                    filters.category === ''
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        ...filters,
                                                        category: '',
                                                    })
                                                }
                                                className="mr-2 accent-emerald-500"
                                            />
                                            <span className="text-gray-700">
                                                All
                                            </span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={
                                                    filters.category ===
                                                    'sunglasses'
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        ...filters,
                                                        category: 'sunglasses',
                                                    })
                                                }
                                                className="mr-2 accent-emerald-500"
                                            />
                                            <span className="text-gray-700">
                                                Sunglasses
                                            </span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={
                                                    filters.category ===
                                                    'eyeglasses'
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        ...filters,
                                                        category: 'eyeglasses',
                                                    })
                                                }
                                                className="mr-2 accent-emerald-500"
                                            />
                                            <span className="text-gray-700">
                                                Eyeglasses
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-gray-900">
                                    Frame Shape
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="frameShape"
                                            checked={filters.frameShape === ''}
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    frameShape: '',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            All
                                        </span>
                                    </label>
                                    {frameShapes.map((shape) => (
                                        <label
                                            key={shape}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                name="frameShape"
                                                checked={
                                                    filters.frameShape === shape
                                                }
                                                onChange={() =>
                                                    setFilters({
                                                        ...filters,
                                                        frameShape: shape,
                                                    })
                                                }
                                                className="mr-2 accent-emerald-500"
                                            />
                                            <span className="text-gray-700">
                                                {shape}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-gray-900">
                                    Price Range
                                </h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={filters.priceRange === ''}
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    priceRange: '',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            All
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={
                                                filters.priceRange === '0-100'
                                            }
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    priceRange: '0-100',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            Under $100
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={
                                                filters.priceRange === '100-150'
                                            }
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    priceRange: '100-150',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            $100 - $150
                                        </span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="priceRange"
                                            checked={
                                                filters.priceRange === '150'
                                            }
                                            onChange={() =>
                                                setFilters({
                                                    ...filters,
                                                    priceRange: '150',
                                                })
                                            }
                                            className="mr-2 accent-emerald-500"
                                        />
                                        <span className="text-gray-700">
                                            $150+
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-gray-900">
                                    Gender
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
                                            All
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
                                            <span className="text-gray-700 capitalize">
                                                {gender}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                            <span className="text-gray-700 font-medium">
                                Sort by:
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="name">Name</option>
                            </select>
                        </div>

                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={() => {}}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                                <p className="text-gray-500 text-lg">
                                    No products found matching your filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-emerald-500 hover:text-emerald-600 font-medium"
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
