import fetchRates from '../src/apiClient/rates'
import ExchangeForm from '../src/components/ExchangeForm'
import { RatesData } from '../src/types'
import NavBar from '../src/components/NavBar'

interface Props {
  initialData: RatesData
}
const Exchange = ({ initialData }: Props) => (
  <>
    <NavBar />
    <div className="container">
      <ExchangeForm initialData={initialData} />
    </div>
  </>
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
