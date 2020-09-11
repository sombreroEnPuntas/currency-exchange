import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Store } from '.'
import { Transaction } from '../types'

type TransactionsState = Transaction[]

// IRL fetch from BE instead!
const initialState: TransactionsState = []

const { actions, reducer } = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransaction: (state, { payload }: PayloadAction<Transaction>) => [
      ...state,
      payload,
    ],
  },
})

export const { setTransaction } = actions

export const getTransactions = (state: Store) => state.transactions

export default reducer
