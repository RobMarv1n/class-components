import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MainPage from '../MainPage';
import * as pokemonService from '../../../shared/api/service/pokemon.service';
import { singlePokemonMock } from '../../../shared/testsMocks/SinglePokemonMocks';

describe('MainPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  test('Should render SearchBox with input and search button and crash button', () => {
    render(<MainPage />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByText('Crash Test')).toBeInTheDocument();
  });

  test('Should load data on mount with last search from localStorage', async () => {
    localStorage.setItem('[LAST_POKEMON_SEARCH]', 'pikachu');
    const mockSearch = vi
      .spyOn(pokemonService, 'searchPokemon')
      .mockResolvedValueOnce(singlePokemonMock);

    render(<MainPage />);

    expect(mockSearch).toHaveBeenCalledWith('pikachu');

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  test('Should replace the original query from local storage with the query entered by the user and perform a search', async () => {
    localStorage.setItem('[LAST_POKEMON_SEARCH]', 'charmander');
    const searchMock = vi
      .spyOn(pokemonService, 'searchPokemon')
      .mockResolvedValueOnce(singlePokemonMock);

    render(<MainPage />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('charmander');

    const newSearchPokemon = 'pikachu';
    fireEvent.change(input, { target: { value: newSearchPokemon } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(input).toHaveValue('pikachu');

    expect(searchMock).toHaveBeenCalledWith(newSearchPokemon);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });

    expect(localStorage.getItem('[LAST_POKEMON_SEARCH]')).toBe(
      newSearchPokemon
    );
  });

  test('Should show spinner while loading', async () => {
    const mockSearch = vi
      .spyOn(pokemonService, 'searchPokemon')
      .mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(singlePokemonMock), 400)
          )
      );

    render(<MainPage />);

    expect(
      screen.getByRole('status', { name: /loading/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalled();
    });
  });

  test('Should display error if search fails', async () => {
    vi.spyOn(pokemonService, 'searchPokemon').mockRejectedValueOnce(
      new Error('Not found')
    );

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  test('Should trigger crash when "Crash Test" button is clicked', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => {
      render(<MainPage />);
      fireEvent.click(screen.getByRole('button', { name: 'Crash Test' }));
    }).toThrow('Test crash from MainPage');
    consoleErrorSpy.mockRestore();
  });
});
