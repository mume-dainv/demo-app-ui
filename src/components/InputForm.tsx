"use client";

import { FieldError } from "react-hook-form";

export default function InputForm({name,error, register}:{name: string, error: FieldError, register: object}) {


    return (
        <div>
                <label className="block text-sm text-gray-600 mb-1">{name}</label>
                <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    {...register} 
                />
                { error && <p className="text-red-600">{error.message}</p> }
        </div>
    )
}
