import fetchRates from '../src/apiClient/rates'
import ExchangeForm from '../src/components/ExchangeForm'
import { RatesData } from '../src/types'

interface Props {
  initialData: RatesData
}
const Exchange = ({ initialData }: Props) => (
  <ExchangeForm initialData={initialData} />
)

// glue code!
/* istanbul ignore next */
export async function getServerSideProps() {
  const initialData = await fetchRates()

  return {
    props: {
      initialData,
    },
  }
}

export default Exchange
