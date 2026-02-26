'use client';
import { useAlert } from '@/contexts/alertContext';
import { deleteUser } from '@/services/clients/user.client.service';
import { User } from '@/types/common';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function userCard({ user }: { user: User }) {
  const { addAlert } = useAlert();
  const router = useRouter();
  const handleDeleteUser = async (id: string) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this user?');
      if (!confirm) return;
      const res = await deleteUser(id);
      addAlert({ message: res.data.message, variant: 'success' });
      router.refresh();
    } catch (error) {
      addAlert({ message: error.data.message, variant: 'error' });
    }
  };
  return (
    <tr key={user.id} className="border-t transition hover:bg-gray-50">
      <td className="px-4 py-2">
        {user.avatar_url ? (
          <img className="size-10 rounded-full object-cover" src={user.avatar_url} />
        ) : (
          <div className="size-10 rounded-full bg-gray-300" />
        )}
      </td>

      <td className="px-4 py-2 font-medium">{user.name}</td>

      <td className="px-4 py-2 text-gray-600">{user.email}</td>

      <td className="space-x-2 px-4 py-2 text-center">
        <Link
          href={`/admin/users/${user.id}`}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          Edit
        </Link>

        <button
          onClick={() => handleDeleteUser(user.id as string)}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
