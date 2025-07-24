import type { SinglePokemonData } from '../../../../shared/api/types/SinglePokemonTypes';
import DataUploadError from '../../../../shared/ui/DataUploadError';
import SinglePokemonTable from './components/SinglePokemonTable';
import type { AllPokemonData } from '../../../../shared/api/types/AllPokemonTypes';
import AllPokemonTable from './components/AllPokemonTable';
import styles from './ResultsTable.module.css';

function ResultsTable({ data, error }: ResultsTableProps) {
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

export type ResultsTableProps = {
  data: AllPokemonData | SinglePokemonData | null;
  error: string | null;
};

export default ResultsTable;
