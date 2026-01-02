import { fetchPublicAPI } from '@/api/fetch.public.api'

export interface IDistrict {
    id: number
    name: string
}

export interface ICity {
    id: number
    name: string
    districts: IDistrict[]
}

export interface IInfo {
    minOrderPrice: number
    shipmentMinPrice: number
    shipmentPrice: number
}

export async function getInfoAPI(): Promise<IInfo> {
    return fetchPublicAPI<IInfo>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/info',
        {
            method: 'GET',
            cache: 'no-cache',
        },
    )
}

export async function getCitiesWithDistrictsAPI(): Promise<ICity[]> {
    return fetchPublicAPI<ICity[]>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/info/cities',
        {
            method: 'GET',
            //cache: 'no-cache', // for development
        },
        {
            revalidate: 86400,
        },
    )
}
