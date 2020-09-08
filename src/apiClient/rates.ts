import { RatesData } from '../types'
import config from '../utils/config'

const fetchRates = async (): Promise<RatesData> => {
  let data = null
  let error = null
  try {
    data = await fetch(
      `${config.exchangeRateAPIRoute}?app_id=${process.env.OPEN_EXCHANGE_RATES_APP_ID}&symbols=EUR,GBP,USD`
    ).then((res) => res.json())
    if (data.error) error = `${data.status}: ${data.description}`
  } catch (e) {
    error = `${e.message}`
  }

  return {
    rates: data?.rates || null,
    error,
  }
}

export default fetchRates
