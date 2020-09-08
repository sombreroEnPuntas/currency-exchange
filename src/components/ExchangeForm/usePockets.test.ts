import { renderHook, act } from '@testing-library/react-hooks'

// Tested Unit
import testedHook from './usePockets'

// Utils
import TestProvider from '../../utils/TestProvider'
import { pocketsMock } from '../../utils/mocks'
import { Currency } from '../../types'

// Mocks
const testFromPocket = pocketsMock.find(({ currency }) => currency === 'GBP')
const testToPocket = pocketsMock.find(({ currency }) => currency === 'USD')

const setup = ({
  fromTarget = 'GBP' as Currency,
  toTarget = 'USD' as Currency,
} = {}) => {
  return renderHook(() => testedHook({ fromTarget, toTarget }), {
    wrapper: TestProvider,
  })
}

describe('usePockets', () => {
  it(`gets initial values`, async () => {
    const { result } = setup()

    expect(result.current.from).toStrictEqual(testFromPocket)
    expect(result.current.to).toStrictEqual(testToPocket)
  })

  it(`processes a transaction`, async () => {
    const { result } = setup()
    const userInputValue = '23.50'
    const convertedValue = '31.59'

    await act(async () => {
      await result.current.transaction(userInputValue, convertedValue)
    })

    // removes money from GBP pocket
    expect(result.current.from).toStrictEqual({
      availableAmount: 34.83,
      currency: 'GBP',
    })
    // adds money to USD pocket
    expect(result.current.to).toStrictEqual({
      availableAmount: 57.1,
      currency: 'USD',
    })
  })
})
