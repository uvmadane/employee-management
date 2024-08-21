import React from 'react';
import { Button } from '@mui/material';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    let buttons = [];
    const numButtons = 3; // Number of page buttons to show
    const start = Math.max(0, currentPage - Math.floor(numButtons / 2));
    const end = Math.min(totalPages, start + numButtons);

    for (let i = start; i < end; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-container">
      <Button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {renderPageButtons()}
      <Button
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
