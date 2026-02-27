'use client';
import { useAlert } from '@/contexts/alertContext';
import { deleteExportUsers, downloadExportUsers } from '@/services/clients/user.client.service';
import { JobExportUser } from '@/types/common';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ExportAcction({ row }: { row: JobExportUser }) {
  const { addAlert } = useAlert();
  const router = useRouter();
  const handleDowload = async () => {
    const res = await downloadExportUsers(row.file_path);
    const url = window.URL.createObjectURL(new Blob([res.data]));

    const a = document.createElement('a');
    a.setAttribute('download', row.file_path);
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const deleteExport = async () => {
    try {
      const confirm = window.confirm('Are u sure');
      if (confirm) {
        const res = await deleteExportUsers(row.id);
        addAlert({ message: res.data.message });
        router.refresh();
      }
    } catch (error) {
      addAlert({ message: error.response.data.message, variant: 'error' });
    }
  };
  return (
    <div>
      {row.status === 'Complete' && (
        <button
          onClick={() => handleDowload()}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg"
        >
          Download
        </button>
      )}
      {row.status !== 'Running' && (
        <button
          onClick={() => deleteExport()}
          className="mx-2 px-3 py-1 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      )}
    </div>
  );
}
