// src/components/PaginationControls.js
import React from 'react';
import './PaginationControls.css';

const PaginationControls = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages } = pagination;

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

  if (totalPages <= 1) {
    return null; // Don't render controls if there's only one page
  }

  return (
    <div className="pagination-controls">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        &laquo; Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next &raquo;
      </button>
    </div>
  );
};

export default PaginationControls;