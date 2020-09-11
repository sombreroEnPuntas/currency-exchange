import { useDispatch, useSelector } from 'react-redux'

import { getPocketByCurrency, setPocketByCurrency } from '../../data/pockets'
import { Currency, Pocket } from '../../types'
import { roundToTwoDecimals } from '../../utils/formatMoney'

interface Deps {
  fromTarget: Currency
  toTarget: Currency
}
const usePockets = ({ fromTarget, toTarget }: Deps) => {
  const dispatch = useDispatch()

  const fromPocket: Pocket = useSelector(getPocketByCurrency(fromTarget))
  const toPocket: Pocket = useSelector(getPocketByCurrency(toTarget))

  // NOTE: IRL this should be a BE action, otherwise it could be abused.
  // Request should include a timestamp to ensure we give the same
  // exchange rate when it gets actually processed, with a reasonable threshold for validation
  const transaction = (
    fromValue: string,
    currency: Currency,
    exchangeRate: number
  ) => {
    dispatch(
      setPocketByCurrency({
        availableAmount: roundToTwoDecimals(
          fromPocket.availableAmount - parseFloat(fromValue)
        ),
        currency: fromTarget,
      })
    )
    dispatch(
      setPocketByCurrency({
        availableAmount: roundToTwoDecimals(
          parseFloat(fromValue) * exchangeRate + toPocket.availableAmount
        ),
        currency,
      })
    )
  }

  return { fromPocket, toPocket, transaction }
}

export default usePockets
