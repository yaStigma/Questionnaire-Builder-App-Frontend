import { useState } from "react";
import CSS from "./Pagination.module.css";
export default function Pagination({ quiz, onPageChange }) {
  const perPage = 6;
  const totalPages = Math.ceil(quiz.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const start = (page - 1) * perPage;
      const end = page * perPage;
      onPageChange(quiz.slice(start, end));
    }
  };
  const getVisiblePageNumbers = () => {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div className={CSS.paginationWrapper}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={CSS.btn}
      >
        <img src="/arrow-left.svg" alt="arrow-left icon" className={CSS.icon} />
      </button>

      {getVisiblePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${CSS.btn} ${page === currentPage ? CSS.active : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={CSS.btn}
      >
        <img
          src="/arrow-right.svg"
          alt="arrow-right icon"
          className={CSS.icon}
        />
      </button>
    </div>
  );
}
