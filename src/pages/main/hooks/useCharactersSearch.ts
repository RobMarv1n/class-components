import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { useGetAllCharactersQuery } from '../../../app/api/service/characters/character.service';

const LAST_CHARACTER_SEARCH = '[LAST_CHARACTER_SEARCH]';

export function useCharactersSearch() {
  const [lastQuery, setLastQuery] = useLocalStorage(LAST_CHARACTER_SEARCH, '');
  const [searchParameters, setSearchParameters] = useSearchParams();
  const currentPage = useMemo(
    () => Number(searchParameters.get('page')) || 1,
    [searchParameters]
  );

  const {
    data: result,
    error,
    isLoading,
  } = useGetAllCharactersQuery({
    name: lastQuery,
    page: currentPage,
  });

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (searchQuery !== lastQuery) {
        setLastQuery(searchQuery);
        setSearchParameters((previous) => {
          const newParameters = new URLSearchParams(previous);
          newParameters.set('page', '1');
          newParameters.set('name', searchQuery);
          return newParameters;
        });
      }
    },
    [setLastQuery, setSearchParameters, lastQuery]
  );

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? 'Failed to fetch character list'
        : null;

  useEffect(() => {
    handleSearch(lastQuery);
  }, [handleSearch, lastQuery]);

  return {
    result: result || null,
    error: errorMessage,
    isLoading,
    lastQuery,
    currentPage: Number(searchParameters.get('page')) || 1,
    totalPages: result?.info.pages || 1,
    handleSearch,
    setSearchParameters,
  };
}
