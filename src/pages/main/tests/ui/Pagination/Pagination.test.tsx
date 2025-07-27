import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Pagination from '../../../ui/Pagination/Pagination';

describe('Pagination component', () => {
  const onPageChangeMock = vi.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render all page buttons if total pages are 5', () => {
    render(
      <Pagination
        currentPageNumber={3}
        totalPageCount={5}
        onPageChange={onPageChangeMock}
      />
    );

    for (let page = 1; page <= 5; page++) {
      expect(screen.getByText(page.toString())).toBeDefined();
    }

    expect(screen.queryByText('...')).toBeNull();
  });

  it('Should render ellipsis and first/last page buttons if total pages are more than 7', () => {
    render(
      <Pagination
        currentPageNumber={5}
        totalPageCount={10}
        onPageChange={onPageChangeMock}
      />
    );

    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('10')).toBeDefined();

    const ellipsisElements = screen.getAllByText('...');
    expect(ellipsisElements.length).toBeGreaterThanOrEqual(1);
  });

  it('Should add "active" class to the button of the current page', () => {
    render(
      <Pagination
        currentPageNumber={4}
        totalPageCount={7}
        onPageChange={onPageChangeMock}
      />
    );

    const activeButton = screen.getByText('4');
    expect(activeButton.classList.contains('active')).toBe(true);
  });

  it('Should call onPageChange with correct page number on button click', () => {
    render(
      <Pagination
        currentPageNumber={2}
        totalPageCount={5}
        onPageChange={onPageChangeMock}
      />
    );

    const button = screen.getByText('3');
    fireEvent.click(button);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it('Ellipsis elements are not buttons and do not trigger onPageChange', () => {
    render(
      <Pagination
        currentPageNumber={5}
        totalPageCount={10}
        onPageChange={onPageChangeMock}
      />
    );

    const ellipsisElements = screen.getAllByText('...');
    for (const element of ellipsisElements) {
      expect(element.tagName).toBe('SPAN');
      fireEvent.click(element);
      expect(onPageChangeMock).not.toHaveBeenCalled();
    }
  });
});
