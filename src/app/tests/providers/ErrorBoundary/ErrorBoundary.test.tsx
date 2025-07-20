import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ErrorBoundary from '../../../providers/ErrorBoundary/ErrorBoundary';
import { ThrowErrorMock } from '../../../../shared/testsMocks/ThrowErrorMock';

describe('ErrorBoundary', () => {
  test('Should render children without error', () => {
    render(
      <ErrorBoundary>
        <p>Safe child</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe child')).toBeInTheDocument();
  });

  test('Should render default fallback on error', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorMock />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  test('Should render fallback as ReactNode', () => {
    const fallback = <div>Static fallback</div>;

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowErrorMock />
      </ErrorBoundary>
    );

    expect(screen.getByText('Static fallback')).toBeInTheDocument();
  });

  test('Should render fallback as function', () => {
    const fallback = (error: Error, reset: () => void) => (
      <>
        <p>Error caught: {error.message}</p>
        <button onClick={reset}>Reset</button>
      </>
    );

    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowErrorMock />
      </ErrorBoundary>
    );

    expect(screen.getByText(/error caught: test error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('Should reset error when reset button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowErrorMock />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText(/try again/i));

    rerender(
      <ErrorBoundary>
        <p>After reset</p>
      </ErrorBoundary>
    );

    waitFor(() => {
      expect(screen.getByText('After reset')).toBeInTheDocument();
    });
  });
});
