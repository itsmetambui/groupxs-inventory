import React from "react"
import { useSelector } from "react-redux"
import { Table } from "antd"

import { AppState } from "../../reducers/rootReducer"

type MaterialTableProps = {}

const MaterialTable: React.FC<MaterialTableProps> = () => {
  const materials = useSelector((state: AppState) => state.material.materials)
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
  ]
  return <Table columns={columns} dataSource={materials} rowKey="id" />
}

export default MaterialTable
