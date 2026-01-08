import { Suspense } from 'react'
import CatalogContent from './CatalogContent'

function CatalogLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-emerald-500"></div>
        </div>
    )
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<CatalogLoading />}>
            <CatalogContent />
        </Suspense>
    )
}
