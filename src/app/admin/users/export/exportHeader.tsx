'use client';
import SearchBar from '@/components/UI/srearchParam';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ExportHeader() {
  const router = useRouter();
  return (
    <div className="flex justify-between my-2">
      <div className="flex-1">
        <SearchBar search="file_path" />
      </div>
      <button
        onClick={() => router.refresh()}
        className="bg-blue-500 text-white rounded-xl ml-3 p-1"
      >
        Refresh
      </button>
    </div>
  );
}
