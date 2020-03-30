import { combineReducers, PayloadAction } from "@reduxjs/toolkit"

export type PayloadActionWithResolve<T> = {
  onResolve?: (data?: any) => void
} & PayloadAction<T>

const rootReducer = combineReducers({})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
