import React from "react"
import { useForm, OnSubmit } from "react-hook-form"

type MaterialFormProps<T> = {
  onSubmit: OnSubmit<T>
}

export default function MaterialForm<T>({ onSubmit }: MaterialFormProps<T>) {
  const { register, handleSubmit } = useForm<T>()

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="type">
            Type
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            name="type"
            type="text"
            ref={register({ required: true, maxLength: 20 })}
          />
        </div>
      </div>

      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="unit">
            Unit
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            name="unit"
            type="text"
            ref={register({ required: true, maxLength: 10 })}
          />
        </div>
      </div>

      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="price">
            Price
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            name="price"
            type="number"
            ref={register({ required: true, min: 0 })}
          />
        </div>
      </div>

      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label className="block pr-4 mb-1 font-medium text-gray-700 md:text-right md:mb-0" htmlFor="barCode">
            Barcode
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
            name="barCode"
            type="text"
            ref={register({ required: true, maxLength: 30 })}
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
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
