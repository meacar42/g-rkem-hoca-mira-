import { IProduct } from '@/types/IProduct'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import formatPrice from '@/utils/format-price'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { frameTypeLabels } from '@/types/IFrameTypeLabel'

interface ProductCardProps {
    product: IProduct
    onAddToCart?: (product: IProduct) => void
}

export default function ProductCard({
    product,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <AspectRatio ratio={1} className="rounded-lg bg-muted">
                    {product.images?.length > 0 ? (
                        <Image
                            src={
                                process.env.NEXT_PUBLIC_STORAGE_URL +
                                product.images[0]
                            }
                            alt={product.name}
                            fill
                            className="h-full w-full rounded-lg object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                            <span className="text-gray-400">Resim yok</span>
                        </div>
                    )}
                </AspectRatio>

                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black bg-opacity-0 opacity-0 transition-all duration-300 group-hover:bg-opacity-30 group-hover:opacity-100">
                    <Link href={`/catalog/${product.id}`}>
                        <button className="rounded-full bg-white p-3 transition-colors duration-200 hover:bg-emerald-500 hover:text-white">
                            <Eye className="h-5 w-5" />
                        </button>
                    </Link>
                    {onAddToCart && (
                        <button
                            onClick={() => onAddToCart(product)}
                            className="rounded-full bg-white p-3 transition-colors duration-200 hover:bg-emerald-500 hover:text-white"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    )}
                </div>
                {product.stockQuantity === 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        Stokta Yok
                    </div>
                )}
            </div>
            <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                    {product.brand.name}
                </p>
                <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-emerald-500">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-emerald-500">
                        {formatPrice(product.price)}
                    </p>
                    <span className="text-xs text-gray-500">
                        {frameTypeLabels[product.frameType]}
                    </span>
                </div>
            </div>
        </div>
    )
}
