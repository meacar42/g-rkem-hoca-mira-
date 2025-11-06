import { IProduct } from '@/types/IProduct'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'

interface ProductCardProps {
    product: IProduct
    onAddToCart?: (product: IProduct) => void
}

export default function ProductCard({
    product,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative overflow-hidden aspect-square bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <Link href={`/catalog/${product.id}`}>
                        <button className="bg-white p-3 rounded-full hover:bg-emerald-500 hover:text-white transition-colors duration-200">
                            <Eye className="w-5 h-5" />
                        </button>
                    </Link>
                    {onAddToCart && (
                        <button
                            onClick={() => onAddToCart(product)}
                            className="bg-white p-3 rounded-full hover:bg-emerald-500 hover:text-white transition-colors duration-200"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    )}
                </div>
                {!product.inStock && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Out of Stock
                    </div>
                )}
                {product.featured && (
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                    </div>
                )}
            </div>
            <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {product.category}
                </p>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-500 transition-colors">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-emerald-500">
                        ${product.price}
                    </p>
                    <span className="text-xs text-gray-500">
                        {product.frameShape}
                    </span>
                </div>
            </div>
        </div>
    )
}
