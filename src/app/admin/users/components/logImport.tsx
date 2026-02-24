'use client';
import { deleteLogImportUser, getLogImportUser } from '@/services/clients/user.client.service';
import React, { useEffect, useRef, useState } from 'react';
import LogMessage from './logMessage';
import { useAlert } from '@/contexts/alertContext';

export default function LogImport({ closeModal }: { closeModal: () => void }) {
  const [logImport, setLogImport] = useState<[]>([]);
  const [messages, setMessages] = useState<[]>([]);
  const modalRef = useRef(null);

  const { addAlert } = useAlert();

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
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={modalRef}
      className="absolute left-1/2 flex flex-col top-1/2 transform bg-white -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 shadow-2xl text-black"
    >
      <div>
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
          className="absolute top-4 right-4 border-spacing-10 rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-600"
          onClick={() => closeModal()}
        >
          x
        </button>
      </div>
      <div className="overflow-auto">
        {logImport &&
          (messages.length > 0 ? (
            <LogMessage messages={messages} />
          ) : (
            logImport.map((log) => (
              <div
                onClick={() => setMessages(log.messages)}
                key={log.id}
                className="border-b p-4 cursor-pointer overflow-y-hidden flex flex-row items-center justify-between"
              >
                <p>File Name: {log.file_name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLogImport(log.id);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}
