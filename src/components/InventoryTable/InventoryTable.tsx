import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Table, Button } from "antd"

import { AppState } from "../../reducers/rootReducer"
import { inventorySelector, InventorySelectorReturnType } from "../../reducers/inventory/inventorySlice"

const MaterialTable: React.FC = () => {
  const inventory = inventorySelector(useSelector((state: AppState) => state))
  // const globalDispatch = useDispatch()

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
            <Button size="small" type="default">
              Update
            </Button>
          </span>
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

export default MaterialTable
