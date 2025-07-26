import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { START_SEARCH_ENDPOINT } from '../../../../shared/api/endpoints';
import SearchBox from '../../ui/SearchBox/SearchBox';

describe('SearchBox', () => {
  test('Should render with initial query if provided', () => {
    render(<SearchBox onSearch={() => {}} initialQuery="pikachu" />);
    const input = screen.getByPlaceholderText(/enter pokémon/i);
    expect(input).toHaveValue('pikachu');
  });

  test('Should displays START_SEARCH_ENDPOINT text and empty input', () => {
    render(<SearchBox onSearch={() => {}} />);
    expect(screen.getByText(START_SEARCH_ENDPOINT)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('Should calls onSearch with trimmed input on submit', () => {
    const onSearchMock = vi.fn();
    render(<SearchBox onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/enter pokémon/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  bulbasaur  ' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('bulbasaur');
  });

  test('Should updates input value when typed', () => {
    render(<SearchBox onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/enter pokémon/i);

    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input).toHaveValue('charizard');
  });

  test('Should uses custom placeholder if provided', () => {
    render(
      <SearchBox onSearch={() => {}} placeholder="Search your Pokémon now" />
    );

    expect(
      screen.getByPlaceholderText(/search your pokémon now/i)
    ).toBeInTheDocument();
  });
});
