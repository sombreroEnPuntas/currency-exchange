import Link from 'next/link'

import NavBar from '../src/components/NavBar'

const Home = () => (
  <>
    <NavBar />
    <div className="container">
      <div className="borderless-box">
        <p>
          {'To try the exchange app, go to >> '}
          <Link href="/exchange">{'Exchange'}</Link>
        </p>
        <p>
          {'Check the code on >> '}
          <Link href="https://github.com/sombreroEnPuntas/currency-exchange">
            {'github!'}
          </Link>
        </p>
      </div>
    </div>
  </>
)

export default Home
