import { START_SEARCH_ENDPOINT } from '../endpoints';
import type { AllPokemonData } from '../types/AllPokemonTypes';
import type { SinglePokemonData } from '../types/SinglePokemonTypes';

export async function getPokemonList(limit: number, offset: number) {
  const response = await fetch(
    `${START_SEARCH_ENDPOINT}?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  return response.json();
}

export async function getSinglePokemon(
  query: string
): Promise<AllPokemonData | SinglePokemonData> {
  const response = await fetch(
    `${START_SEARCH_ENDPOINT}/${query.toLowerCase()}`
  );
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  return response.json();
}
