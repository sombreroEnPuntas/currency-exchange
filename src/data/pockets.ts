import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Store } from '.'
import { pocketsMock } from '../utils/mocks'

export type Currency = 'EUR' | 'GBP' | 'USD'
export interface Pocket {
  availableAmount: number
  currency: Currency
}

type PocketsState = Pocket[]

// IRL initialize to [] here, and fetch/post to a BE instead!
const initialState: PocketsState = pocketsMock

const { actions, reducer } = createSlice({
  name: 'pockets',
  initialState,
  reducers: {
    setPocketByCurrency: (state, { payload }: PayloadAction<Pocket>) => [
      ...state.map((pocket) =>
        pocket.currency === payload.currency ? payload : pocket
      ),
    ],
  },
})

export const { setPocketByCurrency } = actions

export const getPocketByCurrency = (currency: Currency) => (state: Store) =>
  state.pockets.find((pocket) => pocket.currency === currency)

export default reducer
