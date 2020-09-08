import React from 'react'

import { Pocket } from '../../data/pockets'
import formatMoney from '../../utils/formatMoney'

// NOTE: Input validation is done via HTML attrs.
// Maybe use something more flexible like `yup` IRL :)
interface Props extends React.HTMLProps<HTMLInputElement> {
  innerRef?: React.MutableRefObject<HTMLInputElement>
  name: string
  pocket: Pocket
}
const PocketExchangeInput = ({
  innerRef,
  name,
  pocket,
  ...inputProps
}: Props) => (
  <>
    <label htmlFor={name}>{pocket.currency}</label>
    <input
      id={name}
      max={formatMoney(pocket.availableAmount)}
      min="0"
      name={name}
      ref={innerRef}
      step="0.01"
      type="number"
      {...inputProps}
    />
    <div>{`You have ${formatMoney(
      pocket.availableAmount,
      pocket.currency
    )}`}</div>
  </>
)

export default PocketExchangeInput
