'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { memo } from 'react';
import { BASE_API_PATH } from '../../shared/api/endpoints';
import {
  SingleCharacterData,
  AllCharactersData,
} from '../../shared/api/types/types';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/reduxHooks';
import DataUploadError from '../../shared/ui/DataUploadError/DataUploadError';
import Spinner from '../../shared/ui/Spinner/Spinner';
import { toggleSelection } from '../../store/slices/selectionSlice';
import Input from '../../shared/ui/Input/Input';

function AllCharactersTable({
  data,
  error,
  isLoading,
}: AllCharactersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.selection.selectedItems);

  const isSelected = (id: number) => selected.some((item) => item.id === id);

  if (isLoading)
    return (
      <div className="flex-1 min-h-[calc(100vh-170px)]">
        <Spinner />
      </div>
    );

  if (error) {
    return <DataUploadError error={error} />;
  }

  if (!data || !data.results.length) {
    return <p>Nothing was found</p>;
  }

  return (
    <table className="relative m-3 flex-1 min-h-[600px] table-fixed">
      <thead>
        <tr>
          <th className="w-[200px]">Name</th>
          <th className="w-[100px]">Status</th>
          <th className="w-[180px]">Species</th>
          <th className="w-[50px]">Select</th>
        </tr>
      </thead>
      <tbody>
        {data.results.map((character: SingleCharacterData) => (
          <tr
            key={character.id}
            onClick={() => {
              const params = new URLSearchParams(searchParams?.toString());
              params.set('details', String(character.id));
              router.push(`/?${params.toString()}`);
            }}
            className="h-8 cursor-pointer hover:bg-slate-200 hover:dark:bg-slate-600 wrap"
          >
            <td>{character.name}</td>
            <td>{character.status}</td>
            <td>{character.species}</td>
            <td className="align-bottom">
              <Input
                type="checkbox"
                className="cursor-pointer w-5 h-5 m-0"
                checked={isSelected(character.id)}
                onChange={() =>
                  dispatch(
                    toggleSelection({
                      id: character.id,
                      name: character.name,
                      description: character.status,
                      detailUrl: `${BASE_API_PATH}${character.id}`,
                    })
                  )
                }
              />
            </td>
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
