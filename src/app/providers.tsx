'use client';

import { useTranslations } from 'next-intl';
import ErrorBoundary from '../shared/providers/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../shared/providers/ThemeProvider/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const t = useTranslations('ErrorBoundary');

  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="flex flex-col justify-center items-center p-6 my-6 rounded-2xl border border-red-300 bg-red-50 text-red-700 shadow-md">
          <h2 className="text-xl font-semibold mb-2">{t('title')} 😢</h2>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            {t('retry-button')}
          </button>
        </div>
      )}
    >
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
