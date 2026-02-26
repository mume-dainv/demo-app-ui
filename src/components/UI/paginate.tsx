'use client';

type Props = {
  currentPage: number;
  lastPage: number;
  onChange: Function;
};

export default function Pagination({ currentPage, lastPage, onChange }: Props) {
  const pages = [];

  // hiển thị 5 page quanh current
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(lastPage, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return (
    <div className="flex gap-2 items-center">
      {/* Prev */}
      <button disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Prev
      </button>

      {/* First */}
      {start > 1 && (
        <>
          <button onClick={() => onChange(1)}>1</button>
          {start > 2 && <span>...</span>}
        </>
      )}

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={page === currentPage ? 'font-bold' : ''}
        >
          {page}
        </button>
      ))}

      {/* Last */}
      {end < lastPage && (
        <>
          {end < lastPage - 1 && <span>...</span>}
          <button onClick={() => onChange(lastPage)}>{lastPage}</button>
        </>
      )}

      {/* Next */}
      <button disabled={currentPage === lastPage} onClick={() => onChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
