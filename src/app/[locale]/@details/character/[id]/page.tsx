import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SingleCharacterTable from '../../../../../pages/main/ui/SingleCharacterTable';
import DataUploadError from '../../../../../shared/ui/DataUploadError/DataUploadError';
import Spinner from '../../../../../shared/ui/Spinner/Spinner';
import { useGetSingleCharacterQuery } from '../../../../api/service/characters/character.service';
import Button from '../../../../../shared/ui/Button/Button';

export default function DetailedCharacterLayout() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const id = searchParams?.get('details') ?? null;

  const { data, isLoading, error } = useGetSingleCharacterQuery(Number(id), {
    skip: !id,
  });

  if (!id) return null;

  if (isLoading)
    return (
      <div className="flex-1 min-h-[calc(100vh-170px)]">
        <Spinner />
      </div>
    );

  if (error) return <DataUploadError error={error} />;

  if (!data) return <p>Character not found</p>;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="ml-8 mt-4 flex flex-col">
      <Button className="mb-4 self-end" onClick={handleClose}>
        Close
      </Button>
      <SingleCharacterTable data={data} />
    </div>
  );
}
