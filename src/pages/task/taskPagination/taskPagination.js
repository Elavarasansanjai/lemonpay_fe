import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./TaskPagination.css";

const TaskPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination-container">
      {/* Mobile Pagination */}
      <div className="pagination-mobile">
        <button
          className="pagination-btn prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        <span className="page-info">{currentPage}</span>

        <button
          className="pagination-btn next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      {/* Desktop Pagination */}
      <div className="pagination-desktop">
        <button
          className="pagination-btn prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            className={`pagination-page ${
              page === currentPage ? "active" : ""
            } ${page === "..." ? "dots" : ""}`}
            onClick={() => handlePageClick(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-btn next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskPagination;
