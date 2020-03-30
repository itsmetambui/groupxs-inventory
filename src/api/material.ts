import { MaterialInfo } from "../reducers/material/materialSlice"
import { sleep } from "./utils"
import { v4 as uuidv4 } from "uuid"

export const addMaterial = async (material: MaterialInfo) => {
  await sleep(1000)
  return {
    id: uuidv4(),
    ...material,
  }
}

export const updateMaterial = async (id: string, material: MaterialInfo) => {
  await sleep(1000)
  return {
    id,
    ...material,
  }
}

export const deleteMaterial = async (id: string) => {
  await sleep(1000)
  return id
}
