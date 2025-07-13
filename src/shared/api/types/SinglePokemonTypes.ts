export type SinglePokemonData = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: NamedAPIResource[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  cries: PokemonCries;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types?: { generation: NamedAPIResource; types: PokemonType[] }[];
};

export type NamedAPIResource = { name: string; url: string };

export type PokemonAbility = {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

export type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

export type PokemonHeldItem = { item: NamedAPIResource };

export type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

export type PokemonCries = { latest: string; legacy: string };

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

export type PokemonType = { slot: number; type: NamedAPIResource };
