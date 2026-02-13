"use client"

import InputForm from "@/components/InputForm";
import { useUser } from "@/contexts/userContext"
import { ProfileSchema, Profile as ProfileType } from "@/lib/validations/profile.schema";
import { updateProfile } from "@/services/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { da } from "zod/v4/locales";

export default function Profile() {

    const {user, refreshUser} = useUser();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: "",
            avatar: undefined,
        }
    })

    const router = useRouter();
    
    const up: SubmitHandler<ProfileType> = async (data: ProfileType) => {
        try{
            const formData = new FormData();
            formData.append('name', data.name);
            if (data.avatar) { 
                formData.append('avatar', data.avatar);
            }
            const res = await updateProfile(formData);
            await refreshUser();
            router.replace('/');
        }catch(err){
            console.log(err);
    }}

    useEffect(() => {
        if (user) {
        reset({
      name: user.name,
    })
    }
    },[user])
    return (
        <main>
           <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-2xl font-semibold">User Profile</h2>
 
                <form onSubmit={handleSubmit(up)}>
                    <div className="space-y-4">
                {/* Name */} 
                <InputForm name="name" register={register('name')} error={errors.name}/>
                {/* Email */}
                <InputForm name="avatar" register={register('avatar')} error={errors.avatar} type='file'/>

            </div>

            <button
                className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                type="submit"
            >
        Update Profile
      </button>
                </form> 
    </div>
        </main>
    )
}
