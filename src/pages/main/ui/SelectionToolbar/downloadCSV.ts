import { saveAs } from 'file-saver';

export function downloadCsv<T>(
  items: T[],
  filename: string,
  headers: (keyof T)[]
) {
  const csvRows = [
    headers,
    ...items.map((item) => headers.map((header) => String(item[header] ?? ''))),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
}
