import { getVisiblePageNumbers } from './getVisiblePageNumbers';

export default function Pagination({
  currentPageNumber,
  totalPageCount,
  onPageChange,
}: PaginationProperties) {
  const visiblePages = getVisiblePageNumbers(currentPageNumber, totalPageCount);

  return (
    <div className="pagination-controls">
      {visiblePages.map((page, index) => {
        if (typeof page === 'number') {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={page === currentPageNumber ? 'active' : ''}
            >
              {page}
            </button>
          );
        }

        return (
          <span key={`ellipsis-${index}`} className="ellipsis">
            ...
          </span>
        );
      })}
    </div>
  );
}

type PaginationProperties = {
  currentPageNumber: number;
  totalPageCount: number;
  onPageChange: (pageNumber: number) => void;
};
