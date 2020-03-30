import React, { useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Table, Button, Modal } from "antd"

import { AppState } from "../../reducers/rootReducer"
import MaterialForm from "../MaterialForm/MaterialForm"
import CheckinForm from "../CheckinForm/CheckinForm"
import { Material, updateMaterial, deleteMaterial } from "../../reducers/material/materialSlice"
import { InventoryParam, checkinInventory } from "../../reducers/inventory/inventorySlice"

import reducer, { ACTION_TYPE, initialState } from "./MaterialTableReducer"

const MaterialTable: React.FC = () => {
  const materials = useSelector((state: AppState) => state.material.materials)
  const [{ isUpdateModalOpen, displayCheckinFormMap, selectedMaterial }, localDispatch] = useReducer(reducer, initialState)
  const globalDispatch = useDispatch()

  const onUpdateSubmit = (materialInfo: Material) => {
    globalDispatch(updateMaterial(selectedMaterial!.id, materialInfo))
    localDispatch({ type: ACTION_TYPE.CLOSE_UPDATE_MODAL })
  }

  const onCheckinSubmit = ({ stock }: InventoryParam) => {
    localDispatch({ type: ACTION_TYPE.HIDE_CHECKING_FORM, payload: selectedMaterial })
    globalDispatch(checkinInventory(selectedMaterial!.id, stock))
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
      width: 300,
      render: (text: string, record: Material) => (
        <div className="flex flex-row flex-wrap -mx-1 justify-right">
          <span className="p-1">
            <Button size="small" type="default" onClick={() => localDispatch({ type: ACTION_TYPE.UPDATE_MATERIAL, payload: record })}>
              Update
            </Button>
          </span>
          <span className="p-1">
            <Button size="small" type="danger" onClick={() => globalDispatch(deleteMaterial(record.id))}>
              Delete
            </Button>
          </span>
          <span className="p-1">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                if (displayCheckinFormMap[record.id]) {
                  localDispatch({ type: ACTION_TYPE.HIDE_CHECKING_FORM, payload: record })
                } else {
                  localDispatch({ type: ACTION_TYPE.SHOW_CHECKING_FORM, payload: record })
                }
              }}
            >
              {displayCheckinFormMap[record.id] ? "Cancel" : "Checkin"}
            </Button>
          </span>
          {displayCheckinFormMap[record.id] && <CheckinForm onSubmit={onCheckinSubmit} />}
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={materials} rowKey="id" pagination={{ pageSize: 10 }} />

      <Modal
        visible={isUpdateModalOpen}
        closable
        maskClosable
        footer={null}
        style={{ maxWidth: 450 }}
        onCancel={() => localDispatch({ type: ACTION_TYPE.CLOSE_UPDATE_MODAL })}
      >
        <MaterialForm onSubmit={onUpdateSubmit} defaultValue={selectedMaterial} />
      </Modal>

      <Modal
        visible={isUpdateModalOpen}
        closable
        maskClosable
        footer={null}
        style={{ maxWidth: 450 }}
        onCancel={() => localDispatch({ type: ACTION_TYPE.CLOSE_UPDATE_MODAL })}
      >
        <MaterialForm onSubmit={onUpdateSubmit} defaultValue={selectedMaterial} />
      </Modal>
    </div>
  )
}

export default MaterialTable
