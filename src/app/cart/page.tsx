import { getCitiesWithDistrictsAPI } from '@/api/info/info.api'
import CartClient from './CartClient'

export default async function CartPage() {
    let cities = await getCitiesWithDistrictsAPI()

    return <CartClient cities={cities} />
}
