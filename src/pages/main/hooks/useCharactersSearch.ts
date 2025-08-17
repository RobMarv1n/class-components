import { useCallback, useMemo } from 'react';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { useGetAllCharactersQuery } from '../../../app/api/service/characters/character.service';
import { useSearchParams, useRouter } from 'next/navigation';

const LAST_CHARACTER_SEARCH = '[LAST_CHARACTER_SEARCH]';

export function useCharactersSearch() {
  const [lastQuery, setLastQuery] = useLocalStorage(LAST_CHARACTER_SEARCH, '');
  const router = useRouter();
  const searchParameters = useSearchParams();

  const currentPage = useMemo(
    () => Number(searchParameters?.get('page')) || 1,
    [searchParameters]
  );

  const searchQuery = useMemo(
    () => searchParameters?.get('query') || lastQuery,
    [searchParameters, lastQuery]
  );

  const {
    data: result,
    error,
    isLoading,
  } = useGetAllCharactersQuery({
    name: searchQuery,
    page: currentPage,
  });

  const handleSearch = useCallback(
    (query: string) => {
      if (query !== searchQuery) {
        setLastQuery(query);
        const newParams = new URLSearchParams(searchParameters?.toString());
        newParams.delete('details');
        newParams.set('query', query);
        newParams.set('page', '1');
        router.push(`?${newParams.toString()}`);
      }
    },
    [searchQuery, searchParameters, setLastQuery, router]
  );

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? 'Failed to fetch character list'
        : null;

  return {
    result: result || null,
    error: errorMessage,
    isLoading,
    lastQuery,
    currentPage,
    totalPages: result?.info.pages || 1,
    handleSearch,
    searchParameters,
  };
}
