import React from 'react'

import Message from '../Message'
import PocketExchangeInput from '../PocketInput'
import useAutoFocus from '../../utils/useAutoFocus'
import { RatesData } from '../../types'
import useFormState from './useFormState'

interface Props {
  initialData: RatesData
}
const ExchangeForm = ({ initialData }: Props) => {
  // form state
  const {
    error,
    fromPocket,
    fromValue,
    handleCancel,
    handleInputChange,
    handleSelectOptionFrom,
    handleSelectOptionTo,
    handleSubmit,
    toPocket,
    toValue,
  } = useFormState({ initialData })

  // cuz' react rendering, we need to focus programmatically
  const inputRef = useAutoFocus()

  return (
    <>
      <form id="exchange" name="exchange" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Pockets</legend>
          <PocketExchangeInput
            // autoFocus won't work reliably here
            disabled={!!error}
            innerRef={inputRef}
            name="from"
            onChange={handleInputChange}
            onSelectOption={handleSelectOptionFrom}
            pocket={fromPocket}
            required
            value={fromValue}
          />
          <PocketExchangeInput
            disabled={!!error}
            name="to"
            onSelectOption={handleSelectOptionTo}
            pocket={toPocket}
            readOnly
            tabIndex={-1}
            value={toValue}
          />
          <div
            className="form-group"
            style={{ display: 'flex', justifyContent: 'right' }}
          >
            <button
              className="btn btn-ghost"
              onClick={handleCancel}
              type="button"
            >
              {'Cancel'}
            </button>
            <button
              className="btn btn-default"
              disabled={!!error}
              type="submit"
            >
              {'Exchange'}
            </button>
          </div>
        </fieldset>
      </form>
      <Message error={!!error} message={error} />
    </>
  )
}

export default ExchangeForm
