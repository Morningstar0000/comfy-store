import React from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

function ComplexPagination() {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation(); // Corrected 'pathName' to 'pathname'
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`); 
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300 ' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // First button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // Dots for skipped pages (if applicable)
    if (page > 2)
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md border-none join-item" key="dots-1">
          ...
        </button>
      );

    // Current page (if it's not the first or last)
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true })); // Corrected typo from `addPageButtons` to `addPageButton`
    }

    // Dots for skipped pages (if applicable)
    if (page < pageCount - 1)
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md border-none join-item" key="dots-2">
          ...
        </button>
      );

    // Last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ComplexPagination;
