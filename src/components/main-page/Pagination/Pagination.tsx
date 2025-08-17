import Button from '../../../shared/ui/Button/Button';
import { getVisiblePageNumbers } from './getVisiblePageNumbers';

export default function Pagination({
  currentPageNumber,
  totalPageCount,
  onPageChange,
}: PaginationProperties) {
  const visiblePages = getVisiblePageNumbers(currentPageNumber, totalPageCount);

  return (
    <div className="flex flex-none mt-8 gap-2 justify-center items-end">
      {visiblePages.map((page, index) =>
        page ? (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md border transition-colors
              ${
                page === currentPageNumber
                  ? 'bg-indigo-700 text-white shadow-inner cursor-default hover:shadow-none'
                  : ''
              }`}
          >
            {page}
          </Button>
        ) : (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-gray-400 select-none"
          >
            ...
          </span>
        )
      )}
    </div>
  );
}

type PaginationProperties = {
  currentPageNumber: number;
  totalPageCount: number;
  onPageChange: (pageNumber: number) => void;
};
