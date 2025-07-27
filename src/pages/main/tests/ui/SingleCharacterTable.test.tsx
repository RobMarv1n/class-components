import { render, screen } from '@testing-library/react';
import type { SingleCharacterData } from '../../../../shared/api/types/types';
import SingleCharacterTable from '../../ui/SingleCharacterTable';

const baseCharacter: SingleCharacterData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: '',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rick.com/image.jpg',
  episode: [],
  url: '',
  created: '',
};

describe('SingleCharacterTable', () => {
  test('Should render character info correctly', () => {
    render(<SingleCharacterTable data={baseCharacter} />);

    expect(screen.getByText('Character #1')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Alive')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', baseCharacter.image);
    expect(img).toHaveAttribute('alt', 'Rick Sanchez');
  });

  test('Should render "Nothing was found" if name, status, and species are missing', () => {
    const minimalCharacter = {
      ...baseCharacter,
      name: '',
      species: '',
      id: 0,
    };

    render(<SingleCharacterTable data={minimalCharacter} />);
    expect(screen.getByText('Nothing was found')).toBeInTheDocument();
  });

  test('Should not render img tag if image is empty', () => {
    const noImageCharacter = {
      ...baseCharacter,
      image: '',
    };

    render(<SingleCharacterTable data={noImageCharacter} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
