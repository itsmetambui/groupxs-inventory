import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../store"
import * as api from "../../api/inventory"

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
  inventory: {
    materialId: {
      stock: 10,
      deliveryTime: "now",
    },
  },
}

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    checkinInventoryStart: startLoading,
    checkinInventoryFailed: loadingFailed,
    checkinInventorySuccess: (state: InventoryState, action: PayloadAction<{ materialId: string; stock: number }>): void => {
      const { materialId, stock } = action.payload
      state.inventory[materialId] = {
        stock,
        deliveryTime: new Date().toISOString(),
      }
    },
  },
})

export const checkinInventory = (materialId: string, stock: number): AppThunk => async (dispatch) => {
  try {
    dispatch(checkinInventoryStart())
    const record = await api.checkinInventory(materialId, stock)
    dispatch(checkinInventorySuccess({ materialId: record.id, stock: record.stock }))
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
