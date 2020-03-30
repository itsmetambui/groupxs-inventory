import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../store"
import * as api from "../../api/inventory"

export type InventoryParam = {
  id: string
  stock: number
}

type InventoryRecord = {
  stock: number
  deliveryTime: string
}

type InventoryState = {
  isLoading: boolean
  error: string | null
  inventory: { [key: string]: InventoryRecord }
}

const initialState: InventoryState = {
  isLoading: false,
  error: null,
  inventory: {},
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    checkinInventoryStart: startLoading,
    checkinInventoryFailed: loadingFailed,
    checkinInventorySuccess: (state: InventoryState, action: PayloadAction<InventoryParam>): void => {
      const { id, stock } = action.payload
      state.inventory[id] = {
        stock,
        deliveryTime: new Date().toISOString(),
      }
      state.isLoading = true
    },
  },
})

export const checkinInventory = (materialId: string, stock: number): AppThunk => async (dispatch) => {
  try {
    dispatch(checkinInventoryStart())
    const record = await api.checkinInventory(materialId, stock)
    dispatch(checkinInventorySuccess({ id: record.id, stock: record.stock }))
  } catch (err) {
    dispatch(checkinInventoryFailed(err.toString()))
  }
}

function startLoading(state: InventoryState) {
  state.isLoading = true
}

function loadingFailed(state: InventoryState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

export const { checkinInventoryStart, checkinInventoryFailed, checkinInventorySuccess } = inventorySlice.actions

export default inventorySlice
