"use client"

import InputForm from "@/components/InputForm";
import { useUser } from "@/contexts/userContext"
import { Profile, ProfileSchema } from "@/lib/validations/profile.schema";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export default function Profile() {

    const {user} = useUser();
    const method = useForm<Profile>({resolver: zodResolver(ProfileSchema)})
      
    return (
        <main>
           <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold">User Profile</h2>

            <FormProvider {...method}>
                <form>
                    <div className="space-y-4">
                {/* Name */} 
                <InputForm name="name" />
                {/* Email */}
                <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                    type="email" 
                    disabled
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
                </div>

            </div>

            <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
        Update Profile
      </button>
                </form>
            </FormProvider>
    </div>
        </main>
    )
}
