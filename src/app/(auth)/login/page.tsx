"use client";

import FormInput from "@/components/form/formInput";
import { useAlert } from "@/contexts/alertContext";
import { useUser } from "@/contexts/userContext";
import { AuthSchema, AuthValue } from "@/lib/validations/auth";
import { login } from "@/services/clients/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValue>({
    resolver: zodResolver(AuthSchema),
  });
  const router = useRouter();

  const { addAlert } = useAlert();
  const { user, refresh } = useUser();

  const handleLogin = async (auth: AuthValue) => {
    try {
      await login(auth);
      await refresh();
      router.replace("/");
    } catch (error) {
      addAlert({
        variant: "error",
        message: error.response.data.message || "Error...",
      });
    }
  };

  useEffect(() => {
    user && router.back();
  });
  return (
    <div className="flex h-screen max-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <FormInput
            name="email"
            register={register("email")}
            error={errors.email}
          />
          <FormInput
            name="password"
            register={register("password")}
            error={errors.password}
            type="password"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black py-2 text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
