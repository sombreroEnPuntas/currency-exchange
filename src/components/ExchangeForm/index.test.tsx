import React from 'react'
import { fireEvent, render } from '@testing-library/react'

// Tested Unit
import Component from '.'

// Deps
import { useRouter } from 'next/router'
import usePockets from './usePockets'
import useRates from './useRates'

// Utils
import TestProvider from '../../utils/TestProvider'
import { pocketsMock, ratesDataMock } from '../../utils/mocks'

// Mocks
jest.mock('next/router')
jest.mock('./usePockets')
jest.mock('./useRates')
const testFromPocket = pocketsMock.find(({ currency }) => currency === 'GBP')
const testToPocket = pocketsMock.find(({ currency }) => currency === 'USD')

// Mock data
const setMock = ({ from, to, transaction, push, ratesData }) => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    push,
  }))
  ;(usePockets as jest.Mock).mockImplementation(() => ({
    from,
    to,
    transaction,
  }))
  ;(useRates as jest.Mock).mockImplementation(() => ({
    ratesData,
  }))
}

const setup = ({
  from = testFromPocket,
  to = testToPocket,
  transaction = jest.fn(),
  push = jest.fn(),
  ratesData = ratesDataMock,
} = {}) => {
  setMock({ from, to, transaction, push, ratesData })
  const initialDataMock = ratesDataMock

  const utils = render(
    <TestProvider>
      <Component initialData={initialDataMock} />
    </TestProvider>
  )

  const inputEl = utils.getByLabelText('from:')
  const [fromEUR, toEUR] = utils.getAllByText(/EUR/)
  const [fromGBP, toGBP] = utils.getAllByText(/GBP/)
  const [fromUSD, toUSD] = utils.getAllByText(/USD/)
  const convertedEl = utils.getByLabelText('to:')
  const cancelCTA = utils.getByText(/Cancel/)
  const exchangeCTA = utils.getByText(/Exchange/)

  return {
    inputEl,
    convertedEl,
    cancelCTA,
    exchangeCTA,
    fromEUR,
    fromGBP,
    fromUSD,
    toEUR,
    toGBP,
    toUSD,
    ...utils,
  }
}

describe('ExchangeForm', () => {
  it('Renders default state', () => {
    const { container, inputEl, convertedEl, cancelCTA, exchangeCTA } = setup()

    expect(cancelCTA).toBeVisible()
    expect(exchangeCTA).toBeVisible()
    expect(inputEl).toBeVisible()
    expect(inputEl).toHaveFocus()
    expect(convertedEl).toBeVisible()

    expect(container).toMatchSnapshot()
  })

  it('Renders error state', () => {
    const { container, inputEl, convertedEl, cancelCTA, exchangeCTA } = setup({
      ratesData: { rates: null, error: 'rawr!' },
    })

    expect(cancelCTA).toBeVisible()
    expect(exchangeCTA).toBeVisible()
    expect(exchangeCTA).toBeDisabled()
    expect(inputEl).toBeVisible()
    expect(inputEl).toBeDisabled()
    expect(convertedEl).toBeVisible()

    expect(container).toMatchSnapshot()
  })

  it('Calculates exchange during change', () => {
    const { inputEl, convertedEl } = setup()
    const userInputValue = '23.50'
    const convertedValue = 30.5

    fireEvent.change(inputEl, { target: { value: userInputValue } })

    expect(convertedEl).toHaveValue(convertedValue)
  })

  it('Validates input', () => {
    const { inputEl } = setup()

    fireEvent.change(inputEl, { target: { value: '-1' } }) // min invalid

    expect(inputEl).toBeInvalid()

    fireEvent.change(inputEl, { target: { value: '58.34' } }) // max invalid

    expect(inputEl).toBeInvalid()

    fireEvent.change(inputEl, { target: { value: '58.33' } }) // valid

    expect(inputEl).toBeValid()
  })

  it('Goes back to home on Cancel', () => {
    const push = jest.fn()
    const { cancelCTA } = setup({ push })

    fireEvent.click(cancelCTA)

    expect(push).toHaveBeenCalledWith('/')
  })

  it('Executes a Transaction on Exchange', () => {
    const transaction = jest.fn()
    const { inputEl, exchangeCTA } = setup({ transaction })
    const userInputValue = '23.50'
    const targetCurrency = 'USD'
    const exchangeRate = 1.2976934796093424

    fireEvent.change(inputEl, { target: { value: userInputValue } })

    fireEvent.click(exchangeCTA)

    expect(transaction).toHaveBeenCalledWith(
      userInputValue,
      targetCurrency,
      exchangeRate
    )
  })

  it('Handles currency selection for "From:" pocket', () => {
    const { fromEUR } = setup() // gbp to usd

    expect(usePockets).toBeCalledWith({ fromTarget: 'GBP', toTarget: 'USD' })

    fireEvent.click(fromEUR) // eur to usd

    expect(usePockets).toBeCalledWith({ fromTarget: 'EUR', toTarget: 'USD' })
  })
  it('Swaps "To:" pocket when same option is selected for "From:" pocket', () => {
    const { fromUSD } = setup() // gbp to usd

    expect(usePockets).toBeCalledWith({ fromTarget: 'GBP', toTarget: 'USD' })

    fireEvent.click(fromUSD) // usd to gbp

    expect(usePockets).toBeCalledWith({ fromTarget: 'USD', toTarget: 'GBP' })
  })

  it('Handles currency selection for "To:" pocket', () => {
    const { toEUR } = setup() // gbp to usd

    expect(usePockets).toBeCalledWith({ fromTarget: 'GBP', toTarget: 'USD' })

    fireEvent.click(toEUR) // gbp to eur

    expect(usePockets).toBeCalledWith({ fromTarget: 'GBP', toTarget: 'EUR' })
  })
  it('Swaps "From:" pocket when same option is selected for "To:" pocket', () => {
    const { toGBP } = setup() // gbp to usd

    expect(usePockets).toBeCalledWith({ fromTarget: 'GBP', toTarget: 'USD' })

    fireEvent.click(toGBP) // usd to gbp

    expect(usePockets).toBeCalledWith({ fromTarget: 'USD', toTarget: 'GBP' })
  })
})
