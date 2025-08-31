export function SkeletonTable() {
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
    <div className="min-h-screen flex flex-col bg-gray-950 min-w-[900px]">
      <div className="sticky top-0 z-30 bg-gray-900 shadow-md p-3 flex gap-2">
        <div className="flex-1 h-10 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-36 bg-gray-700 rounded animate-pulse" />
      </div>

      <div className="flex-1 overflow-auto">
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
      </div>
    </div>
  );
}
