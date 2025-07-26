import { START_SEARCH_ENDPOINT } from '../endpoints';
import type { AllCharactersData, SingleCharacterData } from '../types/types';

export async function getAllCharacters(
  name: string,
  page: number
): Promise<AllCharactersData> {
  const response = await fetch(
    `${START_SEARCH_ENDPOINT}?name=${encodeURIComponent(name)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch character list');
  }
  return response.json();
}

export async function getSingleCharacter(
  id: number
): Promise<SingleCharacterData> {
  const response = await fetch(`${START_SEARCH_ENDPOINT}/${id}`);
  if (!response.ok) {
    throw new Error('Character not found');
  }
  return response.json();
}
