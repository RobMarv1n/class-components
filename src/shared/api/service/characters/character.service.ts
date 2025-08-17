import { AllCharactersData, SingleCharacterData } from '../../types/types';
import { baseService } from '../base.service';

export const characterApiService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getAllCharacters: builder.query<
      AllCharactersData,
      { name: string; page: number }
    >({
      query: ({ name, page }) =>
        `?name=${encodeURIComponent(name)}&page=${page}`,
    }),

    getSingleCharacter: builder.query<SingleCharacterData, number>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetSingleCharacterQuery } =
  characterApiService;
