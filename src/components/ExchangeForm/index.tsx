import React, { useState } from 'react'
import { useRouter } from 'next/router'

import usePockets from './usePockets'
import useRates from './useRates'
import Message from '../Message'
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
  const handleSelectOption = (pocketType: string) => (option: Currency) => {
    switch (pocketType) {
      case 'from':
        toTarget === option && setToTarget(fromTarget)
        setFromTarget(option)
        break
      case 'to':
        fromTarget === option && setFromTarget(toTarget)
        setToTarget(option)
        break
    }

    setToValue(convert(fromValue, exchangeRate))
  }
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

    transaction(fromValue, toTarget, exchangeRate)
  }

  // cuz' react rendering, we need to focus programmatically
  const inputRef = useAutoFocus()

  return (
    <>
      <form id="exchange" name="exchange" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Pockets</legend>
          <PocketExchangeInput
            // autoFocus won't work reliably here
            disabled={!!error}
            innerRef={inputRef}
            name="from"
            onChange={handleInputChange}
            onSelectOption={handleSelectOption('from')}
            pocket={from}
            required
            value={fromValue}
          />
          <PocketExchangeInput
            disabled={!!error}
            name="to"
            onSelectOption={handleSelectOption('to')}
            pocket={to}
            readOnly
            tabIndex={-1}
            value={toValue}
          />
          <div
            className="form-group"
            style={{ display: 'flex', justifyContent: 'right' }}
          >
            <button
              className="btn btn-ghost"
              onClick={handleCancel}
              type="button"
            >
              {'Cancel'}
            </button>
            <button
              className="btn btn-default"
              disabled={!!error}
              type="submit"
            >
              {'Exchange'}
            </button>
          </div>
        </fieldset>
      </form>
      <Message error={!!error} message={error} />
    </>
  )
}

export default ExchangeForm
