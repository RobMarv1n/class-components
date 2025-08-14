'use client';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import dynamic from 'next/dynamic';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ThemeProvider } from '../providers/ThemeProvider/ThemeProvider';

const App = dynamic(() => import('../App'), { ssr: false });

export function ClientOnly() {
  return (
    <StrictMode>
      <ErrorBoundary errorComponent={() => null}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
}
