import type { AllCharactersData } from '../api/types/types';

export const mockAllCharactersData: AllCharactersData = {
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
