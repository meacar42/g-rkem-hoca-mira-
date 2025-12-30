import { getCitiesWithDistrictsAPI, getInfoAPI } from '@/api/info/info.api'
import CartClient from './CartClient'

export default async function CartPage() {
    const [cities, info] = await Promise.all([
        getCitiesWithDistrictsAPI(),
        getInfoAPI(),
    ])

    return <CartClient cities={cities} info={info} />
}
