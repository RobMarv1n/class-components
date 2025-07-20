import { render, screen } from '@testing-library/react';
import ResultsTable from '../../components/ResultsTable/ResultsTable';
import { allPokemonMock } from '../../../../shared/testsMocks/AllPokemonMocks';
import { singlePokemonMock } from '../../../../shared/testsMocks/SinglePokemonMocks';

describe('ResultsTable', () => {
  test('Should render DataUploadError if error prop is set', () => {
    render(<ResultsTable data={null} error="Failed to load" />);
    expect(screen.getByText('Data upload error')).toBeInTheDocument();
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  test('Should render DataUploadError if error prop is set', () => {
    const error = {
      status: 404,
      message: 'Not Found',
    };

    render(<ResultsTable data={null} error={error.message} />);
    expect(screen.getByText('Data upload error')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  test('Should render "Nothing was found" if no data and no error', () => {
    render(<ResultsTable data={null} error={null} />);
    expect(screen.getByText('Nothing was found')).toBeInTheDocument();
  });

  test('Should render AllPokemonsTable if data has results property', () => {
    render(<ResultsTable data={allPokemonMock} error={null} />);
    expect(
      screen.getByText(/bulbasaur/i) || screen.getByText(/ivysaur/i)
    ).toBeInTheDocument();
  });

  test('Should render SinglePokemonTable if data has sprites and height properties', () => {
    render(<ResultsTable data={singlePokemonMock} error={null} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('Should render Unsupported data format if data does not match expected shapes', () => {
    const invalidData: unknown = { foo: 'bar' };
    render(<ResultsTable data={invalidData as never} error={null} />);
    expect(screen.getByText('Unsupported data format')).toBeInTheDocument();
  });
});
