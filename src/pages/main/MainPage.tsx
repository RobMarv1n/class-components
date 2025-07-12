import { Component } from 'react';
import type { PokemonListData } from './components/ResultsTable/ResultsTable';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchBox from './components/SearchBox/SearchBox';

export type PokemonsData = {
  count: number;
  results: PokemonListData[];
};

interface MainPageState {
  result: PokemonsData | null;
}

class MainPage extends Component<object, MainPageState> {
  handleSearch = async (query: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/${query}`);
      const data = await response.json();
      if (data) {
        this.setState({ result: data });
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  render() {
    return (
      <section className="main-page">
        <SearchBox onSearch={this.handleSearch} />
        {this.state?.result && <ResultsTable results={this.state.result} />}
      </section>
    );
  }
}

export default MainPage;
