"use client";

import { FieldError, RegisterOptions, useFormContext, UseFormRegister } from "react-hook-form";

export default function InputForm({name, register, error, ...props} : {name: string, register?: any, error?: any, props?: object}) { 
    return (
        <div>
                <label className="block text-sm text-gray-600 mb-1">{name}</label>
                <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    {...register}
                    {...props}
                />
                { error && <p className="text-red-600">{ error.message as string }</p> }
        </div>
    )
}
