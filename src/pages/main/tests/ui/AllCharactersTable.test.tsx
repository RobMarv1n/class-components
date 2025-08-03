import { fireEvent, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import AllCharactersTable from '../../ui/AllCharactersTable';
import { renderWithProvidersAndRouter } from '../../../../shared/mocks/renderFunctions';
import { mockAllCharactersData } from '../../../../shared/mocks/mockData';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ search: '?page=1' }),
  };
});

describe('AllCharactersTable', () => {
  test('Should render error message if error is provided', () => {
    renderWithProvidersAndRouter(
      <AllCharactersTable data={null} error="Error occurred" />
    );
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  test('Should render "Nothing was found" if data is null or empty', () => {
    renderWithProvidersAndRouter(
      <AllCharactersTable
        data={{
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        }}
      />
    );
    expect(screen.getByText('Nothing was found')).toBeInTheDocument();
  });

  test('Should render table with character data', () => {
    renderWithProvidersAndRouter(
      <AllCharactersTable data={mockAllCharactersData} />
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  test('Should call onSelectCharacter when row is clicked', () => {
    renderWithProvidersAndRouter(
      <AllCharactersTable data={mockAllCharactersData} />
    );

    const row = screen.getByText('Rick Sanchez').closest('tr');
    expect(row).not.toBeNull();

    if (row) {
      fireEvent.click(row);
    }

    expect(mockNavigate).toHaveBeenCalledWith('/character/1/?page=1');
  });
});
