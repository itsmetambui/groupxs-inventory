import { sleep } from "./utils"

export const checkinInventory = async (materialId: string, stock: number) => {
  await sleep(1000)
  return {
    id: materialId,
    stock,
  }
}

export const checkoutInventory = async (inventoryId: string) => {
  await sleep(1000)
  return inventoryId
}
