import { Component } from 'react';

interface SearchInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        className="search-button"
        onChange={this.props.onChange}
        placeholder={this.props.placeholder || 'Search...'}
        value={this.props.value}
      />
    );
  }
}

export default SearchInput;
