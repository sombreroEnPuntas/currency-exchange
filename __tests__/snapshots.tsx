import React from 'react'
import { render } from '@testing-library/react'

// Tested Units
import Exchange from '../pages/exchange'
import Index from '../pages/index'

// Utils
import TestProvider from '../src/utils/TestProvider'

describe.each`
  Page
  ${Exchange}
  ${Index}
`('$Page.displayName', ({ Page }) => {
  test('snapshot', () => {
    const { container } = render(
      <TestProvider>
        <Page />
      </TestProvider>
    )

    expect(container).toMatchSnapshot()
  })
})
