'use client';

import { Component, type ReactNode } from 'react';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error, this.reset);
      }

      if (fallback) return fallback;

      return (
        <div className="flex flex-col justify-center items-center p-6 my-6 rounded-2xl border border-red-300 bg-red-50 text-red-700 shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Something went wrong 😢
          </h2>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={this.reset}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      );
    }

    return children;
  }
}

type FallbackRender =
  | ReactNode
  | ((error: Error, reset: () => void) => ReactNode);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: FallbackRender;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export default ErrorBoundary;
