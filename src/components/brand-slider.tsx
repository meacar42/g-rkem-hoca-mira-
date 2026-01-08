'use client'
import LogoLoop from '@/components/LogoLoop'

const imageLogos = [
    {
        src: '/brands/1.png',
    },
    {
        src: '/brands/2.png',
    },
    {
        src: '/brands/3.png',
    },
    {
        src: '/brands/4.png',
    },
    {
        src: '/brands/5.png',
    },
    {
        src: '/brands/6.png',
    },
    {
        src: '/brands/7.png',
    },
]

export default function BrandSlider() {
    return (
        <LogoLoop
            logos={imageLogos}
            speed={100}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
        />
    )
}
