import { combineReducers, Action } from 'redux'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'

import pockets from './pockets'
import transactions from './transactions'

const reducer = combineReducers({
  pockets,
  transactions,
})

const store = configureStore({
  reducer,
})

export type Store = ReturnType<typeof reducer>
export type Thunk = ThunkAction<void, Store, null, Action<string>>
export default store
