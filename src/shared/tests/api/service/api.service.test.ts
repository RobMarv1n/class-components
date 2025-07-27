import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
  getAllCharacters,
  getSingleCharacter,
} from '../../../api/service/api.service';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('API Service', () => {
  test('getAllCharacters returns a list of characters', async () => {
    const mockResponse = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
    };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        })
      )
    );

    const data = await getAllCharacters('rick', 1);
    expect(data.results).toHaveLength(2);
    expect(data.results[0].name).toBe('Rick Sanchez');
  });

  test('getSingleCharacter returns a single character', async () => {
    const mockCharacter = { id: 1, name: 'Rick Sanchez', status: 'Alive' };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCharacter),
        })
      )
    );

    const character = await getSingleCharacter(1);
    expect(character.name).toBe('Rick Sanchez');
    expect(character.status).toBe('Alive');
  });

  test('getAllCharacters throws an error on failed request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      )
    );

    await expect(getAllCharacters('rick', 1)).rejects.toThrow(
      'Failed to fetch character list'
    );
  });

  test('getSingleCharacter throws an error when status is 404', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
        })
      )
    );

    await expect(getSingleCharacter(999)).rejects.toThrow(
      'Character not found'
    );
  });
});
