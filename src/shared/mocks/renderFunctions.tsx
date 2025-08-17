import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../../store/store';
import { ThemeProvider } from '../providers/ThemeProvider/ThemeProvider';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

export function renderWithProvidersAndRouter(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <RouterContext.Provider value={mockRouter}>{ui}</RouterContext.Provider>
      </ThemeProvider>
    </Provider>
  );
}

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
}
