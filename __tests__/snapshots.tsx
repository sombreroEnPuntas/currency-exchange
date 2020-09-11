import React from 'react'
import { render } from '@testing-library/react'

// Tested Units
import Exchange from '../pages/exchange'
import Index from '../pages/index'

// Deps
import { useRouter } from 'next/router'

// Utils
import TestProvider from '../src/utils/TestProvider'
import { ratesDataMock } from '../src/utils/mocks'

// Mocks
jest.mock('next/router')

// Mock data
const setMock = ({ pathname }) => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    pathname,
  }))
}

describe.each`
  Page        | props                             | mocks
  ${Exchange} | ${{ initialData: ratesDataMock }} | ${{ pathname: '/exchange' }}
  ${Index}    | ${{}}                             | ${{ pathname: '/' }}
`('$Page.displayName', ({ Page, props, mocks }) => {
  test('snapshot', () => {
    setMock(mocks)

    const { container } = render(
      <TestProvider>
        <Page {...props} />
      </TestProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
