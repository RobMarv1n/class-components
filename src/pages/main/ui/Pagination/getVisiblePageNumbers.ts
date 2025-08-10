import { isNumber } from '../../../../shared/utils/typeguards';

export function getVisiblePageNumbers(currentPage: number, totalPages: number) {
  const PAGES_AROUND = 2;

  const pageNumbers: (number | undefined)[] = Array.from({ length: 5 })
    .map((_, index) => index + currentPage - PAGES_AROUND)
    .filter((element) => element > 1 && element < totalPages);

  const firstVisiblePage = pageNumbers.at(0);
  if (isNumber(firstVisiblePage) && firstVisiblePage > 2)
    pageNumbers.unshift(undefined);
  const lastVisiblePage = pageNumbers.at(-1);
  if (isNumber(lastVisiblePage) && lastVisiblePage < totalPages - 1)
    pageNumbers.push(undefined);

  const visiblePages = [1, ...pageNumbers, totalPages];

  return visiblePages;
}
