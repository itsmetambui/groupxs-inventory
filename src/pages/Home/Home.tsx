import React from "react"
import { useDispatch } from "react-redux"

import { addMaterial, MaterialInfo } from "../../reducers/material/materialSlice"
import MaterialTable from "../../components/MaterialTable/MaterialTable"
import MaterialForm from "../../components/MaterialForm/MaterialForm"

const Home: React.FC = () => {
  const dispatch = useDispatch()

  const onAddSubmit = ({ type, price, unit, barCode }: MaterialInfo) => {
    const materialInfo: MaterialInfo = { price: price, type: type, unit: unit, barCode: barCode }
    dispatch(addMaterial(materialInfo))
  }

  return (
    <div className="p-4">
      <h1>GroupXS inventory</h1>
      <div>
        <h2>Available materials</h2>
        <MaterialTable />
      </div>

      <div>
        <MaterialForm<MaterialInfo> onSubmit={onAddSubmit} />
      </div>
    </div>
  )
}

export default Home
