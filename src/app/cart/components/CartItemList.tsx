'use client'

import { memo } from 'react'
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Item,
    ItemGroup,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
} from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import { ButtonGroup } from '@/components/ui/button-group'
import { CartItem } from '@/types/ICartItem'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

interface CartItemListProps {
    items: CartItem[]
    isLoading: boolean
    onUpdateQuantity: (item: CartItem, quantity: number) => void
    onRemove: (item: CartItem) => void
    getItemPrice: (item: CartItem) => number
}

function CartItemList({
    items,
    isLoading,
    onUpdateQuantity,
    onRemove,
    getItemPrice,
}: CartItemListProps) {
    const imageUrl = (item: CartItem) => {
        if (!item.product || item.product.images?.length === 0) {
            return '/placeholder-image.png'
        }
        return process.env.NEXT_PUBLIC_STORAGE_URL + item.product.images[0]
    }

    return (
        <Card className="overflow-hidden p-0">
            <ItemGroup>
                {items.map((item, index) => {
                    const product = item.product
                    const hasDiscount = product?.discount && product.discount > 0
                    const maxStock = product?.stockQuantity || 99

                    return (
                        <div key={item.productId}>
                            <Item size="default" className="p-6">
                                <ItemMedia variant="image">
                                    <AspectRatio
                                        ratio={1}
                                        className="rounded-lg bg-muted"
                                    >
                                        <Image
                                            src={imageUrl(item)}
                                            alt={product?.name || 'Ürün'}
                                            fill
                                            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
                                        />
                                    </AspectRatio>
                                </ItemMedia>

                                <ItemContent>
                                    <ItemTitle>
                                        {product?.name || 'Ürün yükleniyor...'}
                                    </ItemTitle>
                                    <ItemDescription>
                                        {product?.description?.slice(0, 100)}
                                    </ItemDescription>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-lg font-semibold text-emerald-600">
                                            {getItemPrice(item).toLocaleString('tr-TR')}{' '}
                                            TL
                                        </span>
                                        {hasDiscount && (
                                            <>
                                                <span className="text-sm text-muted-foreground line-through">
                                                    {product.price.toLocaleString(
                                                        'tr-TR',
                                                    )}{' '}
                                                    TL
                                                </span>
                                                <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">
                                                    %{product.discount} indirim
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </ItemContent>

                                <ItemActions className="flex-col items-end gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => onRemove(item)}
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                    <ButtonGroup>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                onUpdateQuantity(
                                                    item,
                                                    item.quantity - 1,
                                                )
                                            }}
                                            disabled={
                                                isLoading ||
                                                item.quantity <= 1
                                            }
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <div className="flex h-8 min-w-12 items-center justify-center border-y bg-background text-sm font-medium">
                                            {isLoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                item.quantity
                                            )}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                onUpdateQuantity(
                                                    item,
                                                    item.quantity + 1,
                                                )
                                            }
                                            disabled={
                                                isLoading ||
                                                item.quantity >= maxStock
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </ButtonGroup>
                                    {maxStock <= 5 && (
                                        <span className="text-xs text-orange-600">
                                            Son {maxStock} adet!
                                        </span>
                                    )}
                                </ItemActions>
                            </Item>
                            {index < items.length - 1 && <Separator />}
                        </div>
                    )
                })}
            </ItemGroup>
        </Card>
    )
}

export default memo(CartItemList)
