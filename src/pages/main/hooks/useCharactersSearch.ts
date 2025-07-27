import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllCharacters } from '../../../shared/api/service/api.service';
import type { AllCharactersData } from '../../../shared/api/types/types';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

const LAST_CHARACTER_SEARCH = '[LAST_CHARACTER_SEARCH]';

export function useCharactersSearch() {
  const [result, setResult] = useState<AllCharactersData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [lastQuery, setLastQuery] = useLocalStorage(LAST_CHARACTER_SEARCH, '');
  const [searchParameters, setSearchParameters] = useSearchParams();

  const handleSearch = useCallback(
    async (searchQuery: string, options?: { resetPage?: boolean }) => {
      setLastQuery(searchQuery);
      const newParameters = new URLSearchParams(searchParameters);
      if (options?.resetPage) newParameters.set('page', '1');

      setSearchParameters(newParameters);
      setError(null);
      setIsLoading(true);

      try {
        const page = Number(newParameters.get('page')) || 1;
        const data = await getAllCharacters(searchQuery, page);
        setResult(data);
      } catch (error_) {
        setError(error_ instanceof Error ? error_.message : 'Unknown error');
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    },
    [searchParameters, setLastQuery, setSearchParameters]
  );

  useEffect(() => {
    handleSearch(lastQuery);
  }, [lastQuery, searchParameters, handleSearch]);

  return {
    result,
    error,
    isLoading,
    lastQuery,
    currentPage: Number(searchParameters.get('page')) || 1,
    totalPages: result?.info.pages || 1,
    handleSearch,
    setSearchParameters,
  };
}
