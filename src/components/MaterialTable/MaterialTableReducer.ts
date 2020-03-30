import { Material } from "../../reducers/material/materialSlice"

export enum ACTION_TYPE {
  UPDATE_MATERIAL,
  CLOSE_UPDATE_MODAL,
  SHOW_CHECKING_FORM,
  HIDE_CHECKING_FORM,
}

type MaterialTableState = {
  isUpdateModalOpen: boolean
  displayCheckinFormMap: { [key: string]: boolean }
  selectedMaterial: Material | undefined
}

export const initialState: MaterialTableState = {
  isUpdateModalOpen: false,
  displayCheckinFormMap: {},
  selectedMaterial: undefined,
}

export default function reducer(state: MaterialTableState, action: { type: ACTION_TYPE; payload?: Material }): MaterialTableState {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_MATERIAL:
      return {
        ...state,
        isUpdateModalOpen: true,
        selectedMaterial: action.payload,
      }
    case ACTION_TYPE.SHOW_CHECKING_FORM:
      return {
        ...state,
        displayCheckinFormMap: {
          ...state.displayCheckinFormMap,
          [action.payload!.id]: true,
        },
        selectedMaterial: action.payload,
      }
    case ACTION_TYPE.CLOSE_UPDATE_MODAL:
      return {
        ...state,
        isUpdateModalOpen: false,
        selectedMaterial: undefined,
      }
    case ACTION_TYPE.HIDE_CHECKING_FORM:
      return {
        ...state,
        displayCheckinFormMap: {
          ...state.displayCheckinFormMap,
          [action.payload!.id]: false,
        },
        selectedMaterial: undefined,
      }
    default:
      throw new Error()
  }
}
