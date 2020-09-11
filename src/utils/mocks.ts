import { Pocket, RatesData, Transaction } from '../types'

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

export const transactionsMock: Transaction[] = [
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843069714,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843069877,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843070057,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843070217,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843070383,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843070566,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843070708,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843070863,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843071028,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843071173,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843071340,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843071517,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843071683,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843071850,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843072038,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843072202,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843072367,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843072530,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843072704,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843072899,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843073062,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843073247,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843073402,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843073564,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843073731,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843073888,
  },
  {
    from: { amount: 1, currency: 'GBP' },
    to: { amount: 1.2976934796093424, currency: 'USD' },
    timestamp: 1599843074054,
  },
]
