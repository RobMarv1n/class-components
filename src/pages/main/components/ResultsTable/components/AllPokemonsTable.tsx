import { Component } from 'react';
import type {
  AllPokemonListData,
  AllPokemonData,
} from '../../../../../shared/api/types/AllPokemonTypes';

class AllPokemonsTable extends Component<AllPokemonsTableProps> {
  render() {
    const { data } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((pokemon: AllPokemonListData) => (
            <tr key={pokemon.name}>
              <td>{pokemon.name}</td>
              <td>{pokemon.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

interface AllPokemonsTableProps {
  data: AllPokemonData;
}

export default AllPokemonsTable;
