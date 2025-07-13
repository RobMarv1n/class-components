import { Component } from 'react';
import type { AllPokemonsData } from '../../../../shared/api/types/AllPokemonsTypes';
import type { SinglePokemon } from '../../../../shared/api/types/SinglePokemonTypes';
import DataUploadError from '../../../../shared/ui/DataUploadError';
import AllPokemonsTable from './components/AllPokemonsTable';
import SinglePokemonTable from './components/SinglePokemonTable';

export interface ResultsTableProps {
  data: AllPokemonsData | SinglePokemon | null;
  error: string | null;
}

class ResultsTable extends Component<ResultsTableProps> {
  render() {
    const { data, error } = this.props;

    if (error) {
      return <DataUploadError message={error} />;
    }

    if (!data) return <p>Nothing was found</p>;

    if ('results' in data) {
      return <AllPokemonsTable data={data} />;
    }

    if ('sprites' in data && 'height' in data) {
      return <SinglePokemonTable data={data} />;
    }

    return <p>Unsupported data format</p>;
  }
}

export default ResultsTable;
