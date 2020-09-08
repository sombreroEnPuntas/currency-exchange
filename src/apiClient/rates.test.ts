// Tested Unit
import fetchRates from './rates'

// Utils
import { ratesDataMock, ratesDataErrorMock } from '../utils/mocks'

// Mock data
const setMock = ({ resolve = null, reject = null } = {}) => {
  ;(global.fetch as jest.Mock) = jest.fn(() =>
    reject
      ? Promise.reject(reject)
      : Promise.resolve({
          json: () => Promise.resolve(resolve),
        })
  )
}

describe('fetchRates', () => {
  it('works', () => {
    setMock({ resolve: ratesDataMock })
    expect.assertions(1)
    return expect(fetchRates()).resolves.toEqual({
      error: null,
      rates: { EUR: 0.849394, GBP: 0.770598, USD: 1 },
    })
  })

  it('handles API errors as resolved', () => {
    setMock({ resolve: ratesDataErrorMock })
    expect.assertions(1)
    return expect(fetchRates()).resolves.toEqual({
      error:
        '403: No App ID provided. Please sign up at https://openexchangerates.org/signup, or contact support@openexchangerates.org.',
      rates: null,
    })
  })

  it('handles Network errors as resolved', () => {
    setMock({
      reject: Error(`418: The resulting entity body MAY be short and stout.`),
    })
    expect.assertions(1)
    return expect(fetchRates()).resolves.toEqual({
      error: '418: The resulting entity body MAY be short and stout.',
      rates: null,
    })
  })
})
