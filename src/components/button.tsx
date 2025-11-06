import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles =
        'font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary:
            'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md',
        secondary:
            'bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md',
        outline:
            'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50',
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
