import React from 'react';
import type { SortOption } from '../model/types';
import { MIN_DATA_YEAR, YEARS_COUNT } from '../model/constants';

const TableHeader = React.memo(function TableHeader({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  selectedYear,
  setSelectedYear,
  onOpenModal,
}: TableHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-gray-900 shadow-md p-3 flex gap-2">
      <input
        type="text"
        placeholder="🔍 Search country..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="flex-1 p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value as SortOption)}
        className="p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 cursor-pointer"
      >
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="population-asc">Population ↑</option>
        <option value="population-desc">Population ↓</option>
      </select>
      <select
        value={selectedYear}
        onChange={(event) => setSelectedYear(Number(event.target.value))}
        className="p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 cursor-pointer"
      >
        {Array.from({ length: YEARS_COUNT }, (_, i) => MIN_DATA_YEAR + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
      <button
        onClick={onOpenModal}
        className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
      >
        ⚙️ Extra columns
      </button>
    </div>
  );
});

type TableHeaderProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  onOpenModal: () => void;
};

export default TableHeader;
