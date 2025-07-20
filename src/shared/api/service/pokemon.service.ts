import { START_SEARCH_ENDPOINT } from '../endpoints';
import type { AllPokemonData } from '../types/AllPokemonTypes';
import type { SinglePokemonData } from '../types/SinglePokemonTypes';

export async function searchPokemon(
  query: string
): Promise<AllPokemonData | SinglePokemonData> {
  const response = await fetch(`${START_SEARCH_ENDPOINT}${query}`);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
