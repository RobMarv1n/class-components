import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { clearSelection } from '../../../../store/slices/selectionSlice';
import { downloadCsv } from './downloadCSV';

export default function SelectionToolbar() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.selection.selectedItems);

  if (!selected.length) return null;

  const handleClear = () => {
    dispatch(clearSelection());
  };

  const handleDownload = async () => {
    downloadCsv(selected, `${selected.length}_items.csv`, [
      'id',
      'name',
      'description',
      'detailUrl',
    ]);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <p>
        {selected.length} item{selected.length === 1 ? '' : 's'} selected
      </p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-[crimson] text-white rounded hover:bg-[#b22222] transition cursor-pointer"
        >
          Clear selection
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Download
        </button>
      </div>
    </div>
  );
}
