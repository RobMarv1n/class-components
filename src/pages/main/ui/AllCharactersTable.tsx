import { memo } from 'react';
import type {
  SingleCharacterData,
  AllCharactersData,
} from '../../../shared/api/types/types';
import DataUploadError from '../../../shared/ui/DataUploadError';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../../../shared/ui/Spinner/Spinner';

function AllCharactersTable({
  data,
  error,
  isLoading,
}: AllCharactersTableProps) {
  const navigate = useNavigate();
  const location = useLocation();

  if (error) {
    return <DataUploadError message={error} />;
  }

  if (!data || !data.results.length) {
    return <p>Nothing was found</p>;
  }

  if (isLoading && !data) {
    return <Spinner />;
  }

  return (
    <table style={{ width: 350, height: '100%', position: 'relative' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
        </tr>
      </thead>
      <tbody>
        {data.results.map((character: SingleCharacterData) => (
          <tr
            key={character.id}
            onClick={() => {
              navigate(`/character/${character.id}/${location.search}`);
            }}
            style={{ cursor: 'pointer' }}
          >
            <td>{character.name}</td>
            <td>{character.status}</td>
            <td>{character.species}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type AllCharactersTableProps = {
  data: AllCharactersData | null;
  error?: string | null;
  isLoading?: boolean;
  onSelectCharacter?: (id: number) => void;
};

export default memo(AllCharactersTable);
