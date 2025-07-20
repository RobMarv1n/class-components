import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AllPokemonTable from '../../../components/ResultsTable/components/AllPokemonTable';

const mockData = {
  count: 2,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const mockDataWithoutResults = {
  count: 0,
  results: [],
};

describe('AllPokemonTable', () => {
  test('Should render a table with Pokemon names and URLs', () => {
    render(<AllPokemonTable data={mockData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(
      screen.getByText('https://pokeapi.co/api/v2/pokemon/1/')
    ).toBeInTheDocument();
    expect(
      screen.getByText('https://pokeapi.co/api/v2/pokemon/2/')
    ).toBeInTheDocument();
  });

  test('Should render correct number of rows', () => {
    render(<AllPokemonTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  test('Should display a message stating that nothing was found.', () => {
    render(<AllPokemonTable data={mockDataWithoutResults} />);
    expect(screen.getByText('Nothing was found')).toBeInTheDocument();
  });
});
