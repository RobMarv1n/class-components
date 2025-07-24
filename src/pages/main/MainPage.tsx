import { useCallback, useEffect, useState } from 'react';
import type { SinglePokemonData } from '../../shared/api/types/SinglePokemonTypes';
import Spinner from '../../shared/ui/Spinner/Spinner';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';
import { searchPokemon } from '../../shared/api/service/pokemon.service';
import type { AllPokemonData } from '../../shared/api/types/AllPokemonTypes';
import useLocalStorage from '../../shared/hooks/useLocalStorage';

const LAST_POKEMON_SEARCH = '[LAST_POKEMON_SEARCH]';

function MainPage() {
  const [result, setResult] = useState<ResultsType>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCrashing, setIsCrashing] = useState(false);
  const [lastQuery, setLastQuery] = useLocalStorage(LAST_POKEMON_SEARCH, '');

  const handleSearch = useCallback(
    async (query: string) => {
      setLastQuery(query);
      setError(null);
      setIsLoading(true);

      try {
        const data = await searchPokemon(query);
        setResult(data);
      } catch (error_: unknown) {
        const message =
          error_ instanceof Error ? error_.message : 'Unknown error';
        setResult(null);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [setLastQuery]
  );

  useEffect(() => {
    if (lastQuery) {
      handleSearch(lastQuery);
    }
  }, [lastQuery, handleSearch]);

  const triggerCrash = () => {
    setIsCrashing(true);
  };

  if (isCrashing) {
    throw new Error('Test crash from MainPage');
  }

  return (
    <section className="main-page">
      <SearchBox onSearch={handleSearch} initialQuery={lastQuery} />
      {isLoading && <Spinner />}
      {!isLoading && <ResultsTable data={result} error={error} />}
      <button onClick={triggerCrash}>Crash Test</button>
    </section>
  );
}

type ResultsType = AllPokemonData | SinglePokemonData | null;

export default MainPage;
