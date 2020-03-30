import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"

import { addMaterial, MaterialInfo } from "../../reducers/material/materialSlice"
import MaterialTable from "../../components/MaterialTable/MaterialTable"
import InventoryTable from "../../components/InventoryTable/InventoryTable"
import MaterialForm from "../../components/MaterialForm/MaterialForm"

const Home: React.FC = () => {
  const [isAddMaterialModalOpen, setIsAddMaterialModalOpen] = useState(false)
  const dispatch = useDispatch()

  const onAddSubmit = ({ type, price, unit, barCode }: MaterialInfo) => {
    const materialInfo: MaterialInfo = { price: price, type: type, unit: unit, barCode: barCode }
    dispatch(addMaterial(materialInfo))
    setIsAddMaterialModalOpen(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl text-blue-500">GroupXS inventory</h1>
      <div>
        <div className="flex flex-row justify-between items-align">
          <h2 className="text-xl text-blue-500">Available materials</h2>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setIsAddMaterialModalOpen(true)}></Button>
        </div>
        <MaterialTable />
      </div>
      <div>
        <h2 className="text-xl text-blue-500">Available materials</h2>
        <InventoryTable />
      </div>

      <Modal
        visible={isAddMaterialModalOpen}
        closable
        maskClosable
        footer={null}
        style={{ maxWidth: 450 }}
        onCancel={() => setIsAddMaterialModalOpen(false)}
      >
        <MaterialForm onSubmit={onAddSubmit} />
      </Modal>
    </div>
  )
}

export default Home
