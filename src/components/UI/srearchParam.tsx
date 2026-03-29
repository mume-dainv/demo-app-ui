'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({
  search,
  limit,
  placehodlder,
}: {
  search: string;
  limit?: number;
  placehodlder?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState('');

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    newParams.set(key, value);
    newParams.set('page', '1'); // reset page

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex gap-3">
      <input
        className="border rounded-lg px-3 py-2 w-full"
        placeholder={placehodlder || 'Search by name'}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && updateQuery(search, keyword)}
      />

      <select
        value={limit}
        onChange={(e) => updateQuery('limit', e.target.value)}
        className="border rounded-lg px-3"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
}
