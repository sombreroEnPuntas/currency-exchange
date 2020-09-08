import React from 'react'
import { fireEvent, render } from '@testing-library/react'

// Tested Unit
import Component from '.'

// Deps
import { useRouter } from 'next/router'
import usePockets from './usePockets'

// Utils
import TestProvider from '../../utils/TestProvider'
import { pocketsMock } from '../../utils/mocks'

// Mocks
jest.mock('next/router')
jest.mock('./usePockets')
const testFromPocket = pocketsMock.find(({ currency }) => currency === 'GBP')
const testToPocket = pocketsMock.find(({ currency }) => currency === 'USD')

// Mock data
const setMock = ({ from, to, transaction, push }) => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    push,
  }))
  ;(usePockets as jest.Mock).mockImplementation(() => ({
    from,
    to,
    transaction,
  }))
}

const setup = ({
  from = testFromPocket,
  to = testToPocket,
  transaction = jest.fn(),
  push = jest.fn(),
} = {}) => {
  setMock({ from, to, transaction, push })

  const utils = render(
    <TestProvider>
      <Component />
    </TestProvider>
  )

  const inputEl = utils.getByLabelText('GBP')
  const convertedEl = utils.getByLabelText('USD')
  const cancelCTA = utils.getByText(/Cancel/)
  const exchangeCTA = utils.getByText(/Exchange/)

  return { inputEl, convertedEl, cancelCTA, exchangeCTA, ...utils }
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

  it('Calculates exchange during change', () => {
    const { inputEl, convertedEl } = setup()
    const userInputValue = '23.50'
    const convertedValue = 31.59

    fireEvent.change(inputEl, { target: { value: userInputValue } })

    expect(convertedEl).toHaveValue(convertedValue)
  })

  it('Validates input', () => {
    const { inputEl } = setup()

    fireEvent.change(inputEl, { target: { value: '-1' } }) // min

    expect(inputEl).toBeInvalid()

    fireEvent.change(inputEl, { target: { value: '58.34' } }) // max

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
    const convertedValue = '31.59'

    fireEvent.change(inputEl, { target: { value: userInputValue } })

    fireEvent.click(exchangeCTA)

    expect(transaction).toHaveBeenCalledWith(userInputValue, convertedValue)
  })
})
