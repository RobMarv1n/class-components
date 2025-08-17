import { isNumber } from '../../../shared/utils/typeguards';

const FULL_LIST_PAGE_LIMIT = 7;
const PAGE_WINDOW_SIZE = 5;
const PAGES_AROUND = 2;
const LEFT_ELLIPSIS_THRESHOLD = 2;

export function getVisiblePageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= FULL_LIST_PAGE_LIMIT) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pageNumbers: (number | undefined)[] = Array.from({
    length: PAGE_WINDOW_SIZE,
  })
    .map((_, index) => index + currentPage - PAGES_AROUND)
    .filter((element) => element > 1 && element < totalPages);

  const firstVisiblePage = pageNumbers.at(0);
  if (isNumber(firstVisiblePage) && firstVisiblePage > LEFT_ELLIPSIS_THRESHOLD)
    pageNumbers.unshift(undefined);
  const lastVisiblePage = pageNumbers.at(-1);
  if (isNumber(lastVisiblePage) && lastVisiblePage < totalPages - 1)
    pageNumbers.push(undefined);

  const visiblePages = [1, ...pageNumbers, totalPages];

  return visiblePages;
}
