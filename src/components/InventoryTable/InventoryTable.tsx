import React, { useReducer } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Table, Button } from "antd"

import { AppState } from "../../reducers/rootReducer"
import { inventorySelector, InventorySelectorReturnType, checkoutInventory, InventoryParam } from "../../reducers/inventory/inventorySlice"
import StockForm from "../StockForm/StockForm"
import reducer, { ACTION_TYPE, initialState } from "./InventoryTableReducer"

const InventoryTable: React.FC = () => {
  const inventory = inventorySelector(useSelector((state: AppState) => state))
  const [{ displayCheckoutFormMap, selectedInventoryRecord }, localDispatch] = useReducer(reducer, initialState)
  const globalDispatch = useDispatch()

  const onCheckoutSubmit = ({ stock }: InventoryParam) => {
    localDispatch({ type: ACTION_TYPE.HIDE_CHECKOUT_FORM, payload: selectedInventoryRecord })
    globalDispatch(checkoutInventory(selectedInventoryRecord!.id, stock))
  }

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Delivery time",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
    },
    {
      title: "Action",
      key: "action",
      width: 300,
      render: (text: string, record: InventorySelectorReturnType) => (
        <div className="flex flex-row flex-wrap -mx-1 justify-right">
          <span className="p-1">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                if (displayCheckoutFormMap[record.id]) {
                  localDispatch({ type: ACTION_TYPE.HIDE_CHECKOUT_FORM, payload: record })
                } else {
                  localDispatch({ type: ACTION_TYPE.SHOW_CHECKOUT_FORM, payload: record })
                }
              }}
            >
              {displayCheckoutFormMap[record.id] ? "Cancel" : "Checkout"}
            </Button>
          </span>
          {displayCheckoutFormMap[record.id] && <StockForm onSubmit={onCheckoutSubmit} />}
        </div>
      ),
    },
  ]

  return (
    <div>
      <Table columns={columns} dataSource={inventory} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  )
}

export default InventoryTable
