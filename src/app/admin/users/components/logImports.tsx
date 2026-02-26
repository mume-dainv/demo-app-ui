'use client';
import { deleteLogImportUser, getLogImportUser } from '@/services/clients/user.client.service';
import React, { useEffect, useRef, useState } from 'react';
import LogMessage from './logMessage';
import { useAlert } from '@/contexts/alertContext';
import { ImportLogType } from '@/types/common';

export default function LogImport() {
  const [logImport, setLogImport] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const modalRef = useRef(null);

  const { addAlert } = useAlert();
  const [switchState, setSwitchState] = useState({
    case: 1,
    data: logImport,
  });

  const fetchLogImport = async () => {
    try {
      const res = await getLogImportUser();
      const data = res.data.data;
      setLogImport(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLogImport = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this log?');
    if (!confirm) return;
    try {
      const res = await deleteLogImportUser(id);
      addAlert({ message: res.data.message, variant: 'success' });
      fetchLogImport();
    } catch (error) {
      addAlert({ message: error.data.message, variant: 'error' });
    }
  };

  useEffect(() => {
    fetchLogImport();
  }, []);

  const statusStyles = {
    Complete: 'bg-blue-500',
    Running: 'bg-slate-500',
    Failed: 'bg-red-500',
  };

  return (
    <div className="border mt-2 shadow-lg">
      <div className="relative">
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="absolute top-4 left-4 border-spacing-10 rounded-full bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            {' '}
            &lt;-{' '}
          </button>
        )}

        <h1 className="border-b p-4 text-center text-2xl font-bold">Import Logs</h1>
        <button
          onClick={() => fetchLogImport()}
          className="absolute top-4 right-4 border-spacing-10 rounded-full bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          {' '}
          Refresh
        </button>
      </div>
      <div className="overflow-y-auto h-[40vh]">
        {messages.length > 0 ? (
          <LogMessage messages={messages} />
        ) : (
          logImport.map((log: ImportLogType) => (
            <div
              onClick={() => log.row_fail > 0 && setMessages(log.errors as [])}
              key={log.id}
              className="border-b p-4 cursor-pointer overflow-y-hidden flex flex-row items-center justify-between "
            >
              <div className="flex-1">
                <p>File Name: {log.file_name}</p>
                <div className="flex flex-row justify-between">
                  <p>Total row: {log.total_rows}</p>
                  <p className="text-red-500">Total row fail: {log.row_fail}</p>
                  <p className="text-blue-500">Total row success: {log.row_success}</p>
                  <p>
                    status:{' '}
                    <span className={`rounded-3xl p-2 text-white ${statusStyles[log.status]}`}>
                      {log.status}
                    </span>
                  </p>
                </div>
              </div>
              {log.status !== 'Running' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLogImport(log.id);
                  }}
                  className="bg-red-500 ml-5 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
