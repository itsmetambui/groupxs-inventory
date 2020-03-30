import { Material } from "../reducers/material/materialSlice"
import { sleep } from "./utils"
import { v4 as uuidv4 } from "uuid"

export const addMaterial = async (material: Material) => {
  await sleep(1000)
  return {
    id: uuidv4(),
    ...material,
  }
}
