import { Component } from 'react';
import { START_SEARCH_ENDPOINT } from '../../shared/api/endpoints';
import type { AllPokemonsData } from '../../shared/api/types/AllPokemonsTypes';
import type { SinglePokemon } from '../../shared/api/types/SinglePokemonTypes';
import Spinner from '../../shared/ui/Spinner/Spinner';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';

const LAST_POKEMON_SEARCH = '[LAST_POKEMON_SEARCH]';

export interface MainPageState {
  result: AllPokemonsData | SinglePokemon | null;
  error: string | null;
  isLoading: boolean;
  isCrashing: boolean;
  lastQuery: string;
}
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
    if (this.state.lastQuery) {
      this.handleSearch(this.state.lastQuery);
    }
  }

  handleSearch = async (query: string) => {
    localStorage.setItem(LAST_POKEMON_SEARCH, query);
    this.setState({ error: null, isLoading: true });

    try {
      const response = await fetch(`${START_SEARCH_ENDPOINT}${query}`);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        this.setState({ result: data, isLoading: false });
      }
    } catch (error: unknown) {
      let message = 'Unknown error occurred';

      if (error instanceof Error) {
        message = error.message;
      }

      this.setState({ result: null, error: message, isLoading: false });
    }
  };

  triggerCrash = () => {
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

export default MainPage;
