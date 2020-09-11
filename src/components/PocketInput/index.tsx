import React from 'react'

import formatMoney from '../../utils/formatMoney'
import { Pocket, Currency } from '../../types'
import config from '../../utils/config'

// NOTE: Input validation is done via HTML attrs.
// Maybe use something more flexible like `yup` IRL :)
interface Props extends React.HTMLProps<HTMLInputElement> {
  innerRef?: React.MutableRefObject<HTMLInputElement>
  name: string
  onSelectOption: React.Dispatch<React.SetStateAction<Currency>>
  pocket: Pocket
}
const PocketExchangeInput = ({
  innerRef,
  name,
  onSelectOption,
  pocket,
  ...inputProps
}: Props) => (
  <div className="form-group">
    <span
      style={{
        display: 'inline-flex',
      }}
    >
      <label style={{ textTransform: 'capitalize' }} htmlFor={name}>
        {`${name}: `}
      </label>
      {config.availableCurrencies.map((currency: Currency) => (
        <a
          onClick={() => onSelectOption(currency)}
          role="button"
          key={currency}
          className={`pocket-currency-option${
            pocket.currency === currency ? ' active' : ''
          }`}
        >
          {currency}
        </a>
      ))}
    </span>
    <input
      id={name}
      inputMode="decimal"
      max={formatMoney(pocket.availableAmount)}
      min="0"
      name={name}
      pattern="[\d\.]*"
      ref={innerRef}
      step="0.01"
      type="number"
      {...inputProps}
    />
    <div>{`You have ${formatMoney(
      pocket.availableAmount,
      pocket.currency
    )}`}</div>
  </div>
)

export default PocketExchangeInput
