import { Currency } from '../types'

const roundToTwoDecimals = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100

const localFormatter = (currency?: Currency) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency })

/**
 * Formats a monetary amount as currency when [currency] is given,
 * or two decimals otherwise.
 *
 * @param {number} value monetary amount
 * @param {Currency} [currency] ISO currencies
 */
const formatMoney = (value: number, currency?: Currency) =>
  currency
    ? localFormatter(currency).format(roundToTwoDecimals(value))
    : roundToTwoDecimals(value).toFixed(2)

export default formatMoney
