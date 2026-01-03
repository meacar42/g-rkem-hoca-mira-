import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Button from '@/components/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="relative flex h-screen select-none flex-col items-center justify-center overflow-hidden">
            <AspectRatio ratio={1} className="absolute -z-10 blur-xl">
                <Image
                    src={'/404.webp'}
                    alt="Photo by Drew Beamer"
                    fill
                    className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </AspectRatio>
            <div className="absolute z-10 h-48 w-96 text-center font-sans text-lg font-medium text-white dark:text-gray-400">
                <div className="flex h-fit w-full select-none flex-col items-center justify-center space-y-8">
                    <div className="select-none space-y-4">
                        <h1 className="inline-block h-fit w-full font-mono text-[14em] font-bold text-white dark:text-gray-300">
                            404
                        </h1>
                    </div>
                    <p>Ne yazıkki aradığınız sayfayı bulamadık..</p>
                    <Link href="/">
                        <Button
                            variant="outline"
                            size="md"
                            className="hover:bg-white/10"
                        >
                            Geri Dön
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
