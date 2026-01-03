'use client'

import { BadgeAlert } from 'lucide-react'

export default function CartError() {
    return (
        <div className="flex h-[30vh] flex-col items-center justify-center p-4 md:h-[50vh] lg:h-[62vh]">
            <BadgeAlert width={50} height={50} className="text-danger mb-4" />
            <h1 className="mb-4 text-2xl font-bold">Birşeyler yanlış gitti</h1>
            <p className="text-center">
                Sepetinizi yüklerken bir hata oluştu. Lütfen sayfayı yenileyin
                veya daha sonra tekrar deneyin.
            </p>
        </div>
    )
}
