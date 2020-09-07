import { render } from '@testing-library/react'
import React from 'react'

// pages
import Index from '../pages/index'

describe.each`
  Page
  ${Index}
`('$Page.displayName', ({ Page }) => {
  test('snapshot', () => {
    const { container } = render(<Page />)

    expect(container).toMatchSnapshot()
  })
})
