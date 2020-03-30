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
      state.materials.push(action.payload)
    },
    updateMaterialStart: startLoading,
    updateMaterialFailed: loadingFailed,
    updateMaterialSuccess: (state: MaterialState, action: PayloadAction<Material>): void => {
      state.materials = state.materials.map((material) => {
        if (material.id === action.payload.id) return action.payload
        else return material
      })
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

export const {
  addMaterialStart,
  addMaterialFailed,
  addMaterialSuccess,
  updateMaterialStart,
  updateMaterialFailed,
  updateMaterialSuccess,
} = materialSlice.actions

export default materialSlice
