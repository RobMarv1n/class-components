import type { SinglePokemonData } from '../api/types/SinglePokemonTypes';

export const singlePokemonMock: SinglePokemonData = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    back_default: null,
    back_female: null,
    back_shiny: null,
    back_shiny_female: null,
    front_female: null,
    front_shiny: null,
    front_shiny_female: null,
  },
  base_experience: 0,
  is_default: false,
  order: 0,
  abilities: [],
  forms: [],
  game_indices: [],
  held_items: [],
  location_area_encounters: '',
  moves: [],
  species: {
    name: '',
    url: '',
  },
  cries: {
    latest: '',
    legacy: '',
  },
  stats: [],
  types: [],
};

export const singlePokemonWithoutSpriteMock: SinglePokemonData = {
  ...singlePokemonMock,
  sprites: {
    front_default: '',
    back_default: null,
    back_female: null,
    back_shiny: null,
    back_shiny_female: null,
    front_female: null,
    front_shiny: null,
    front_shiny_female: null,
  },
};

export const singlePokemonWithoutDataMock: SinglePokemonData = {
  ...singlePokemonMock,
  name: '',
  weight: 0,
  height: 0,
};
