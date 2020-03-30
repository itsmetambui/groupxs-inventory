import React, { useEffect } from "react"
import { useForm, OnSubmit } from "react-hook-form"
import { Material } from "../../reducers/material/materialSlice"

type MaterialFormProps = {
  onSubmit: OnSubmit<Material>
  defaultValue?: Material
}

export default function MaterialForm({ onSubmit, defaultValue }: MaterialFormProps) {
  const { register, handleSubmit, setValue } = useForm<Material>()

  useEffect(() => {
    setValue("type", defaultValue?.type)
    setValue("unit", defaultValue?.unit)
    setValue("price", defaultValue?.price)
    setValue("barCode", defaultValue?.barCode)
  }, [defaultValue, setValue])

  return (
    <form className="w-full max-w-sm pt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/4">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="type">
            Type
          </label>
        </div>
        <div className="md:w-3/4">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            name="type"
            type="text"
            defaultValue={defaultValue ? defaultValue.type : ""}
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
      </div>

      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/4">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="unit">
            Unit
          </label>
        </div>
        <div className="md:w-3/4">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            name="unit"
            type="text"
            defaultValue={defaultValue ? defaultValue.unit : ""}
            ref={register({ required: true, maxLength: 10 })}
          />
        </div>
      </div>

      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/4">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="price">
            Price
          </label>
        </div>
        <div className="md:w-3/4">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            name="price"
            type="number"
            defaultValue={defaultValue ? defaultValue.price : ""}
            ref={register({ required: true, min: 0 })}
          />
        </div>
      </div>

      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/4">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="barCode">
            Barcode
          </label>
        </div>
        <div className="md:w-3/4">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
            name="barCode"
            type="text"
            defaultValue={defaultValue ? defaultValue.barCode : ""}
            ref={register({ required: true, maxLength: 30 })}
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/4"></div>
        <div className="md:w-3/4">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
