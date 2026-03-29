'use client';
import { useAlert } from '@/contexts/alertContext';
import { exportUsers } from '@/services/clients/user.client.service';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

export default function UserAcction() {
  const params = useSearchParams();
  const a = new URLSearchParams(params.toString());
  const { addAlert } = useAlert();
  if (a.get('page')) {
    a.delete('page');
  }
  if (a.get('limit')) {
    a.delete('limit');
  }
  const handleExportUser = async () => {
    try {
      const res = await exportUsers(a.toString());
      addAlert({ message: res.data.message });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row justify-between">
      <Link
        href={`/admin/users/create`}
        className="rounded bg-blue-500 p-2 px-3 text-white hover:bg-blue-600"
      >
        Create
      </Link>
      <button
        onClick={handleExportUser}
        className="mr-2 rounded bg-blue-500 p-2 px-3 text-white hover:bg-blue-600"
      >
        Export
      </button>
      <Link href="/admin/users/export">Export file</Link>
    </div>
  );
}
