export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pageNumbers: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }
  } else {
    pageNumbers.push(1);

    if (currentPage > 4) {
      pageNumbers.push('...');
    }

    for (
      let page = Math.max(2, currentPage - 2);
      page <= Math.min(totalPages - 1, currentPage + 2);
      page++
    ) {
      pageNumbers.push(page);
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push('...');
    }

    pageNumbers.push(totalPages);
  }

  return pageNumbers;
}
