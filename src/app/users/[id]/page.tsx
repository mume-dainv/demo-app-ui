'use client';
import FormInput from '@/components/form/formInput';
import { UserSchema, UserType } from '@/lib/validations/user';
import { createUser, getUser, updateUser, UpdateUser } from '@/services/clients/user.service';
import type { User } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function User({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<UserType>({
    resolver: zodResolver(UserSchema),
  });

  const submit: SubmitHandler<UserType> = async (data) => {
    if (Number(params.id)) {
      await updateUser(params.id, data);
    } else await createUser(data);
    router.replace('/users');
  };

  const getUserById = async () => {
    const res = await getUser(params.id);
    console.log(res.data);
    reset({
      name: res.data.data.user.name,
      email: res.data.data.user.email,
      role: res.data.data.user.role,
    });
  };

  useEffect(() => {
    if (Number(params.id)) {
      getUserById();
    }
  }, [params.id]);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="m-auto max-w-md space-y-4 rounded-xl border bg-white p-6 shadow"
    >
      <FormInput name="name" register={register('name')} error={errors.name} />

      <FormInput name="email" register={register('email')} error={errors.email} />

      <div>
        <label className="block text-sm font-medium">Role</label>
        <select {...register('role')} className="mt-1 w-full rounded border p-2">
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-black py-2 text-white disabled:opacity-50"
      >
        {params.id === 'create' ? 'Create User' : 'Update User'}
      </button>
    </form>
  );
}
