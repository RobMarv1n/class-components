import { useCallback } from 'react';
import type {
  SingleCharacterData,
  AllCharactersData,
} from '../../../shared/api/types/types';
import DataUploadError from '../../../shared/ui/DataUploadError';

export function AllCharactersTable({
  data,
  error,
  onSelectCharacter,
}: AllCharactersTableProps) {
  const getHandleSelect = useCallback(
    (id: number) => () => {
      onSelectCharacter?.(id);
    },
    [onSelectCharacter]
  );

  if (error) {
    return <DataUploadError message={error} />;
  }

  if (!data || !data.results.length) {
    return <p>Nothing was found</p>;
  }

  return (
    <table style={{ width: 350, height: '100%' }}>
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
            onClick={getHandleSelect(character.id)}
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
  onSelectCharacter?: (id: number) => void;
};
