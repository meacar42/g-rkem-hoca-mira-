'use client'

import type React from 'react'
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import {
    getDistrictsByCityAPI,
    type ICity,
    type IDistrict,
} from '@/api/location/location.api'

interface ILocationContext {
    cities: ICity[]
    getDistrictsByCity: (cityId: number) => Promise<IDistrict[]>
}

const LocationContext = createContext<ILocationContext | undefined>(undefined)

export function LocationProvider({
    children,
    initialCities,
}: {
    children: React.ReactNode
    initialCities: ICity[]
}) {
    const [cities] = useState<ICity[]>(initialCities)
    const districtsCacheRef = useRef<Record<number, IDistrict[]>>({})

    const getDistrictsByCity = useCallback(
        async (cityId: number): Promise<IDistrict[]> => {
            // Validasyon
            if (!cityId || isNaN(cityId) || cityId <= 0) {
                console.error('Geçersiz city ID:', cityId)
                return []
            }

            // Cache'de varsa cache'den dön
            if (districtsCacheRef.current[cityId]) {
                return districtsCacheRef.current[cityId]
            }

            try {
                const districts = await getDistrictsByCityAPI(cityId)
                // Cache'e kaydet
                districtsCacheRef.current[cityId] = districts
                return districts
            } catch (error) {
                console.error(
                    `Şehir ID ${cityId} için ilçeler yüklenirken hata oluştu:`,
                    error,
                )
                return []
            }
        },
        [],
    )

    return (
        <LocationContext.Provider
            value={{
                cities,
                getDistrictsByCity,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}

export function useLocation() {
    const context = useContext(LocationContext)
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider')
    }
    return context
}
