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
            toast.error('Please fill in all fields')
            setLoading(false)
            return
        }

        try {
            await login(email, password)
            toast.success('Login successful!')

            // Başarılı login sonrası yönlendirme
            router.push('/')
        } catch (err: any) {
            toast.error(err.message || 'Failed to login. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!email || !password || !confirmPassword) {
            toast.error('Please fill in all fields')
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        try {
            await register(email, password)
            toast.success('Account created successfully!')

            // Başarılı register sonrası yönlendirme
            router.push('/')
        } catch (err: any) {
            toast.error(
                err.message || 'Failed to create account. Please try again.',
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
                            Welcome Back
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Sign in to your account or create a new one
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
                                Login
                            </TabsTrigger>
                            <TabsTrigger
                                value="register"
                                className="flex items-center gap-2"
                            >
                                <UserPlus className="h-4 w-4" />
                                Register
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Card className="border-0 shadow-xl">
                                <CardHeader>
                                    <CardTitle>Login to your account</CardTitle>
                                    <CardDescription>
                                        Enter your credentials to access your
                                        account
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
                                            <Label htmlFor="login-password">
                                                Password
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
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    <LogIn className="mr-2 h-4 w-4" />
                                                    Sign In
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
                                    <CardTitle>Create an account</CardTitle>
                                    <CardDescription>
                                        Sign up to get started with your new
                                        account
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
                                                Password
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
                                                Confirm Password
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
                                                    Creating account...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlus className="mr-2 h-4 w-4" />
                                                    Create Account
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                                            By signing up, you agree to our
                                            Terms of Service and Privacy Policy
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
