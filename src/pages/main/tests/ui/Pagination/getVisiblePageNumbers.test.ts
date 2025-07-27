import { getVisiblePageNumbers } from '../../../ui/Pagination/getVisiblePageNumbers';

describe('getVisiblePageNumbers', () => {
  test('Should return all pages if total pages are seven or less', () => {
    expect(getVisiblePageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getVisiblePageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test('Should display first pages and ellipsis when current page is near the beginning', () => {
    expect(getVisiblePageNumbers(2, 10)).toEqual([1, 2, 3, 4, '...', 10]);
    expect(getVisiblePageNumbers(4, 10)).toEqual([1, 2, 3, 4, 5, 6, '...', 10]);
  });

  test('Should display ellipsis before and after when current page is in the middle', () => {
    expect(getVisiblePageNumbers(5, 10)).toEqual([
      1,
      '...',
      3,
      4,
      5,
      6,
      7,
      '...',
      10,
    ]);
  });

  test('Should display ellipsis and last pages when current page is near the end', () => {
    expect(getVisiblePageNumbers(9, 10)).toEqual([1, '...', 7, 8, 9, 10]);
    expect(getVisiblePageNumbers(10, 10)).toEqual([1, '...', 8, 9, 10]);
  });

  test('Should handle correctly when current page is the first page', () => {
    expect(getVisiblePageNumbers(1, 10)).toEqual([1, 2, 3, '...', 10]);
  });

  test('Should handle correctly when total pages is eight', () => {
    expect(getVisiblePageNumbers(4, 8)).toEqual([1, 2, 3, 4, 5, 6, '...', 8]);
  });
});
