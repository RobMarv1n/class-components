import { SelectedItem } from '../../../store/slices/selectionSlice';

export async function downloadCsv(
  selected: SelectedItem[],
  filename: string,
  headers: string[]
) {
  const res = await fetch('/api/csv-download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: selected,
      headers,
      filename,
    }),
  });

  if (!res.ok) {
    console.error('Generation CSV error');
    return;
  }

  const blob = await res.blob();
  const url = globalThis.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  globalThis.URL.revokeObjectURL(url);
}
