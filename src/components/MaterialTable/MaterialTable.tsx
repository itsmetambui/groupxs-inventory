import React, { useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Table, Button, Modal } from "antd"
import { AppState } from "../../reducers/rootReducer"
import MaterialForm from "../MaterialForm/MaterialForm"
import { Material, MaterialInfo, updateMaterial, deleteMaterial } from "../../reducers/material/materialSlice"

type MaterialTableState = {
  isUpdateModalOpen: boolean
  selectedMaterial: Material | undefined
}

const initialState: MaterialTableState = {
  isUpdateModalOpen: false,
  selectedMaterial: undefined,
}

function reducer(state: MaterialTableState, action: { type: string; payload?: Material }): MaterialTableState {
  switch (action.type) {
    case "UPDATE_MATERIAL":
      return {
        ...state,
        isUpdateModalOpen: true,
        selectedMaterial: action.payload,
      }
    case "CLOSE_UPDATE_MODAL":
      return {
        ...state,
        isUpdateModalOpen: false,
        selectedMaterial: undefined,
      }
    default:
      throw new Error()
  }
}

const MaterialTable: React.FC = () => {
  const materials = useSelector((state: AppState) => state.material.materials)
  const [{ isUpdateModalOpen, selectedMaterial }, localDispatch] = useReducer(reducer, initialState)
  const globalDispatch = useDispatch()

  const onUpdateSubmit = ({ type, price, unit, barCode }: Material) => {
    const materialInfo: MaterialInfo = { price: price, type: type, unit: unit, barCode: barCode }
    globalDispatch(updateMaterial(selectedMaterial!.id, materialInfo))
    localDispatch({ type: "CLOSE_UPDATE_MODAL" })
  }

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Barcode",
      dataIndex: "barCode",
      key: "barCode",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Material) => (
        <div className="flex flex-row flex-wrap -mx-1">
          <span className="p-1">
            <Button size="small" type="default" onClick={() => localDispatch({ type: "UPDATE_MATERIAL", payload: record })}>
              Update
            </Button>
          </span>
          <span className="p-1">
            <Button size="small" type="danger" onClick={() => globalDispatch(deleteMaterial(record.id))}>
              Delete
            </Button>
          </span>
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={materials} rowKey="id" />

      <Modal
        visible={isUpdateModalOpen}
        closable
        maskClosable
        footer={null}
        style={{ maxWidth: 450 }}
        onCancel={() => localDispatch({ type: "CLOSE_UPDATE_MODAL" })}
      >
        <MaterialForm onSubmit={onUpdateSubmit} defaultValue={selectedMaterial} />
      </Modal>
    </div>
  )
}

export default MaterialTable
