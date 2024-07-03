import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/16/solid';
import React from 'react';

type TPaginationProps = { currentPage:number, total:number, perPage:number, onPageChange:(page:number)=>void }

const Pagination = ({ currentPage, total, perPage, onPageChange }:TPaginationProps) => {
  const pageLimit = 3; // Number of pages to show at the start and end

  // Calculate total pages based on totalItems and perPage
  const totalPages = Math.ceil(total / perPage);

  // Function to generate the page numbers to be displayed
  const getDisplayedPages = () => {
    const pages = [];
    const ellipsis = '...';

    if (totalPages <= pageLimit * 2 + 1) {
      // Show all pages if totalPages is within the visible range
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first few pages
      for (let i = 1; i <= pageLimit; i++) {
        pages.push(i);
      }

      // Determine the range around the current page
      const startRange = Math.max(currentPage - 1, pageLimit + 1);
      const endRange = Math.min(currentPage + 1, totalPages - pageLimit);

      // Add ellipsis if there's a gap between initial pages and startRange
      if (startRange > pageLimit + 1) {
        pages.push(ellipsis);
      }

      // Add the range around the current page
      for (let i = startRange; i <= endRange; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap between endRange and the last few pages
      if (endRange < totalPages - pageLimit) {
        pages.push(ellipsis);
      }

      // Always show the last few pages
      for (let i = totalPages - pageLimit + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min((currentPage - 1) * perPage + 1, total)}-{Math.min(currentPage * perPage, total)}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">{total}</span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon width={20} />
          </button>
        </li>
        {getDisplayedPages().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                {/* ... */}
                <EllipsisHorizontalIcon className='w-4 h-4' />
              </span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  page === currentPage
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon width={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
