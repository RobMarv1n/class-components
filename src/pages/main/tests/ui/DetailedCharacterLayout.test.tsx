import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailedCharacterLayout from '../../ui/DetailedCharacterLayout';
import { server } from '../../../../shared/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithRouter(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/character/:id" element={<DetailedCharacterLayout />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('DetailedCharacterLayout', () => {
  test('Should show Spinner during loading', async () => {
    renderWithRouter('/character/1');
    expect(screen.getByRole('status')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  test('Should render error text for 404', async () => {
    renderWithRouter('/character/999');
    await waitFor(() => {
      expect(screen.getByText(/Character not found/i)).toBeInTheDocument();
    });
  });

  test('Should render error text for server error', async () => {
    renderWithRouter('/character/500');
    await waitFor(() => {
      expect(screen.getByText(/Character not found/i)).toBeInTheDocument(); // По умолчанию текст
    });
  });
});
