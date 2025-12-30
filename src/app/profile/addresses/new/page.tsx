import { getCitiesWithDistrictsAPI } from '@/api/info/info.api'
import AddressFormClient from './AddressFormClient'

export default async function NewAddressPage() {
    const cities = await getCitiesWithDistrictsAPI()

    return <AddressFormClient cities={cities} />
}
