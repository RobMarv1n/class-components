import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getSingleCharacter } from '../../../shared/api/service/api.service';
import type { SingleCharacterData } from '../../../shared/api/types/types';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import SingleCharacterTable from './SingleCharacterTable';

export default function DetailedCharacterLayout() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SingleCharacterData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParameters] = useSearchParams();
  const page = searchParameters.get('page');

  useEffect(() => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getSingleCharacter(Number(id))
      .then((result: unknown) => setData(result as SingleCharacterData))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (!loading && !data) return <p>Character not found</p>;

  if (loading) return <Spinner />;

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
