import { Component } from 'react';
import { START_SEARCH_ENDPOINT } from '../../../../shared/api/endpoints';
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
        <p>{START_SEARCH_ENDPOINT}</p>
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
