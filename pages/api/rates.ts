import { NextApiRequest, NextApiResponse } from 'next'

import { RatesData } from '../../src/types'
import fetchRates from '../../src/apiClient/rates'

export default async (_: NextApiRequest, res: NextApiResponse<RatesData>) => {
  const data = await fetchRates() // server side req to prevent flashing secret key 👙
  res.status(200).json(data)
}
