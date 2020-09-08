import { Provider } from 'react-redux'

import store from '../src/data'

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

export default App
