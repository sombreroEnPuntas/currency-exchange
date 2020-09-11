export type Currency = 'EUR' | 'GBP' | 'USD'

export interface Pocket {
  availableAmount: number
  currency: Currency
}

export interface Transaction {
  from: {
    amount: number
    currency: Currency
  }
  to: {
    amount: number
    currency: Currency
  }
  timestamp: number
}

export interface RatesData {
  rates: {
    [key in Currency]: number
  }
  error?: string
}
