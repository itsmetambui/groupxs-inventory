import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../store"
import * as api from "../../api/material"

export enum MaterialType {}

export enum MaterialUnit {}

export type MaterialInfo = {
  price: number
  type: MaterialType
  unit: MaterialUnit
  barCode: string
}

export type Material = {
  id: string | undefined
} & MaterialInfo

type MaterialState = {
  isLoading: boolean
  error: string | null
  materials: Material[]
}

const initialState: MaterialState = {
  isLoading: false,
  error: null,
  materials: [],
}

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    addMaterialStart: startLoading,
    addMaterialFailed: loadingFailed,
    addMaterialSuccess: (state: MaterialState, action: PayloadAction<Material>): void => {
      state.materials.push(action.payload)
    },
  },
})

function startLoading(state: MaterialState) {
  state.isLoading = true
}

function loadingFailed(state: MaterialState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

export const addMaterial = (info: MaterialInfo): AppThunk => async (dispatch) => {
  try {
    dispatch(addMaterialStart())
    const material = await api.addMaterial(info)
    dispatch(addMaterialSuccess(material))
  } catch (err) {
    dispatch(addMaterialFailed(err.toString()))
  }
}

export const { addMaterialStart, addMaterialFailed, addMaterialSuccess } = materialSlice.actions

export default materialSlice
