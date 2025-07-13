import { Component } from 'react';
import { START_SEARCH_ENDPOINT } from '../../../../shared/api/endpoints';
import SearchButton from './components/SearchButton/SearchButton';
import SearchInput from './components/SearchInput/SearchInput';
import './SearchBox.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}
interface SearchBoxState {
  query: string;
}

class SearchBox extends Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
    super(props);
    this.state = {
      query: props.initialQuery ?? '',
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch(this.state.query.trim());
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-box-container">
          <p>{START_SEARCH_ENDPOINT}</p>
          <SearchInput
            onChange={this.handleChange}
            value={this.state.query}
            placeholder={
              this.props.placeholder || 'Enter Pokémon full name or id'
            }
          />
          <SearchButton type="submit" />
        </div>
      </form>
    );
  }
}

export default SearchBox;
