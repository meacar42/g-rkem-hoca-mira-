export interface IReviewUser {
    id: number
    name: string
    surname: string
}

export interface IReview {
    id: number
    rating: number
    comment?: string
    createdAt: string
    user: IReviewUser
}

export interface IProductReviewsResponse {
    reviews: IReview[]
    averageRating: number
    totalReviews: number
}

export interface ICanReviewResponse {
    canReview: boolean
    hasPurchased: boolean
    hasReviewed: boolean
}

export interface ICreateReviewDto {
    productId: number
    rating: number
    comment?: string
}
