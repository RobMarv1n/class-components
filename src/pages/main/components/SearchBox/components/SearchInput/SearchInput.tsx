import { Component } from 'react';

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        className="search-button"
        onChange={this.props.onChange}
        placeholder={this.props.placeholder || 'Search...'}
      />
    );
  }
}

export default SearchInput;
