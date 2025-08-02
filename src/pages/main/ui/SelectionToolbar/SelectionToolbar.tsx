import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { clearSelection } from '../../../../store/slices/selectionSlice';
import { saveAs } from 'file-saver';

export default function SelectionToolbar() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.selection.selectedItems);

  if (!selected.length) return null;

  const handleClear = () => dispatch(clearSelection());

  const handleDownload = () => {
    const csvRows = [
      ['ID', 'Name', 'Description', 'Detail URL'],
      ...selected.map((item) => [
        item.id,
        item.name,
        item.description,
        item.detailUrl,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selected.length}_items.csv`);
  };

  return (
    <div
      style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <p>
          {selected.length} item{selected.length === 1 ? '' : 's'} selected
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={handleClear}>Clear selection</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}
