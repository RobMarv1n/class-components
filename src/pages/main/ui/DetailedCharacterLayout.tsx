import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCharacter } from '../../../shared/api/service/api.service';
import type { SingleCharacterData } from '../../../shared/api/types/types';
import Spinner from '../../../shared/ui/Spinner/Spinner';
import SingleCharacterTable from './SingleCharacterTable';

export default function DetailedCharacterLayout() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<SingleCharacterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getSingleCharacter(Number(id))
      .then((result: unknown) => setData(result as SingleCharacterData))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!data) return <p>Character not found</p>;

  return (
    <div style={{ marginLeft: '2rem' }}>
      <SingleCharacterTable data={data} />
    </div>
  );
}
