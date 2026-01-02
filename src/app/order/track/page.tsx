import { Suspense } from 'react'
import OrderTrackingForm from './order-tracking-form'
import { Spinner } from '@/components/ui/spinner'

function LoadingFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="flex flex-col items-center gap-4">
                <Spinner />
            </div>
        </div>
    )
}

export default function OrdersPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <OrderTrackingForm />
        </Suspense>
    )
}
