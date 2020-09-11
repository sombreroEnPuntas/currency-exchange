import React from 'react'
import { useSelector } from 'react-redux'

import { getPockets } from '../../data/pockets'
import { Pocket } from '../../types'
import formatMoney from '../../utils/formatMoney'

const PocketList = () => {
  const pockets: Pocket[] = useSelector(getPockets)

  return (
    <section>
      <h3>{'Pockets'}</h3>
      <ul>
        {pockets.map(({ availableAmount, currency }) => (
          <li key={`pocket-${currency}`}>
            {`${currency}: ${formatMoney(availableAmount, currency)}`}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PocketList
