import { render, screen } from '@testing-library/react';
import SinglePokemonTable from '../../../components/ResultsTable/components/SinglePokemonTable';
import {
  singlePokemonMock,
  singlePokemonWithoutDataMock,
  singlePokemonWithoutSpriteMock,
} from '../../../../../shared/testsMocks/SinglePokemonMocks';

describe('SinglePokemonTable', () => {
  test('Should renders all fields correctly', () => {
    render(<SinglePokemonTable data={singlePokemonMock} />);

    expect(screen.getByText('Pokémon #25')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /pikachu/i });
    expect(image).toHaveAttribute(
      'src',
      singlePokemonMock.sprites.front_default
    );
    expect(image).toHaveAttribute('alt', 'pikachu');
  });

  test('Should display a message stating that nothing was found', () => {
    render(<SinglePokemonTable data={singlePokemonWithoutDataMock} />);
    expect(screen.getByText('Nothing was found')).toBeInTheDocument();
  });

  test('Should does not render image if front_default is missing', () => {
    render(<SinglePokemonTable data={singlePokemonWithoutSpriteMock} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
