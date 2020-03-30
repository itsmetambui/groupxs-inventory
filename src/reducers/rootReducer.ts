import { combineReducers, PayloadAction } from "@reduxjs/toolkit"
import materialSlice from "./material/materialSlice"

export type PayloadActionWithResolve<T> = {
  onResolve?: (data?: any) => void
} & PayloadAction<T>

const rootReducer = combineReducers({
  material: materialSlice.reducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
