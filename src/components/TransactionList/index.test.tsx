import React from 'react'
import { render } from '@testing-library/react'

// Tested Unit
import Component from '.'

// Deps
import { useSelector } from 'react-redux'
import { getTransactions } from '../../data/transactions'

// Utils
import TestProvider from '../../utils/TestProvider'
import { transactionsMock } from '../../utils/mocks'

// Mocks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

// Mock data
const setMock = ({ transactions }) => {
  useSelector.mockImplementation((selector) => {
    switch (selector) {
      case getTransactions:
        return transactions

      default:
        return jest.requireActual('react-redux').useSelector(selector)
    }
  })
}

const setup = ({ transactions = transactionsMock } = {}) => {
  setMock({ transactions })

  const utils = render(
    <TestProvider>
      <Component />
    </TestProvider>
  )

  return {
    ...utils,
  }
}

describe('TransactionList', () => {
  it('Renders paginated transactions', () => {
    const { getAllByText, getByText } = setup()
    const firstPage = getAllByText(/\u27A1/)
    const pageNav = getByText('1/3')

    expect(firstPage).toHaveLength(10)
    expect(pageNav).toBeVisible()
  })

  it('Renders empty state transactions', () => {
    const { getByText } = setup({ transactions: [] })

    expect(getByText(/No Activity yet./)).toBeVisible()
  })
})
