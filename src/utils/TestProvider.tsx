import React from 'react'
import { Provider } from 'react-redux'

import store from '../data'

const TestProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

export default TestProvider
