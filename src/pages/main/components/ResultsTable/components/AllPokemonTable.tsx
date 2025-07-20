import { Component } from 'react';
import type {
  AllPokemonListData,
  AllPokemonData,
} from '../../../../../shared/api/types/AllPokemonTypes';

class AllPokemonTable extends Component<AllPokemonTableProps> {
  render() {
    const { data } = this.props;

    if (data.results.length === 0 || data.count === 0) {
      return <p>Nothing was found</p>;
    }

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

interface AllPokemonTableProps {
  data: AllPokemonData;
}

export default AllPokemonTable;
