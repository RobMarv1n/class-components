import { Component } from 'react';
import { START_SEARCH_ENDPOINT } from '../../../../shared/api/endpoints';
import styles from './SearchBox.module.css';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';

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
        <div className={styles.searchBoxContainer}>
          <p>{START_SEARCH_ENDPOINT}</p>
          <Input
            onChange={this.handleChange}
            value={this.state.query}
            placeholder={
              this.props.placeholder || 'Enter Pokémon full name or id'
            }
            className={styles.searchInput}
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
    );
  }
}

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
}
interface SearchBoxState {
  query: string;
}

export default SearchBox;
