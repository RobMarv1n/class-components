import { Component } from 'react';
import type { SinglePokemonData } from '../../shared/api/types/SinglePokemonTypes';
import Spinner from '../../shared/ui/Spinner/Spinner';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';
import { searchPokemon } from '../../shared/api/service/pokemon.service';
import type { AllPokemonData } from '../../shared/api/types/AllPokemonTypes';

class MainPage extends Component<object, MainPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      result: null,
      error: null,
      isLoading: false,
      isCrashing: false,
      lastQuery: localStorage.getItem(LAST_POKEMON_SEARCH) || '',
    };
  }

  componentDidMount() {
    this.handleSearch(this.state.lastQuery);
  }

  handleSearch = async (query: string) => {
    localStorage.setItem(LAST_POKEMON_SEARCH, query);
    this.setState({ error: null, isLoading: true });

    try {
      const data = await searchPokemon(query);
      this.setState({ result: data, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.setState({ result: null, error: message, isLoading: false });
    }
  };

  private triggerCrash = () => {
    this.setState({ isCrashing: true });
  };

  render() {
    const { result, error, isLoading, isCrashing, lastQuery } = this.state;

    if (isCrashing) {
      throw new Error('Test crash from MainPage');
    }

    return (
      <section className="main-page">
        <SearchBox onSearch={this.handleSearch} initialQuery={lastQuery} />
        {isLoading && <Spinner />}
        {!isLoading && <ResultsTable data={result} error={error} />}
        <button onClick={this.triggerCrash}>Crash Test</button>
      </section>
    );
  }
}

const LAST_POKEMON_SEARCH = '[LAST_POKEMON_SEARCH]';

export interface MainPageState {
  result: AllPokemonData | SinglePokemonData | null;
  error: string | null;
  isLoading: boolean;
  isCrashing: boolean;
  lastQuery: string;
}

export default MainPage;
