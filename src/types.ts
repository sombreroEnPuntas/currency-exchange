export type Currency = 'EUR' | 'GBP' | 'USD'

export interface Pocket {
  availableAmount: number
  currency: Currency
}

export interface RatesData {
  rates: {
    [key in Currency]: number
  }
  error?: string
}
