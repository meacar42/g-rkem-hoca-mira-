import { baseURL, fetchPublicAPI } from '@/api/fetch.public.api'
import { ISliderResponse } from '@/types/slider-response.interface'

export default async function getSlidesAPI(): Promise<ISliderResponse[]> {
    return fetchPublicAPI(baseURL + 'info/showcases')
}
