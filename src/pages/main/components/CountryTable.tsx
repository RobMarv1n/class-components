import { useEffect, useState, useRef } from 'react';
import type { CountryData, FullData } from '../../../shared/types/types';

const EXTRA_FIELDS = [
  { key: 'cement_co2', label: 'Cement CO₂' },
  { key: 'oil_co2', label: 'Oil CO₂' },
  { key: 'methane', label: 'Methane' },
  { key: 'temperature_change_from_co2', label: 'Temp change from CO₂' },
];

type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'population-asc'
  | 'population-desc';

export default function CountryTable() {
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const loaderReference = useRef<HTMLDivElement>(null);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://1arseniy.github.io/dataCountries/co2-data.json'
        );
        const rawData = await response.json();
        const normalizedCountries: CountryData[] = Object.entries(
          rawData as FullData
        ).map(([countryName, countryData]) => ({
          country: countryName,
          iso_code: countryData.iso_code,
          data: countryData.data || [],
        }));
        setAllCountries(normalizedCountries);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = allCountries.filter((country) =>
    country.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCountries = [...filteredCountries].sort((countryA, countryB) => {
    if (sortOption.startsWith('name')) {
      return sortOption === 'name-asc'
        ? countryA.country.localeCompare(countryB.country)
        : countryB.country.localeCompare(countryA.country);
    } else {
      const populationA =
        countryA.data.find((entry) => entry.year === selectedYear)
          ?.population ?? 0;
      const populationB =
        countryB.data.find((entry) => entry.year === selectedYear)
          ?.population ?? 0;
      return sortOption === 'population-asc'
        ? populationA - populationB
        : populationB - populationA;
    }
  });

  const visibleCountries = sortedCountries.slice(0, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption, selectedYear]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((previousPage) => {
            if (previousPage * itemsPerPage >= sortedCountries.length) {
              return previousPage;
            }
            return previousPage + 1;
          });
        }
      },
      { threshold: 0.1 }
    );
    if (loaderReference.current) {
      observer.observe(loaderReference.current);
    }
    return () => {
      if (loaderReference.current) {
        observer.unobserve(loaderReference.current);
      }
    };
  }, [sortedCountries]);

  const toggleExtraColumn = (fieldKey: string) => {
    setExtraColumns((previousColumns) =>
      previousColumns.includes(fieldKey)
        ? previousColumns.filter((field) => field !== fieldKey)
        : [...previousColumns, fieldKey]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
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
          className="p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600"
        >
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
          <option value="population-asc">Population ↑</option>
          <option value="population-desc">Population ↓</option>
        </select>
        <select
          value={selectedYear}
          onChange={(event) => setSelectedYear(Number(event.target.value))}
          className="p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600"
        >
          {Array.from(
            { length: 2023 - 1750 + 1 },
            (_, index) => 1750 + index
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
        >
          ⚙️ Extra columns
        </button>
      </div>

      {isLoading ? (
        <div className="p-4 text-gray-400 italic">⏳ Loading table...</div>
      ) : (
        <div className="flex-1 overflow-auto">
          <table className="min-w-full border border-gray-700 text-sm text-gray-100 border-separate">
            <thead className="bg-gray-900 sticky top-0 z-20">
              <tr>
                <th className="px-3 py-2 border border-gray-700 w-24">ISO</th>
                <th className="px-3 py-2 border border-gray-700 w-48">
                  Country
                </th>
                <th className="px-3 py-2 border border-gray-700 w-20">Year</th>
                <th className="px-3 py-2 border border-gray-700 w-40">
                  Population
                </th>
                <th className="px-3 py-2 border border-gray-700 w-40">CO₂</th>
                <th className="px-3 py-2 border border-gray-700 w-40">
                  CO₂ per capita
                </th>
                {extraColumns.map((fieldKey) => (
                  <th
                    key={fieldKey}
                    className="px-3 py-2 border border-gray-700 w-40"
                  >
                    {EXTRA_FIELDS.find((field) => field.key === fieldKey)
                      ?.label ?? fieldKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleCountries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6 + extraColumns.length}
                    className="text-center py-6 text-gray-400"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                visibleCountries.map((country) =>
                  country.data
                    .filter((entry) => entry.year === selectedYear)
                    .map((entry) => (
                      <tr
                        key={`${country.country}-${entry.year}`}
                        className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {country.iso_code ?? 'N/A'}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {country.country}
                        </td>
                        <td className="px-3 py-2 border border-gray-700">
                          {entry.year}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {entry.population ?? 'N/A'}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {entry.co2 ?? 'N/A'}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {entry.co2_per_capita ?? 'N/A'}
                        </td>
                        {extraColumns.map((fieldKey) => (
                          <td
                            key={fieldKey}
                            className="px-3 py-2 border border-gray-700 truncate"
                          >
                            {(entry as any)[fieldKey] ?? 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))
                )
              )}
            </tbody>
          </table>
          <div ref={loaderReference} className="h-10"></div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg text-white mb-4">Select extra columns</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {EXTRA_FIELDS.map((field) => (
                <label
                  key={field.key}
                  className="flex items-center gap-2 text-gray-200"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={extraColumns.includes(field.key)}
                    onChange={() => toggleExtraColumn(field.key)}
                  />
                  {field.label}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 cursor-pointer"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
