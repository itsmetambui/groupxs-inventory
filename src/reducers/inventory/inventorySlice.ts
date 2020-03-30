import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit"
import { AppThunk } from "../../store"
import * as api from "../../api/inventory"
import { AppState } from "../rootReducer"
import { Material } from "../material/materialSlice"

export type InventoryParam = {
  id: string
  stock: number
}

type InventoryRecord = {
  stock: number
  deliveryTime: string
}

type InventoryMap = { [key: string]: InventoryRecord }

type InventoryState = {
  isLoading: boolean
  error: string | null
  inventory: InventoryMap
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
      const numStock = +stock
      state.inventory[id] = {
        stock: state.inventory[id] ? state.inventory[id].stock + numStock : numStock,
        deliveryTime: new Date().toISOString(),
      }
      state.isLoading = false
    },
    checkoutInventoryStart: startLoading,
    checkoutInventoryFailed: loadingFailed,
    checkoutInventorySuccess: (state: InventoryState, action: PayloadAction<{ id: string }>): void => {
      const { id } = action.payload
      delete state.inventory[id]
      state.isLoading = false
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

export const checkoutInventory = (inventoryId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(checkoutInventoryStart())
    const id = await api.checkoutInventory(inventoryId)
    dispatch(checkoutInventorySuccess({ id }))
  } catch (err) {
    dispatch(checkoutInventoryFailed(err.toString()))
  }
}

function startLoading(state: InventoryState) {
  state.isLoading = true
}

function loadingFailed(state: InventoryState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const selectMaterials = (state: AppState) => state.material.materials
const selectInventory = (state: AppState) => state.inventory.inventory

export type InventorySelectorReturnType = {
  id: string
  stock: number
  type: string
  deliveryTime: string
}
export const inventorySelector = createSelector<AppState, Material[], InventoryMap, InventorySelectorReturnType[]>(
  selectMaterials,
  selectInventory,
  (materials, inventory) => {
    return Object.keys(inventory).map((key) => {
      return {
        id: key,
        type: materials.find((material: Material) => material.id === key)!.type,
        ...inventory[key],
      }
    })
  },
)

export const {
  checkinInventoryStart,
  checkinInventoryFailed,
  checkinInventorySuccess,
  checkoutInventoryStart,
  checkoutInventoryFailed,
  checkoutInventorySuccess,
} = inventorySlice.actions

export default inventorySlice
