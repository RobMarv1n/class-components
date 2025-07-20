import { Component } from 'react';
import type { SinglePokemonData } from '../../../../shared/api/types/SinglePokemonTypes';
import DataUploadError from '../../../../shared/ui/DataUploadError';
import AllPokemonTable from './components/AllPokemonsTable';
import SinglePokemonTable from './components/SinglePokemonTable';
import styles from './ResultsTable.module.css';
import type { AllPokemonData } from '../../../../shared/api/types/AllPokemonTypes';

class ResultsTable extends Component<ResultsTableProps> {
  render() {
    const { data, error } = this.props;

    let content;

    if (error) {
      content = <DataUploadError message={error} />;
    } else if (!data) {
      content = <p>Nothing was found</p>;
    } else if ('results' in data) {
      content = <AllPokemonTable data={data} />;
    } else if ('sprites' in data && 'height' in data) {
      content = <SinglePokemonTable data={data} />;
    } else {
      content = <p>Unsupported data format</p>;
    }

    return <section className={styles.resultsTable}>{content}</section>;
  }
}

export interface ResultsTableProps {
  data: AllPokemonData | SinglePokemonData | null;
  error: string | null;
}

export default ResultsTable;
