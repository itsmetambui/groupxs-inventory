import { InventorySelectorReturnType } from "../../reducers/inventory/inventorySlice"

export enum ACTION_TYPE {
  SHOW_CHECKOUT_FORM,
  HIDE_CHECKOUT_FORM,
}

type InventoryTableState = {
  displayCheckoutFormMap: { [key: string]: boolean }
  selectedInventoryRecord: InventorySelectorReturnType | undefined
}

export const initialState: InventoryTableState = {
  displayCheckoutFormMap: {},
  selectedInventoryRecord: undefined,
}

export default function reducer(
  state: InventoryTableState,
  action: { type: ACTION_TYPE; payload?: InventorySelectorReturnType },
): InventoryTableState {
  switch (action.type) {
    case ACTION_TYPE.SHOW_CHECKOUT_FORM:
      return {
        ...state,
        displayCheckoutFormMap: {
          ...state.displayCheckoutFormMap,
          [action.payload!.id]: true,
        },
        selectedInventoryRecord: action.payload,
      }
    case ACTION_TYPE.HIDE_CHECKOUT_FORM:
      return {
        ...state,
        displayCheckoutFormMap: {
          ...state.displayCheckoutFormMap,
          [action.payload!.id]: false,
        },
        selectedInventoryRecord: undefined,
      }
    default:
      throw new Error()
  }
}
