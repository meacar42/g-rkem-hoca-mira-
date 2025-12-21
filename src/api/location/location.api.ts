import { fetchPublicAPI } from '@/api/fetch.public.api'

export interface ICity {
    id: number
    name: string
}

export interface IDistrict {
    id: number
    name: string
    cityId: number
}

export async function getCitiesAPI(): Promise<ICity[]> {
    return fetchPublicAPI<ICity[]>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/cities',
        {
            method: 'GET',
        },
    )
}

export async function getDistrictsByCityAPI(
    cityId: number,
): Promise<IDistrict[]> {
    return fetchPublicAPI<IDistrict[]>(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + `/districts?city=${cityId}`,
        {
            method: 'GET',
        },
    )
}
