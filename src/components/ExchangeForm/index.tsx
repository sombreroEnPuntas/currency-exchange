import React, { useState } from 'react'
import { useRouter } from 'next/router'

import usePockets from './usePockets'
import useRates from './useRates'
import PocketExchangeInput from '../PocketInput'
import useAutoFocus from '../../utils/useAutoFocus'
import formatMoney from '../../utils/formatMoney'
import { RatesData, Currency } from '../../types'

const convert = (value: string, exchangeRate: number): string =>
  formatMoney(parseFloat(value) * exchangeRate)

interface Props {
  initialData: RatesData
}
const ExchangeForm = ({ initialData }: Props) => {
  // form state
  const [fromTarget, setFromTarget] = useState<Currency>('GBP')
  const [toTarget, setToTarget] = useState<Currency>('USD')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  // data
  const { from, to, transaction } = usePockets({ fromTarget, toTarget })
  const {
    ratesData: { rates, error },
  } = useRates({ initialData })
  const exchangeRate = rates ? rates[toTarget] / rates[fromTarget] : null

  // navigation
  const router = useRouter()

  // CTAs
  // TODO implement UI
  // const handleFromTargetSelection = ({
  //   target: { value },
  // }: React.ChangeEvent<HTMLInputElement>) => {
  //   setFromTarget(value)
  // }
  // const handleToTargetSelection = ({
  //   target: { value },
  // }: React.ChangeEvent<HTMLInputElement>) => {
  //   setToTarget(value)
  // }
  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(value)
    setToValue(convert(value, exchangeRate))
  }
  const handleCancel = () => {
    router.push('/')
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    transaction(fromValue, toValue)
  }

  // cuz' react rendering, we need to focus programmatically
  const inputRef = useAutoFocus()

  return (
    <form id="exchange" name="exchange" onSubmit={handleSubmit}>
      <PocketExchangeInput
        // autoFocus won't work reliably here
        disabled={!!error}
        innerRef={inputRef}
        name="from"
        onChange={handleInputChange}
        pocket={from}
        required
        value={fromValue}
      />
      <PocketExchangeInput
        name="to"
        pocket={to}
        readOnly
        tabIndex={-1}
        value={toValue}
      />
      <pre>
        <code>{error || ' '}</code>
      </pre>
      <button onClick={handleCancel} type="button">
        {'Cancel'}
      </button>
      <button disabled={!!error} type="submit">
        {'Exchange'}
      </button>
    </form>
  )
}

export default ExchangeForm
