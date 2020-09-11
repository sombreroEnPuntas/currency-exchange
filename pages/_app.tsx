import { Provider } from 'react-redux'

import store from '../src/data'
import '../src/styles.css'

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

export default App
