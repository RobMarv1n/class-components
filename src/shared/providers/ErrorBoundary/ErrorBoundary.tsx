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
        <div style={{ padding: 16, color: 'crimson' }}>
          <h2>Something went wrong 😢</h2>
          <p>{error.message}</p>
          <button onClick={this.reset}>Try again</button>
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
