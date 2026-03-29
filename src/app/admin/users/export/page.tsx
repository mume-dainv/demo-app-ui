import { getExportUsers } from '@/services/apis/user.api.service';
import { JobExportUser } from '@/types/common';
import React from 'react';
import ExportAcction from './exportAcction';
import ExportHeader from './exportHeader';
import Pagination from '@/components/UI/paginate';

export default async function Export({
  searchParams,
}: {
  searchParams: { file_path: string; page: string; limit: string };
}) {
  console.log(searchParams);

  const query = new URLSearchParams();
  query.set('file_path', searchParams.file_path || '');
  query.set('page', searchParams.page || '1');
  query.set('limit', searchParams.limit || '10');
  const exports = await getExportUsers(query.toString());
  const data = exports.data.data as JobExportUser[];
  const statusColor = {
    Running: 'bg-yellow-100 text-yellow-700',
    Complete: 'bg-green-100 text-green-700',
    Fail: 'bg-red-100 text-red-700',
  };
  return (
    <div>
      <ExportHeader />
      {data.map((row) => (
        <div
          key={row.id}
          className="border rounded-xl p-4 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{row.file_path}</p>

            <p className="text-xs text-gray-400 mt-1">Created at: {row.created_at}</p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[row.status]}`}
            >
              {row.status}
            </span>

            <ExportAcction row={row} />
          </div>
        </div>
      ))}
      <Pagination currentPage={exports.data.current_page} lastPage={exports.data.last_page} />
    </div>
  );
}
