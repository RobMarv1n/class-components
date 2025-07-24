import { useEffect, useState } from 'react';
import type { SinglePokemonData } from '../../shared/api/types/SinglePokemonTypes';
import Spinner from '../../shared/ui/Spinner/Spinner';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';
import { searchPokemon } from '../../shared/api/service/pokemon.service';
import type { AllPokemonData } from '../../shared/api/types/AllPokemonTypes';

const LAST_POKEMON_SEARCH = '[LAST_POKEMON_SEARCH]';

function MainPage() {
  const [result, setResult] = useState<
    AllPokemonData | SinglePokemonData | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCrashing, setIsCrashing] = useState(false);
  const [lastQuery] = useState(
    () => localStorage.getItem(LAST_POKEMON_SEARCH) || ''
  );

  useEffect(() => {
    if (lastQuery) {
      handleSearch(lastQuery);
    }
  }, [lastQuery]);

  const handleSearch = async (query: string) => {
    localStorage.setItem(LAST_POKEMON_SEARCH, query);
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
  };

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

export default MainPage;
