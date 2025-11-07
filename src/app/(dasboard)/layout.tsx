import { UserProvider } from '@/contexts/user-context'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function DasboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div>
            <UserProvider
                currentUser={{
                    id: '123',
                    email: 'test',
                    name: 'Test User',
                }}
            >
                {children}
            </UserProvider>
        </div>
    )
}
