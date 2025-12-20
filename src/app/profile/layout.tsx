'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/use-user'
import { Loader2 } from 'lucide-react'

export default function ProfileLayout({
    children,
}: {
    children: ReactNode
}) {
    const router = useRouter()
    const { currentUser, loading } = useUser()

    useEffect(() => {
        // Loading tamamlandığında ve user yoksa auth sayfasına yönlendir
        if (!loading && !currentUser) {
            router.push('/auth')
        }
    }, [currentUser, loading, router])

    // Loading durumunda spinner göster
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-emerald-500" />
                    <p className="mt-4 text-sm text-muted-foreground">
                        Yükleniyor...
                    </p>
                </div>
            </div>
        )
    }

    // User yoksa hiçbir şey gösterme (redirect ediliyor)
    if (!currentUser) {
        return null
    }

    // User varsa children'ı render et
    return <>{children}</>
}
