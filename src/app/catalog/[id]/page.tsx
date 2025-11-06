'use client'
import { useParams } from 'next/navigation'
import ProductDetail from '@/components/product-detail'

export default function ProductPage() {
    const { id } = useParams<{ id: string }>()
    return <ProductDetail id={parseInt(id)} />
}
