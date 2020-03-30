import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../store"
import * as api from "../../api/material"

export type MaterialInfo = {
  price: number
  type: string
  unit: string
  barCode: string
}

export type Material = {
  id: string
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
      state.isLoading = false
      state.materials.push(action.payload)
    },
    updateMaterialStart: startLoading,
    updateMaterialFailed: loadingFailed,
    updateMaterialSuccess: (state: MaterialState, action: PayloadAction<Material>): void => {
      state.materials = state.materials.map((material) => {
        state.isLoading = false
        if (material.id === action.payload.id) return action.payload
        else return material
      })
    },
    deleteMaterialStart: startLoading,
    deleteMaterialFailed: loadingFailed,
    deleteMaterialSuccess: (state: MaterialState, action: PayloadAction<string>): void => {
      const id = action.payload
      state.isLoading = false
      state.materials = state.materials.filter((material) => material.id !== id)
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

export const updateMaterial = (id: string, info: MaterialInfo): AppThunk => async (dispatch) => {
  try {
    dispatch(updateMaterialStart())
    const material = await api.updateMaterial(id, info)
    dispatch(updateMaterialSuccess(material))
  } catch (err) {
    dispatch(updateMaterialFailed(err.toString()))
  }
}

export const deleteMaterial = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteMaterialStart())
    const deletedId = await api.deleteMaterial(id)
    dispatch(deleteMaterialSuccess(deletedId))
  } catch (err) {
    dispatch(deleteMaterialFailed(err.toString()))
  }
}

export const {
  addMaterialStart,
  addMaterialFailed,
  addMaterialSuccess,
  updateMaterialStart,
  updateMaterialFailed,
  updateMaterialSuccess,
  deleteMaterialStart,
  deleteMaterialFailed,
  deleteMaterialSuccess,
} = materialSlice.actions

export default materialSlice
