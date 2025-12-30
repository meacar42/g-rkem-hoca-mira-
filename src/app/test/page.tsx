export default function TestPage() {
    return <div>Test Page</div>
}

// 'use client'
//
// import { useEffect, useState } from 'react'
// import { handlePaymentAction } from './actions'
//
// export default function TestPage() {
//     const [loading, setLoading] = useState(false)
//     const [checkoutHtml, setCheckoutHtml] = useState<string | null>(null)
//
//     const startPayment = async () => {
//         setLoading(true)
//
//         try {
//             const result = await handlePaymentAction({})
//             console.log(result.data)
//             setCheckoutHtml(result.data.checkoutFormContent)
//         } catch (e) {
//             console.error(e)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     // 👇 ASIL KRİTİK KISIM
//     useEffect(() => {
//         if (!checkoutHtml) return
//
//         const container = document.getElementById('iyzipay-checkout-form')
//
//         if (!container) return
//
//         container.innerHTML = checkoutHtml
//
//         // ⚠️ Script'leri manuel çalıştır
//         const scripts = container.getElementsByTagName('script')
//
//         for (let i = 0; i < scripts.length; i++) {
//             const script = document.createElement('script')
//             script.type = 'text/javascript'
//
//             if (scripts[i].src) {
//                 script.src = scripts[i].src
//             } else {
//                 script.innerHTML = scripts[i].innerHTML
//             }
//
//             document.body.appendChild(script)
//         }
//     }, [checkoutHtml])
//
//     return (
//         <div className="border-gray-500 p-2">
//             <button
//                 onClick={startPayment}
//                 disabled={loading}
//                 className="rounded bg-blue-600 px-4 py-2 text-white"
//             >
//                 {loading ? 'Bekleniyor...' : 'Ödeme Başlat'}
//             </button>
//
//             {/* 👇 BUNU İYZICO BEKLİYOR */}
//             <div className="w-[500px]">
//                 <div id="iyzipay-checkout-form" className="popup !w-[500px]" />
//             </div>
//         </div>
//     )
// }
