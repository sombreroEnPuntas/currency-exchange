import React from 'react'
import { render } from '@testing-library/react'

// Tested Units
import Exchange from '../pages/exchange'
import Index from '../pages/index'

// Utils
import TestProvider from '../src/utils/TestProvider'
import { ratesDataMock } from '../src/utils/mocks'

describe.each`
  Page        | props
  ${Exchange} | ${{ initialData: ratesDataMock }}
  ${Index}    | ${{}}
`('$Page.displayName', ({ Page, props }) => {
  test('snapshot', () => {
    const { container } = render(
      <TestProvider>
        <Page {...props} />
      </TestProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
