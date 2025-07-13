import { Component } from 'react';

interface SearchButtonProps {
  onClick?: () => void;
  type?: string;
}

class SearchButton extends Component<SearchButtonProps> {
  render() {
    return (
      <button className="search-button" onClick={this.props.onClick}>
        Search
      </button>
    );
  }
}

export default SearchButton;
