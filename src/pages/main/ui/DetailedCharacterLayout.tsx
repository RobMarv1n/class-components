import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import SingleCharacterTable from './SingleCharacterTable';
import { useGetSingleCharacterQuery } from '../../../app/api/service/characters/character.service';
import DataUploadError from '../../../shared/ui/DataUploadError/DataUploadError';

export default function DetailedCharacterLayout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParameters] = useSearchParams();
  const page = searchParameters.get('page');

  const { data, isLoading, error } = useGetSingleCharacterQuery(Number(id), {
    skip: !id,
  });

  if (error) {
    return <DataUploadError error={error} />;
  }

  if (!isLoading && !data) return <p>Character not found</p>;

  if (isLoading) return <Spinner />;

  const handleClose = () => {
    navigate(`/?page=${page || 1}`);
  };

  return (
    <div style={{ marginLeft: '2rem' }}>
      <button onClick={handleClose} style={{ marginBottom: '1rem' }}>
        Close
      </button>
      {data && <SingleCharacterTable data={data} />}
    </div>
  );
}
