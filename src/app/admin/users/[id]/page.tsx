'use client';
import FormInput from '@/components/form/formInput';
import { useAlert } from '@/contexts/alertContext';
import { ImportUserSchema, ImportUserType, UserSchema, UserType } from '@/lib/validations/user';
import {
  createUser,
  getUser,
  importUser,
  updateUser,
} from '@/services/clients/user.client.service';
import type { User } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import LogImport from '../components/logImports';
import { convertError } from '@/helpers/converError';

export default function User({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    register,
    reset,
  } = useForm<UserType>({
    resolver: zodResolver(UserSchema),
  });
  const importForm = useForm<ImportUserType>({
    resolver: zodResolver(ImportUserSchema) as any,
  });

  const { addAlert } = useAlert();
  const [logModalOpen, setLogModalOpen] = useState(false);
  const submit: SubmitHandler<UserType> = async (data) => {
    try {
      if (Number(params.id)) {
        await updateUser(params.id, data);
      } else await createUser(data);
      router.push('/admin/users');
    } catch (error) {
      if (error.status === 422) {
        const convert = convertError(error.response.data.errors, ['name', 'email', 'role']);
        Object.entries(convert).forEach(([key, value]) => {
          setError(key as any, { message: value });
        });
      } else addAlert({ message: error.response.data.message, variant: 'error' });
    }
  };

  const getUserById = async () => {
    const res = await getUser(params.id);
    reset({
      name: res.data.data.user.name,
      email: res.data.data.user.email,
      role: res.data.data.user.role,
    });
  };

  const handleImportUser = async (data: ImportUserType) => {
    try {
      const formData = new FormData();
      formData.append('users', data.users);
      const res = await importUser(formData as any);
      router.replace('/admin/users');
      addAlert({ message: res.data.message, variant: 'success' });
    } catch (error) {
      addAlert({ message: error.data.message, variant: 'error' });
    }
  };

  useEffect(() => {
    if (Number(params.id)) {
      getUserById();
    }
  }, [params.id]);
  return (
    <div>
      <div className="m-auto max-w-md space-y-4 mt-12 rounded-xl border bg-white p-6 shadow">
        <form onSubmit={handleSubmit(submit)}>
          <FormInput name="name" register={register('name')} error={errors.name} />

          <FormInput
            name="email"
            disabled={Number(params.id) ? true : false}
            register={register('email')}
            error={errors.email}
          />

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
            className="w-full rounded mt-3 bg-black py-2 text-white disabled:opacity-50"
          >
            {params.id === 'create' ? 'Create User' : 'Update User'}
          </button>
        </form>
        {!Number(params.id) && (
          <div className="flex flex-col items-start justify-center">
            <form onSubmit={importForm.handleSubmit(handleImportUser)}>
              <label className="block text-sm font-medium">Import</label>
              <div className="flex items-center ">
                <input {...importForm.register('users')} className="w-3/5" type="file" />
                <button
                  type="submit"
                  className="flex-1 rounded bg-black py-2 text-white disabled:opacity-50"
                >
                  Import
                </button>
              </div>
              {importForm.formState.errors.users && (
                <p className="text-red-600">{importForm.formState.errors.users.message}</p>
              )}
            </form>
          </div>
        )}
      </div>
      <div>
        <LogImport />
      </div>
    </div>
  );
}
