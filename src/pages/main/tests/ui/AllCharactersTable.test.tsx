import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import type { AllCharactersData } from '../../../../shared/api/types/types';
import { AllCharactersTable } from '../../ui/AllCharactersTable';

const mockData: AllCharactersData = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      type: '',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: [],
      url: '',
      created: '',
    },
  ],
};

describe('AllCharactersTable', () => {
  test('Should render error message if error is provided', () => {
    render(<AllCharactersTable data={null} error="Error occurred" />);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  test('Should render "Nothing was found" if data is null or empty', () => {
    render(
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
    render(<AllCharactersTable data={mockData} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  test('Should call onSelectCharacter when row is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <AllCharactersTable data={mockData} onSelectCharacter={handleSelect} />
    );

    const row = screen.getByText('Rick Sanchez').closest('tr');
    expect(row).not.toBeNull();

    if (row) {
      fireEvent.click(row);
    }

    expect(handleSelect).toHaveBeenCalledWith(1);
  });
});
