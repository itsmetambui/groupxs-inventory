import { combineReducers, PayloadAction } from "@reduxjs/toolkit"
import materialSlice from "./material/materialSlice"
import inventorySlice from "./inventory/inventorySlice"

export type PayloadActionWithResolve<T> = {
  onResolve?: (data?: any) => void
} & PayloadAction<T>

const rootReducer = combineReducers({
  material: materialSlice.reducer,
  inventory: inventorySlice.reducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
