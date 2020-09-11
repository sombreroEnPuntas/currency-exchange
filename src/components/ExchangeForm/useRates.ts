import { useEffect, useState } from 'react'

import { RatesData } from '../../types'

interface Deps {
  initialData: RatesData
}
const useRates = ({ initialData }: Deps) => {
  const [ratesData, setRatesData] = useState(initialData)

  // IRL this might be bad performance. Instead we could use sockets or server events
  useEffect(() => {
    let timeoutID: NodeJS.Timeout
    const pollEveryTenSeconds = () => {
      // setInterval will result on clashing requests
      // if response time is longer than 10 sec
      timeoutID = setTimeout(async () => {
        let data: RatesData = null
        try {
          data = await fetch(`api/rates`).then((res) => res.json())
        } catch (e) {
          data = {
            error: `${e.message}`,
            rates: null,
          }
        }
        setRatesData(data)

        if (!data.error) pollEveryTenSeconds()
      }, 10_000)
    }

    pollEveryTenSeconds()

    return () => {
      clearTimeout(timeoutID)
    }
  }, [])

  return { ratesData }
}

export default useRates
