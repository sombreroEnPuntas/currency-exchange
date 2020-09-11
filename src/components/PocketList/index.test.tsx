import React from 'react'
import { render } from '@testing-library/react'

// Tested Unit
import Component from '.'

// Deps
import { useSelector } from 'react-redux'
import { getPockets } from '../../data/pockets'

// Utils
import TestProvider from '../../utils/TestProvider'
import { pocketsMock } from '../../utils/mocks'

// Mocks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

// Mock data
const setMock = ({ pockets }) => {
  useSelector.mockImplementation((selector) => {
    switch (selector) {
      case getPockets:
        return pockets

      default:
        return jest.requireActual('react-redux').useSelector(selector)
    }
  })
}

const setup = ({ pockets = pocketsMock } = {}) => {
  setMock({ pockets })

  const utils = render(
    <TestProvider>
      <Component />
    </TestProvider>
  )

  const EUR = utils.getByText(/EUR:/)
  const GBP = utils.getByText(/GBP:/)
  const USD = utils.getByText(/USD:/)

  return {
    EUR,
    GBP,
    USD,
    ...utils,
  }
}

describe('PocketList', () => {
  it('Renders Pockets', () => {
    const { EUR, GBP, USD } = setup()

    expect(EUR).toHaveTextContent('EUR: €0.00')
    expect(GBP).toHaveTextContent('GBP: £58.33')
    expect(USD).toHaveTextContent('USD: $25.51')
  })
})
