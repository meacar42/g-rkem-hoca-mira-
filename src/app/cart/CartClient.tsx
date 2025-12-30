'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    ShoppingCart,
    Loader2,
    MapPin,
    FileText,
} from 'lucide-react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from '@/components/ui/empty'

import { useCart } from '@/contexts/cart-context'
import { useUser } from '@/hooks/use-user'

import { getAddressesAPI, IAddress } from '@/api/address/addresses.api'

import { ICreateOrderRequestPayload } from '@/types/IOrderRequest'
import { ICity, IInfo } from '@/api/info/info.api'
import { CartItem } from '@/types/ICartItem'

import {
    ContactInfoSection,
    ContactInfo,
    AddressSelector,
    GuestAddressForm,
    GuestAddress,
    CartItemList,
    OrderSummary,
} from './components'
import { handlePaymentAction } from '@/app/test/actions'

// Validasyon fonksiyonları
const isPhoneValid = (phone: string) => phone.replace(/\D/g, '').length >= 10
const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

interface CartClientProps {
    cities: ICity[]
    info: IInfo
}

export default function CartClient({ cities, info }: CartClientProps) {
    const {
        cart,
        updateCartItem,
        removeFromCart,
        loadFullCart,
        isLoading: cartLoading,
        isCartLoading,
    } = useCart()

    const { currentUser, isLoggedIn, loading: userLoading } = useUser()

    // İletişim bilgileri (hem giriş yapmış hem misafir için)
    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        name: '',
        surname: '',
        email: '',
        phone: '',
    })

    // Adres state'leri
    const [userAddresses, setUserAddresses] = useState<IAddress[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
        null,
    )
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false)

    // Misafir teslimat adresi
    const [shippingAddress, setShippingAddress] = useState<GuestAddress>({
        cityId: '',
        districtId: '',
        addressDetail: '',
    })

    // Fatura adresi
    const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] =
        useState(true)
    const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<
        number | null
    >(null)
    const [billingAddress, setBillingAddress] = useState<GuestAddress>({
        cityId: '',
        districtId: '',
        addressDetail: '',
    })

    // Checkout state
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const [checkoutHtml, setCheckoutHtml] = useState<string | null>(null)

    // Cart sayfası açıldığında full cart bilgisini yükle
    useEffect(() => {
        loadFullCart()
    }, [loadFullCart])

    const startPaymentForm = async (payload: ICreateOrderRequestPayload) => {
        try {
            const result = (await handlePaymentAction(payload)) as any
            if (!result.success) {
                toast.error(
                    'Ödeme işlemi sırasında bir hata meydana geldi lütfen sepetinizi kontrol edip tekrar deneyiniz.',
                    {
                        autoClose: 2000,
                        className: 'w-96',
                    },
                )
                return
            }
            console.log(result.data)
            setCheckoutHtml(result.data.checkoutFormContent)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (!checkoutHtml) return

        const container = document.getElementById('iyzipay-checkout-form')

        if (!container) return

        container.innerHTML = checkoutHtml

        // Script'leri manuel çalıştır
        const scripts = container.getElementsByTagName('script')

        for (let i = 0; i < scripts.length; i++) {
            const script = document.createElement('script')
            script.type = 'text/javascript'

            if (scripts[i].src) {
                script.src = scripts[i].src
            } else {
                script.innerHTML = scripts[i].innerHTML
            }

            document.body.appendChild(script)
        }
    }, [checkoutHtml])

    // Giriş yapmış kullanıcının bilgilerini doldur
    useEffect(() => {
        if (isLoggedIn && currentUser) {
            setContactInfo({
                name: currentUser.name || '',
                surname: currentUser.surname || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
            })
        }
    }, [isLoggedIn, currentUser])

    // Giriş yapmış kullanıcının adreslerini çek
    useEffect(() => {
        async function fetchUserAddresses() {
            if (!isLoggedIn || userLoading) return

            setIsLoadingAddresses(true)
            try {
                const addresses = await getAddressesAPI()
                setUserAddresses(addresses)

                const defaultAddress = addresses.find((addr) => addr.isDefault)
                setSelectedAddressId(
                    defaultAddress?.id ?? addresses[0]?.id ?? null,
                )
            } catch (error) {
                console.error('Adresler yüklenirken hata:', error)
            } finally {
                setIsLoadingAddresses(false)
            }
        }

        fetchUserAddresses()
    }, [isLoggedIn, userLoading])

    // Fiyat hesaplama
    const getItemPrice = useCallback((item: CartItem): number => {
        if (!item.product) return 0
        const { price, discount = 0 } = item.product
        return discount > 0 ? price - (price * discount) / 100 : price
    }, [])

    const getCartSubTotal = useCallback((): number => {
        if (!cart) return 0
        return cart.products.reduce((total, item) => {
            return total + getItemPrice(item) * item.quantity
        }, 0)
    }, [cart, getItemPrice])

    const subtotal = useMemo(() => getCartSubTotal(), [getCartSubTotal])
    const shipping = useMemo(
        () => (subtotal > info.shipmentMinPrice ? 0 : info.shipmentPrice),
        [subtotal, info.shipmentMinPrice, info.shipmentPrice],
    )
    const total = useMemo(() => subtotal + shipping, [subtotal, shipping])

    // Miktar güncelleme
    const handleUpdateQuantity = useCallback(
        async (item: CartItem, newQuantity: number) => {
            if (newQuantity < 1) return
            const maxStock = item.product?.stockQuantity || 99
            if (newQuantity > maxStock) return

            await updateCartItem(item.productId, newQuantity)
        },
        [updateCartItem],
    )

    // Ürün silme
    const handleRemoveItem = useCallback(
        async (item: CartItem) => {
            await removeFromCart(item.productId)
        },
        [removeFromCart],
    )

    // Validasyonlar (memoized)
    const isContactInfoValid = useMemo(
        () =>
            contactInfo.name.trim().length >= 2 &&
            contactInfo.surname.trim().length >= 2 &&
            isEmailValid(contactInfo.email) &&
            isPhoneValid(contactInfo.phone),
        [contactInfo],
    )

    const isShippingAddressValid = useMemo(
        () =>
            isLoggedIn
                ? selectedAddressId !== null
                : shippingAddress.cityId &&
                  shippingAddress.districtId &&
                  shippingAddress.addressDetail.trim().length >= 10,
        [isLoggedIn, selectedAddressId, shippingAddress],
    )

    const isBillingAddressValid = useMemo(
        () =>
            billingAddressSameAsShipping
                ? true
                : isLoggedIn
                  ? selectedBillingAddressId !== null
                  : billingAddress.cityId &&
                    billingAddress.districtId &&
                    billingAddress.addressDetail.trim().length >= 10,
        [
            billingAddressSameAsShipping,
            isLoggedIn,
            selectedBillingAddressId,
            billingAddress,
        ],
    )

    const isFormValid =
        isContactInfoValid && isShippingAddressValid && isBillingAddressValid

    // Sipariş talebi oluştur
    const handleCheckout = useCallback(async () => {
        console.log('Checkout başlatılıyor...')
        if (!isFormValid || !cart || cart.products.length === 0) return

        setIsCheckingOut(true)

        try {
            const orderRequest: any = {
                isGuest: !isLoggedIn,
                billingAddressSameAsShipping,
            }

            //Not: Adres bilgilerini ve kullanıcı bilgilerini ekle Login user
            if (isLoggedIn && currentUser) {
                orderRequest.user = {
                    id: currentUser.id,
                    email: contactInfo.email,
                    name: contactInfo.name || undefined,
                    surname: contactInfo.surname || undefined,
                    phone: contactInfo.phone || undefined,
                }
                orderRequest.shippingAddressId = selectedAddressId!

                if (!billingAddressSameAsShipping) {
                    orderRequest.billingAddressId = selectedBillingAddressId!
                }
            } else {
                orderRequest.guest = {
                    email: contactInfo.email,
                    name: contactInfo.name,
                    surname: contactInfo.surname,
                    phone: contactInfo.phone,
                }
                orderRequest.shippingAddress = {
                    cityId: parseInt(shippingAddress.cityId),
                    districtId: parseInt(shippingAddress.districtId),
                    addressDetail: shippingAddress.addressDetail,
                    phone: contactInfo.phone,
                }

                if (!billingAddressSameAsShipping) {
                    orderRequest.billingAddress = {
                        cityId: parseInt(billingAddress.cityId),
                        districtId: parseInt(billingAddress.districtId),
                        addressDetail: billingAddress.addressDetail,
                    }
                }
            }

            orderRequest.products = cart.products.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }))

            console.log('Oluşturulan Sipariş Talebi:', orderRequest)

            await startPaymentForm(orderRequest)
        } catch (error: unknown) {
            console.error('Sipariş oluşturulurken hata:', error)
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Sipariş oluşturulurken bir hata oluştu'
            toast.error(errorMessage)
        } finally {
            setIsCheckingOut(false)
        }
    }, [
        isFormValid,
        cart,
        isLoggedIn,
        currentUser,
        contactInfo,
        selectedAddressId,
        selectedBillingAddressId,
        billingAddressSameAsShipping,
        shippingAddress,
        billingAddress,
    ])

    // Loading durumu (cart yüklenirken)
    if (isCartLoading || cart === null) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHeader />
                <div className="container mx-auto flex max-w-4xl items-center justify-center px-4 py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                        <p className="text-muted-foreground">
                            Sepetiniz yükleniyor...
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    // Boş sepet durumu
    if (cart.products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PageHeader />
                <div className="container mx-auto max-w-4xl px-4 py-12">
                    <Card>
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <ShoppingCart />
                                </EmptyMedia>
                                <EmptyTitle>Sepetiniz Boş</EmptyTitle>
                                <EmptyDescription>
                                    Gözlük koleksiyonumuza göz atın ve
                                    favorilerinizi sepete ekleyin
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Link href="/catalog" className="w-full">
                                    <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                                        Alışverişe Başla
                                    </Button>
                                </Link>
                            </EmptyContent>
                        </Empty>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/*<PageHeader itemCount={cart.itemCount} />*/}

            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Sol Taraf */}
                    <div className="space-y-4 lg:col-span-2">
                        {/* Ürün Listesi */}
                        <CartItemList
                            items={cart.products}
                            isLoading={cartLoading}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                            getItemPrice={getItemPrice}
                        />

                        {/* İletişim Bilgileri */}
                        <ContactInfoSection
                            contactInfo={contactInfo}
                            onChange={setContactInfo}
                            isPhoneValid={isPhoneValid}
                            isEmailValid={isEmailValid}
                        />

                        {/* Teslimat Adresi */}
                        <Card className="py-4">
                            <div className="px-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-emerald-500" />
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Teslimat Adresi
                                    </h2>
                                </div>
                            </div>
                            <div className="px-6">
                                {userLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                                    </div>
                                ) : isLoggedIn ? (
                                    <AddressSelector
                                        addresses={userAddresses}
                                        selectedAddressId={selectedAddressId}
                                        onSelect={setSelectedAddressId}
                                        isLoading={isLoadingAddresses}
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Teslimat adresinizi girin veya{' '}
                                            <Link
                                                href="/login"
                                                className="font-medium text-emerald-600 hover:underline"
                                            >
                                                giriş yaparak
                                            </Link>{' '}
                                            kayıtlı adreslerinizi kullanın.
                                        </p>
                                        <GuestAddressForm
                                            address={shippingAddress}
                                            onChange={setShippingAddress}
                                            cities={cities}
                                            idPrefix="shipping-"
                                        />
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Fatura Adresi */}
                        <Card className="py-4">
                            <div className="px-6">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-emerald-500" />
                                    <h2 className="text-xl font-semibold text-foreground">
                                        Fatura Adresi
                                    </h2>
                                </div>
                            </div>
                            <div className="px-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="sameAsShipping"
                                        checked={billingAddressSameAsShipping}
                                        onCheckedChange={(checked) => {
                                            setBillingAddressSameAsShipping(
                                                checked === true,
                                            )
                                            if (checked && isLoggedIn) {
                                                setSelectedBillingAddressId(
                                                    selectedAddressId,
                                                )
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor="sameAsShipping"
                                        className="cursor-pointer text-sm font-normal"
                                    >
                                        Fatura adresim teslimat adresimle aynı
                                    </Label>
                                </div>

                                {!billingAddressSameAsShipping && (
                                    <div className="mt-4">
                                        {userLoading ? (
                                            <div className="flex items-center justify-center py-8">
                                                <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                                            </div>
                                        ) : isLoggedIn ? (
                                            <AddressSelector
                                                addresses={userAddresses}
                                                selectedAddressId={
                                                    selectedBillingAddressId
                                                }
                                                onSelect={
                                                    setSelectedBillingAddressId
                                                }
                                                isLoading={isLoadingAddresses}
                                                emptyIcon={
                                                    <FileText className="mx-auto h-10 w-10 text-gray-400" />
                                                }
                                                showAddButton={false}
                                            />
                                        ) : (
                                            <GuestAddressForm
                                                address={billingAddress}
                                                onChange={setBillingAddress}
                                                cities={cities}
                                                idPrefix="billing-"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Alışverişe Devam */}
                        <Link href="/catalog">
                            <Button
                                variant="outline"
                                className="w-full bg-transparent"
                            >
                                Alışverişe Devam Et
                            </Button>
                        </Link>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <OrderSummary
                                subtotal={subtotal}
                                shipping={shipping}
                                total={total}
                                isValid={isFormValid as boolean}
                                isLoading={cartLoading}
                                isCheckingOut={isCheckingOut}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[500px]">
                <div id="iyzipay-checkout-form" className="popup !w-[500px]" />
            </div>
        </div>
    )
}

// Sayfa başlığı componenti
function PageHeader({ itemCount }: { itemCount?: number }) {
    return (
        <div className="border-b bg-white">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-2xl font-semibold text-foreground">
                            Sepetim
                        </h1>
                        {itemCount !== undefined && (
                            <p className="text-sm text-muted-foreground">
                                {itemCount} ürün
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
