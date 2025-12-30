import IBrand from '@/types/IBrand'
import IModel from '@/types/IModel'

export interface IProduct {
    id: number
    name: string
    slug: string
    description: string
    type: ProductType // product_type
    price: number
    discount?: number
    stockQuantity: number
    brand: IBrand
    model: IModel
    gender: Gender
    images: string[]
    frameType: FrameTypeLabel // frame_type
    material?: string // frame_material
    color?: string // frame_color
    lensWidth?: string // lens_width
    bridgeWidth?: string // bridge_width
    templeLength?: string // temple_length
    lensType?: string // lens_type
}

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    UNISEX = 'unisex',
}

export enum FrameTypeLabel {
    FULL_RIM = 'full_rim',
    SEMI_RIMLESS = 'semi_rimless',
    RIMLESS = 'rimless',
    CATE_EYE = 'cate_eye',
    ROUND = 'round',
    AVIATOR = 'aviator',
    SQUARE = 'square',
    RECTANGLE = 'rectangle',
    WAYFARER = 'wayfarer',
    OVERSIZED = 'oversized',
}

export enum ProductType {
    SUNGLASS = 'sunglasses',
    PRESCRIPTION = 'prescription',
    SOLUTION = 'solution',
}
