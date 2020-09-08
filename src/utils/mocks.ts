import { Pocket, RatesData } from '../types'

export const pocketsMock: Pocket[] = [
  { availableAmount: 58.33, currency: 'GBP' },
  { availableAmount: 25.51, currency: 'USD' },
  { availableAmount: 0, currency: 'EUR' },
]

export const ratesDataMock: RatesData = {
  rates: { EUR: 0.849394, GBP: 0.770598, USD: 1 },
}

export const ratesDataErrorMock = {
  error: true,
  status: 403,
  message: 'missing_app_id',
  description:
    'No App ID provided. Please sign up at https://openexchangerates.org/signup, or contact support@openexchangerates.org.',
}
