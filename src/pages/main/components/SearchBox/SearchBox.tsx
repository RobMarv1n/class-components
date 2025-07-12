import { Component } from 'react';
import SearchApiPath from './components/SearchApiPath/SearchApiPath';
import SearchButton from './components/SearchButton/SearchButton';
import SearchInput from './components/SearchInput/SearchInput';
import './SearchBox.css';

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
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

  handleClick = () => {
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div className="search-box-container">
        <SearchApiPath />
        <SearchInput
          onChange={this.handleChange}
          placeholder={this.props.placeholder || 'Search...'}
        />
        <SearchButton onClick={this.handleClick} />
      </div>
    );
  }
}

export default SearchBox;
