import React from 'react'
import { fireEvent, render } from '@testing-library/react'

// Tested Unit
import Component from '.'

// Utils
import { pocketsMock } from '../../utils/mocks'

// Mocks
const testPocket = pocketsMock.find(({ currency }) => currency === 'GBP')

// Mock data
const getProps = (customProps) => ({
  name: 'from',
  onSelectOption: jest.fn(),
  pocket: testPocket,
  ...customProps,
})

const setup = (customProps = {}) => {
  const utils = render(<Component {...getProps(customProps)} />)
  const inputEl = utils.getByLabelText('from:')
  const EUR = utils.getByText(/EUR/)
  const GBP = utils.getByText(/GBP/)
  const USD = utils.getByText(/USD/)

  return { inputEl, EUR, GBP, USD, ...utils }
}

describe('PocketInput', () => {
  it('Renders mandatory data', () => {
    const { container, getByText, inputEl, EUR, GBP, USD } = setup()

    expect(inputEl).toHaveAttribute('id', 'from')
    expect(inputEl).toHaveAttribute('name', 'from')
    expect(inputEl).toHaveAttribute('type', 'number')

    expect(EUR).not.toHaveClass('active')
    expect(GBP).toHaveClass('active')
    expect(USD).not.toHaveClass('active')

    expect(getByText(/You have £58.33/)).toBeVisible()

    expect(container).toMatchSnapshot()
  })

  it('Passes down rest props to input element', () => {
    const { inputEl } = setup({ required: true })

    expect(inputEl).toHaveAttribute('required')
  })

  it('Handles currency selection', () => {
    const handleSelect = jest.fn()
    const { EUR } = setup({ onSelectOption: handleSelect })

    fireEvent.click(EUR)

    expect(handleSelect).toHaveBeenCalledWith('EUR')
  })
})
