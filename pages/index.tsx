import Link from 'next/link'

const Home = () => (
  <>
    <h3>{'currency-exchange'}</h3>
    <pre>
      <Link href="https://github.com/sombreroEnPuntas/currency-exchange">
        {'Check the code on github!'}
      </Link>
    </pre>
    <Link href="/exchange">{'Exchange'}</Link>
  </>
)

export default Home
