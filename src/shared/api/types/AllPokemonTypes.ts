export type AllPokemonData = {
  results: AllPokemonListData[];
  count: number;
};

export type AllPokemonListData = {
  url: string;
  name: string;
};
