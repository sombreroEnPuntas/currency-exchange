import React, { useState } from 'react'
import { useRouter } from 'next/router'

import usePockets from './usePockets'
import useRates from './useRates'
import formatMoney from '../../utils/formatMoney'
import { Currency, RatesData } from '../../types'

const convert = (value: string, exchangeRate: number): string =>
  formatMoney(parseFloat(value) * exchangeRate)

interface Deps {
  initialData: RatesData
}
const useFormState = ({ initialData }: Deps) => {
  // local state
  const [fromTarget, setFromTarget] = useState<Currency>('GBP')
  const [toTarget, setToTarget] = useState<Currency>('USD')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  // global state
  const { fromPocket, toPocket, transaction } = usePockets({
    fromTarget,
    toTarget,
  })

  // data
  const {
    ratesData: { rates, error },
  } = useRates({ initialData })
  const exchangeRate = rates ? rates[toTarget] / rates[fromTarget] : null

  // navigation
  const router = useRouter()

  // CTAs
  const handleSelectOptionFrom = (option: Currency) => {
    toTarget === option && setToTarget(fromTarget)
    setFromTarget(option)

    setToValue(convert(fromValue, exchangeRate))
  }
  const handleSelectOptionTo = (option: Currency) => {
    fromTarget === option && setFromTarget(toTarget)
    setToTarget(option)

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

  return {
    error,
    fromPocket,
    fromValue,
    handleCancel,
    handleInputChange,
    handleSelectOptionFrom,
    handleSelectOptionTo,
    handleSubmit,
    toPocket,
    toValue,
  }
}

export default useFormState
