import { useState } from 'react';
import { START_SEARCH_ENDPOINT } from '../../../../shared/api/endpoints';
import styles from './SearchBox.module.css';
import Button from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';

function SearchBox(props: SearchBoxProps) {
  const { onSearch, placeholder, initialQuery } = props;
  const [query, setQuery] = useState(initialQuery ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.searchBoxContainer}>
        <p>{START_SEARCH_ENDPOINT}</p>
        <Input
          onChange={handleChange}
          value={query}
          placeholder={placeholder || 'Enter character name'}
          className={styles.searchInput}
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

type SearchBoxProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialQuery?: string;
};

export default SearchBox;
