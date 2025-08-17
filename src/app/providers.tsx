'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../shared/providers/ThemeProvider/ThemeProvider';
import ErrorBoundary from '../shared/providers/ErrorBoundary/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
