"use client"

import InputForm from "@/components/InputForm";
import { useUser } from "@/contexts/userContext"
import { ProfileSchema } from "@/lib/validations/profile.schema";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Profile() {

    const {user} = useUser();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<any>({resolver: zodResolver(ProfileSchema)})

    return (
        <main>
           <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold">User Profile</h2>

            <div className="space-y-4">
                {/* Name */}
                <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    {...register('name')} 
                />
                </div>

                {/* Email */}
                <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                    type="email" 
                    disabled
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
                </div>

                <InputForm register={register('name')} error={errors.name}/>
            </div>

            <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
        Update Profile
      </button>
    </div>
        </main>
    )
}
