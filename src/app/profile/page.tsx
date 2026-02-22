'use client';

import FormInput from '@/components/form/formInput';
import UserLogging from '@/components/UI/userLogging';
import { useAlert } from '@/contexts/alertContext';
import { useUser } from '@/contexts/userContext';
import { ProfileSchema, ProfileType } from '@/lib/validations/user';
import { updateProfile } from '@/services/clients/user.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: '',
      avatar: undefined,
    },
  });

  const { user, refresh } = useUser();
  const { addAlert } = useAlert();

  const up: SubmitHandler<ProfileType> = async (data: ProfileType) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }
      await updateProfile(formData);
      await refresh();
    } catch (err) {
      addAlert(err.data.message ?? 'err...');
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
      });
    }
  }, [user]);
  return (
    <main>
      <div className="mx-auto mt-10 max-w-xl space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-semibold">User Profile</h2>

        <form onSubmit={handleSubmit(up)}>
          <div className="space-y-4">
            {/* Name */}
            <FormInput name="name" register={register('name')} error={errors.name} />
            {/* Email */}
            <FormInput
              name="avatar"
              register={register('avatar')}
              error={errors.avatar}
              type="file"
            />
          </div>

          <button
            className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            type="submit"
          >
            Update Profile
          </button>
        </form>
        {user?.user_logging && <UserLogging userLogging={user.user_logging} />}
      </div>
    </main>
  );
}
