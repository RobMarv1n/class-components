import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { items, headers, filename } = await req.json();

  const csvRows = [
    headers.join(','),
    ...items.map((item: Record<string, unknown>) =>
      headers.map((header: string) => String(item[header] ?? '')).join(',')
    ),
  ];

  const csvContent = csvRows.join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
