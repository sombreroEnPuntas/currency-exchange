import React from 'react'
import { render } from '@testing-library/react'

// Tested Unit
import Component from '.'

// Utils
import { pocketsMock } from '../../utils/mocks'

// Mocks
const testPocket = pocketsMock.find(({ currency }) => currency === 'GBP')

// Mock data
const getProps = (customProps) => ({
  name: 'from',
  pocket: testPocket,
  ...customProps,
})

const setup = (customProps = {}) => {
  const utils = render(<Component {...getProps(customProps)} />)
  const inputEl = utils.getByLabelText('GBP')

  return { inputEl, ...utils }
}

describe('PocketInput', () => {
  it('Renders mandatory data', () => {
    const { container, getByText, inputEl } = setup()

    expect(inputEl).toHaveAttribute('id', 'from')
    expect(inputEl).toHaveAttribute('name', 'from')
    expect(inputEl).toHaveAttribute('type', 'number')

    expect(getByText(/You have £58.33/)).toBeVisible()

    expect(container).toMatchSnapshot()
  })

  it('Passes down rest props to input element', () => {
    const { inputEl } = setup({ required: true })

    expect(inputEl).toHaveAttribute('required')
  })
})
