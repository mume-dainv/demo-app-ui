'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  currentPage: number;
  lastPage: number;
  onChange?: (page: number) => void;
};

export default function Pagination({ currentPage, lastPage, onChange }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pages: number[] = [];

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    if (onChange) return onChange(page);

    router.push(`?${params}`);
  };

  const baseBtn = 'px-3 py-1.5 rounded-md border text-sm transition-all duration-150';

  const normalBtn = 'border-gray-300 hover:bg-gray-100 active:scale-95';

  const activeBtn = 'bg-blue-600 text-white border-blue-600 shadow-sm';

  const disabledBtn = 'opacity-40 cursor-not-allowed';

  return (
    <div className="flex items-center gap-2 select-none">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className={`${baseBtn} ${normalBtn} ${currentPage === 1 && disabledBtn}`}
      >
        Prev
      </button>

      {/* First */}
      {start > 1 && (
        <>
          <button onClick={() => changePage(1)} className={`${baseBtn} ${normalBtn}`}>
            1
          </button>

          {start > 2 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`${baseBtn} ${page === currentPage ? activeBtn : normalBtn}`}
        >
          {page}
        </button>
      ))}

      {/* Last */}
      {end < lastPage && (
        <>
          {end < lastPage - 1 && <span className="px-1 text-gray-400">...</span>}

          <button onClick={() => changePage(lastPage)} className={`${baseBtn} ${normalBtn}`}>
            {lastPage}
          </button>
        </>
      )}

      {/* Next */}
      <button
        disabled={currentPage === lastPage}
        onClick={() => changePage(currentPage + 1)}
        className={`${baseBtn} ${normalBtn} ${currentPage === lastPage && disabledBtn}`}
      >
        Next
      </button>
    </div>
  );
}
