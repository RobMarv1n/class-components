import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPokemonList } from '../../shared/api/service/pokemon.service';
import Spinner from '../../shared/ui/Spinner/Spinner';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import type {
  AllPokemonData,
  AllPokemonListData,
} from '../../shared/api/types/AllPokemonTypes';
import type { SinglePokemonData } from '../../shared/api/types/SinglePokemonTypes';
import Pagination from './components/Pagination/Pagination';

const LAST_POKEMON_SEARCH = '[LAST_POKEMON_SEARCH]';
const PAGE_LIMIT = 20;

export function MainPage() {
  const [result, setResult] = useState<ResultsType>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useLocalStorage(LAST_POKEMON_SEARCH, '');
  const [searchParameters, setSearchParameters] = useSearchParams();

  const currentPage = Number(searchParameters.get('page')) || 1;

  const offset = (currentPage - 1) * PAGE_LIMIT;

  const totalItems = (result as AllPokemonData)?.count || 0;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT);

  const handleSearch = useCallback(
    async (searchQuery: string, options?: { resetPage?: boolean }) => {
      setLastQuery(searchQuery);

      if (options?.resetPage) {
        setSearchParameters({ page: '1' });
      }

      setError(null);
      setIsLoading(true);

      try {
        if (searchQuery.trim()) {
          const allData = await getPokemonList(10_000, 0);
          const filtered = allData.results.filter(
            (pokemon: AllPokemonListData) =>
              pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          const paginated = filtered.slice(offset, offset + PAGE_LIMIT);

          setResult({
            count: filtered.length,
            results: paginated,
          } as AllPokemonData);
        } else {
          const data = await getPokemonList(PAGE_LIMIT, offset);
          setResult(data);
        }
      } catch (requestError) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'Unknown error';
        setResult(null);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [offset, setLastQuery, setSearchParameters]
  );

  useEffect(() => {
    handleSearch(lastQuery);
  }, [lastQuery, offset, handleSearch]);

  const handlePageClick = (pageNumber: number) => {
    setSearchParameters({ page: pageNumber.toString() });
  };

  return (
    <section className="main-page">
      <SearchBox
        onSearch={(query) => handleSearch(query, { resetPage: true })}
        initialQuery={lastQuery}
      />
      {isLoading && <Spinner />}
      {!isLoading && <ResultsTable data={result} error={error} />}

      {totalPages > 1 && (
        <Pagination
          currentPageNumber={currentPage}
          totalPageCount={totalPages}
          onPageChange={handlePageClick}
        />
      )}
    </section>
  );
}

type ResultsType = AllPokemonData | SinglePokemonData | null;

export default MainPage;
