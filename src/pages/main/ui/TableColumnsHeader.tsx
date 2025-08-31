import React from 'react';

const TableColumnsHeader = React.memo(function TableColumnsHeader({
  extraColumns,
  extraFields,
}: TableColumnsHeaderProps) {
  return (
    <>
      <th className="px-3 py-2 border border-gray-700 w-24 text-center">ISO</th>
      <th className="px-3 py-2 border border-gray-700 w-48 text-center">
        Country
      </th>
      <th className="px-3 py-2 border border-gray-700 w-20 text-center">
        Year
      </th>
      <th className="px-3 py-2 border border-gray-700 w-40 text-center">
        Population
      </th>
      <th className="px-3 py-2 border border-gray-700 w-40 text-center">CO₂</th>
      <th className="px-3 py-2 border border-gray-700 w-40 text-center">
        CO₂ per capita
      </th>
      {extraColumns.map((fieldKey) => (
        <th
          key={fieldKey}
          className="px-3 py-2 border border-gray-700 w-40 text-center"
        >
          {extraFields.find((field) => field.key === fieldKey)?.label ??
            fieldKey}
        </th>
      ))}
    </>
  );
});

type TableColumnsHeaderProps = {
  extraColumns: string[];
  extraFields: { key: string; label: string }[];
};

export default TableColumnsHeader;
