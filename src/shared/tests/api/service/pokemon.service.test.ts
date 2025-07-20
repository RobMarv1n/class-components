import { describe, test, expect, vi } from 'vitest';
import { START_SEARCH_ENDPOINT } from '../../../api/endpoints';
import { searchPokemon } from '../../../api/service/pokemon.service';
import { waitFor } from '@testing-library/react';

describe('searchPokemon', () => {
  const query = 'pikachu';

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('Should call fetch with correct URL', async () => {
    const mockResponse = { name: 'pikachu', height: 4, weight: 60 };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    globalThis.fetch = fetchMock;

    const result = await searchPokemon(query);
    expect(fetchMock).toHaveBeenCalledWith(`${START_SEARCH_ENDPOINT}${query}`);
    await waitFor(() => {
      expect(result).toEqual(mockResponse);
    });
  });

  test('Should throw error if response is not ok', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(searchPokemon(query)).rejects.toThrow('404 Not Found');
  });

  test('Should parse and returns JSON on success', async () => {
    const mockData = { results: [{ name: 'pikachu' }] };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await searchPokemon(query);

    await waitFor(() => {
      expect(result).toEqual(mockData);
    });
  });
});
