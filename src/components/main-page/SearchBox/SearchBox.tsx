import { useEffect, useState } from 'react';
import { BASE_API_PATH } from '../../../shared/api/endpoints';
import Button from '../../../shared/ui/Button/Button';
import Input from '../../../shared/ui/Input/Input';

function SearchBox(props: SearchBoxProps) {
  const { onSearch, placeholder, initialQuery } = props;
  const [query, setQuery] = useState(initialQuery ?? '');

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl flex-none">
      <div className="flex justify-center items-center gap-4">
        <p>{BASE_API_PATH}</p>
        <Input
          onChange={handleChange}
          value={query}
          placeholder={placeholder || 'Enter character name'}
        />
        <Button type="submit" className="min-w-[100px]">
          Search
        </Button>
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
