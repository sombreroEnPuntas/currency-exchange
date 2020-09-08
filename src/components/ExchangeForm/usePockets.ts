import { useDispatch, useSelector } from 'react-redux'

import {
  Currency,
  Pocket,
  getPocketByCurrency,
  setPocketByCurrency,
} from '../../data/pockets'

interface Deps {
  fromTarget: Currency
  toTarget: Currency
}
const usePockets = ({ fromTarget, toTarget }: Deps) => {
  const dispatch = useDispatch()

  const from: Pocket = useSelector(getPocketByCurrency(fromTarget))
  const to: Pocket = useSelector(getPocketByCurrency(toTarget))

  const transaction = (fromValue: string, toValue: string) => {
    dispatch(
      setPocketByCurrency({
        availableAmount: from.availableAmount - parseFloat(fromValue),
        currency: fromTarget,
      })
    )
    dispatch(
      setPocketByCurrency({
        availableAmount: parseFloat(toValue) + to.availableAmount,
        currency: toTarget,
      })
    )
  }

  return { from, to, transaction }
}

export default usePockets
