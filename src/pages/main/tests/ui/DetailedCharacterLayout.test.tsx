import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailedCharacterLayout from '../../ui/DetailedCharacterLayout';

function renderWithRouter(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/character/:id" element={<DetailedCharacterLayout />} />
        <Route path="/character" element={<DetailedCharacterLayout />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('DetailedCharacterLayout with MSW', () => {
  test('Should show the Spinner during loading', async () => {
    renderWithRouter('/character/1');

    await waitFor(() => {
      expect(screen.queryByRole('status')).toBeInTheDocument();
    });
  });
});
