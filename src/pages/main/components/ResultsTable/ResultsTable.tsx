import { Component } from 'react';
import type { AllPokemonsData } from '../../../../shared/api/types/AllPokemonsTypes';
import type { SinglePokemon } from '../../../../shared/api/types/SinglePokemonTypes';
import DataUploadError from '../../../../shared/ui/DataUploadError';
import AllPokemonsTable from './components/AllPokemonsTable';
import SinglePokemonTable from './components/SinglePokemonTable';
import styles from './ResultsTable.module.css';

export interface ResultsTableProps {
  data: AllPokemonsData | SinglePokemon | null;
  error: string | null;
}

class ResultsTable extends Component<ResultsTableProps> {
  render() {
    const { data, error } = this.props;

    let content;

    if (error) {
      content = <DataUploadError message={error} />;
    } else if (!data) {
      content = <p>Nothing was found</p>;
    } else if ('results' in data) {
      content = <AllPokemonsTable data={data} />;
    } else if ('sprites' in data && 'height' in data) {
      content = <SinglePokemonTable data={data} />;
    } else {
      content = <p>Unsupported data format</p>;
    }

    return <section className={styles.resultsTable}>{content}</section>;
  }
}

export default ResultsTable;
