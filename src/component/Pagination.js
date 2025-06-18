import React from "react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange = () => {},
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        aria-label="Go to previous page"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-full border border-slate-300 py-2 px-3 text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-white  focus:text-white  focus:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          aria-label={`Go to page ${page}`}
          onClick={() => handlePageChange(page)}
          className={`min-w-9 rounded-full py-2 px-3.5 border text-sm transition-all shadow-sm ml-1 ${
            currentPage === page
              ? "bg-slate-800 text-white border-transparent shadow-md"
              : "border-slate-300 text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        aria-label="Go to next page"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full border border-slate-300 py-2 px-3 text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-white hover:border-slate-800 focus:text-white  focus:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Next
      </button>
    </div>
  );
}
