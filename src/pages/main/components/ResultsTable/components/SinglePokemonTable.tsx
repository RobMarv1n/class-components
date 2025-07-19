import { Component } from 'react';
import type { SinglePokemonData } from '../../../../../shared/api/types/SinglePokemonTypes';

class SinglePokemonTable extends Component<SinglePokemonTableProps> {
  render() {
    const { data } = this.props;
    const { id, name, height, weight, sprites } = data;

    return (
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Pokémon #{id}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{height}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{weight}</td>
          </tr>
          <tr>
            <td>Sprite</td>
            <td>
              {sprites.front_default && (
                <img src={sprites.front_default} alt={name} width={125} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

interface SinglePokemonTableProps {
  data: SinglePokemonData;
}

export default SinglePokemonTable;
