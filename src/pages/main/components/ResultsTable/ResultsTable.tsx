import { Component } from 'react';
import type { PokemonsData } from '../../MainPage';

export interface ResultsTableProps {
  results: PokemonsData;
}

export type PokemonListData = {
  url: string;
  name: string;
};

class ResultsTable extends Component<ResultsTableProps> {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {this.props.results.results.map((result: PokemonListData) => (
            <tr key={result.name}>
              <td>{result.name}</td>
              <td>{result.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ResultsTable;
