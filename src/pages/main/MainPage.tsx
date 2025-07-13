import { Component } from 'react';
import { START_SEARCH_ENDPOINT } from '../../shared/api/endpoints';
import type { AllPokemonsData } from '../../shared/api/types/AllPokemonsTypes';
import type { SinglePokemon } from '../../shared/api/types/SinglePokemonTypes';
import Spinner from '../../shared/ui/Spinner/Spinner';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';

export interface MainPageState {
  result: AllPokemonsData | SinglePokemon | null;
  error: string | null;
  loading: boolean;
  crash: boolean;
}
class MainPage extends Component<object, MainPageState> {
  constructor(props: object) {
    super(props);
    this.state = {
      result: null,
      error: null,
      loading: false,
      crash: false,
    };
  }

  handleSearch = async (query: string) => {
    this.setState({ error: null, loading: true });
    try {
      const response = await fetch(`${START_SEARCH_ENDPOINT}${query}`);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        this.setState({ result: data, loading: false });
      }
    } catch (error: unknown) {
      let message = 'Unknown error occurred';

      if (error instanceof Error) {
        message = error.message;
      }

      this.setState({ result: null, error: message, loading: false });
    }
  };

  triggerCrash = () => {
    this.setState({ crash: true });
  };

  render() {
    const { result, error, loading, crash } = this.state;

    if (crash) {
      throw new Error('Test crash from MainPage');
    }

    return (
      <section className="main-page">
        <SearchBox onSearch={this.handleSearch} />
        {loading && <Spinner />}
        {!loading && <ResultsTable data={result} error={error} />}
        <button onClick={this.triggerCrash} style={{ marginBottom: 12 }}>
          Crash Test
        </button>
      </section>
    );
  }
}

export default MainPage;
