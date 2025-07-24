import type {
  AllPokemonListData,
  AllPokemonData,
} from '../../../../../shared/api/types/AllPokemonTypes';

function AllPokemonTable({ data }: AllPokemonTableProps) {
  if (!data.results.length || !data.count) {
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

type AllPokemonTableProps = {
  data: AllPokemonData;
};

export default AllPokemonTable;
