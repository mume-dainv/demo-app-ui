"use client"

import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Auth, AuthSchema } from '@/lib/validations/auth.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import InputForm from "@/components/InputForm";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Auth>({resolver: zodResolver(AuthSchema)})
  const {user} = useUser();
  const router = useRouter();
  const {refreshUser} = useUser() 

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<Auth> = async (data) => {
    try {
      const res = await login(data);
      await refreshUser();
      
      router.replace('/');
    } catch(err) {
      alert(err)
    }
    
  };
   
  useEffect(() => {
     if(user){
        router.replace('/');
     }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
          <InputForm name='email' register={register('email')} error={errors.email}/>
          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-lg border px-3 py-2 focus:border-black focus:outline-none"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-xs text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              { errors.password && <p className="text-red-600">{errors.password.message}</p> }
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
