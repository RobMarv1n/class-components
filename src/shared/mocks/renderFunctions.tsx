import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../../store/store';
import { ThemeProvider } from '../../app/providers/ThemeProvider/ThemeProvider';

export function renderWithProvidersAndRouter(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>{ui}</MemoryRouter>
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
