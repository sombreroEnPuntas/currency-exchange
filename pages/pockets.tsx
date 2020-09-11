import NavBar from '../src/components/NavBar'
import PocketList from '../src/components/PocketList'
import TransactionList from '../src/components/TransactionList'

const Pockets = () => (
  <>
    <NavBar />
    <div className="container">
      <PocketList />
      <TransactionList />
    </div>
  </>
)

export default Pockets
