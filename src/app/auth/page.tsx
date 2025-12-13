'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Mail, Loader2, LogIn, UserPlus } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '@/hooks/use-user'

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('login')

    const router = useRouter()
    const { login, register } = useUser()

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!email || !password) {
            toast.error('Lütfen tüm alanları doldurun')
            setLoading(false)
            return
        }

        try {
            await login(email, password)

            router.push('/')
        } catch (err: any) {
            toast.error(
                err.message || 'Giriş başarısız. Lütfen tekrar deneyin.',
            )
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!email || !password || !confirmPassword) {
            toast.error('Lütfen tüm alanları doldurun')
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            toast.error('Şifreler eşleşmiyor')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            toast.error('Şifre en az 6 karakter olmalıdır')
            setLoading(false)
            return
        }

        try {
            await register(email, password)
            toast.success('Hesap başarıyla oluşturuldu!')

            router.push('/')
        } catch (err: any) {
            toast.error(
                err.message || 'Kayıt başarısız. Lütfen tekrar deneyin.',
            )
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setLoading(false)
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        resetForm()
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-800">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">
                            Hoşgeldiniz
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Hesabınıza giriş yapın veya yeni bir hesap oluşturun
                        </p>
                    </div>

                    <Tabs
                        value={activeTab}
                        onValueChange={handleTabChange}
                        className="w-full"
                    >
                        <TabsList className="mb-6 grid w-full grid-cols-2">
                            <TabsTrigger
                                value="login"
                                className="flex items-center gap-2"
                            >
                                <LogIn className="h-4 w-4" />
                                Giriş Yap
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="flex items-center gap-2"
                            >
                                <UserPlus className="h-4 w-4" />
                                Kayıt Ol
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Card className="border-0 shadow-xl">
                                <CardHeader>
                                    <CardTitle>
                                        Hesabınıza Giriş Yapın
                                    </CardTitle>
                                    <CardDescription>
                                        Devam etmek için e-posta ve şifrenizi
                                        girin
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={handleLogin}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="login-email">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="login-email"
                                                    type="email"
                                                    placeholder="mail@example.com"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className="pl-10"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="login-password">
                                                Şifre
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="login-password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col space-y-4">
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="w-full"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Giriş yapılıyor...
                                                </>
                                            ) : (
                                                <>
                                                    <LogIn className="mr-2 h-4 w-4" />
                                                    Giriş Yap
                                                </>
                                            )}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register">
                            <Card className="border-0 shadow-xl">
                                <CardHeader>
                                    <CardTitle>Hesap Oluştur</CardTitle>
                                    <CardDescription>
                                        Yeni bir hesap oluşturmak için
                                        bilgilerinizi girin
                                    </CardDescription>
                                </CardHeader>
                                <form onSubmit={handleRegister}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="register-email">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="register-email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    className="pl-10"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="register-password">
                                                Şifre
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="register-password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">
                                                Şifre Tekrarı
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="confirm-password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={(e) =>
                                                        setConfirmPassword(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="pl-10"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col space-y-4">
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="w-full"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Hesap oluşturuluyor...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="mr-2 h-4 w-4" />
                                                    Create Account
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                                            Kayıt olarak, şartları ve koşulları
                                            kabul etmiş olursunuz.
                                        </p>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
