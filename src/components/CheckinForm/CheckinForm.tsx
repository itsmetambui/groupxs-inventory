import React from "react"
import { useForm, OnSubmit } from "react-hook-form"
import { InventoryParam } from "../../reducers/inventory/inventorySlice"
import { Button } from "antd"

type CheckinFormProps = {
  onSubmit: OnSubmit<InventoryParam>
}

export default function MaterialForm({ onSubmit }: CheckinFormProps) {
  const { register, handleSubmit } = useForm<InventoryParam>()

  return (
    <div className="flex flex-row flex-wrap items-center">
      <input
        className="w-24 px-4 leading-tight text-gray-700 bg-gray-200 border-gray-200 rounded appearance-none border-1 focus:outline-none focus:bg-white focus:border-blue-500"
        name="stock"
        type="number"
        defaultValue={1}
        ref={register({ required: true, min: 1 })}
      />

      <Button type="primary" size="small" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </div>
  )
}
