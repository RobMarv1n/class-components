export function SkeletonTableBody() {
  const baseColumns = [
    'ISO',
    'Country',
    'Year',
    'Population',
    'CO₂',
    'CO₂ per capita',
  ];
  const columnWidths = [24, 48, 20, 40, 40, 40];
  const cellHeight = 38;

  return (
    <table className="min-w-full border border-gray-700 text-sm text-gray-100 border-separate">
      <thead className="bg-gray-900 sticky top-0 z-20">
        <tr>
          {baseColumns.map((col, index) => (
            <th
              key={col}
              className="px-3 py-2 border border-gray-700 text-center align-middle"
              style={{
                width: `${columnWidths[index]}px`,
                height: `${cellHeight}px`,
              }}
            >
              <div className="h-full flex items-center justify-center">
                {col}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 25 }).map((_, rowIndex) => (
          <tr key={rowIndex} className="odd:bg-gray-800 even:bg-gray-700">
            {baseColumns.map((_, idx) => (
              <td
                key={idx}
                className="px-3 py-2 border border-gray-700"
                style={{
                  width: `${columnWidths[idx]}px`,
                  height: `${cellHeight}px`,
                }}
              >
                <div className="h-full w-full bg-gray-600 rounded animate-pulse" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
