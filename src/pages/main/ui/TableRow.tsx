import React from 'react';
import type { CountryData } from '../model/types';

const TableRow = React.memo(function TableRow({
  country,
  entry,
  extraColumns,
  highlightedCells,
}: TableRowProps) {
  return (
    <tr className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 transition-colors">
      <td className="px-3 py-2 border border-gray-700 truncate">
        {country.iso_code ?? 'N/A'}
      </td>
      <td className="px-3 py-2 border border-gray-700 truncate">
        {country.country}
      </td>
      <td className="px-3 py-2 border border-gray-700">{entry.year}</td>
      <td
        className={`px-3 py-2 border border-gray-700 truncate transition-colors duration-500 ${
          highlightedCells[`${country.country}-population`] ? 'bg-blue-500' : ''
        }`}
      >
        {entry.population ?? 'N/A'}
      </td>
      <td
        className={`px-3 py-2 border border-gray-700 truncate transition-colors duration-500 ${
          highlightedCells[`${country.country}-co2`] ? 'bg-blue-500' : ''
        }`}
      >
        {entry.co2 ?? 'N/A'}
      </td>
      <td
        className={`px-3 py-2 border border-gray-700 truncate transition-colors duration-500 ${
          highlightedCells[`${country.country}-co2_per_capita`]
            ? 'bg-blue-500'
            : ''
        }`}
      >
        {entry.co2_per_capita ?? 'N/A'}
      </td>
      {extraColumns.map((fieldKey) => (
        <td
          key={fieldKey}
          className={`px-3 py-2 border border-gray-700 truncate transition-colors duration-500 ${
            highlightedCells[`${country.country}-${fieldKey}`]
              ? 'bg-blue-500'
              : ''
          }`}
        >
          {entry[fieldKey as keyof typeof entry] ?? 'N/A'}
        </td>
      ))}
    </tr>
  );
});

type TableRowProps = {
  country: CountryData;
  entry: CountryData['data'][number];
  extraColumns: string[];
  highlightedCells: Record<string, boolean>;
};

export default TableRow;
