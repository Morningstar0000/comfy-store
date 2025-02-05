import React from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

function Pagination() {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  // Generate page numbers
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const { search, pathname } = useLocation(); // Correct 'pathName' to 'pathname'
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    console.log(pageNumber);
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber); // Add or update the 'page' query parameter
    navigate(`${pathname}?${searchParams.toString()}`); // Corrected `.toString()` call
  };

  if (pageCount < 2) return null; // Hide pagination if there's only one page

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        {/* Prev Button */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            const prevPage = page > 1 ? page - 1 : pageCount; // Loop back to the last page if on the first
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>

        {/* Page Number Buttons */}
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === page ? 'bg-base-300 border-base-300' : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            const nextPage = page < pageCount ? page + 1 : 1; // Loop back to the first page if on the last
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
