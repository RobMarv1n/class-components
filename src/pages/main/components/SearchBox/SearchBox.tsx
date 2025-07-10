import { Component } from 'react';
import SearchApiPath from './components/SearchApiPath/SearchApiPath';
import SearchButton from './components/SearchButton/SearchButton';
import SearchInput from './components/SearchInput/SearchInput';
import './SearchBox.css';

interface SearchBoxProps {
  placeholder?: string;
}

interface SearchBoxState {
  query: string;
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/${this.state.query}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  render() {
    return (
      <div className="search-box-container">
        <SearchApiPath />
        <SearchInput
          onChange={this.handleChange}
          placeholder={this.props.placeholder || 'Search...'}
        />
        <SearchButton onClick={this.handleSearch} />
      </div>
    );
  }
}

export default SearchBox;
