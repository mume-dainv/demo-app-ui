"use client";

import { FieldError, useFormContext } from "react-hook-form";

export default function InputForm({name }:{name: string }) {
    const {
    register,
    formState: { errors },
  } = useFormContext();
    
    return (
        <div>
                <label className="block text-sm text-gray-600 mb-1">{name}</label>
                <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    {...register(name)} 
                />
                { errors[name] && <p className="text-red-600">{ errors[name]?.message as string }</p> }
        </div>
    )
}
