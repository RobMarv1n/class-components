import { useEffect, useState, useRef } from 'react';
import type { CountryData, FullData } from '../../../shared/types/types';

const EXTRA_FIELDS = [
  { key: 'cement_co2', label: 'Cement CO₂' },
  { key: 'oil_co2', label: 'Oil CO₂' },
  { key: 'methane', label: 'Methane' },
  { key: 'temperature_change_from_co2', label: 'Temp change from CO₂' },
];

export default function CountryTable() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [displayed, setDisplayed] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(2015);
  const [showModal, setShowModal] = useState(false);
  const [extraFields, setExtraFields] = useState<string[]>([]);

  const perPage = 50;
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://1arseniy.github.io/dataCountries/co2-data.json'
        );
        const raw = await res.json();
        const normalized: CountryData[] = Object.entries(raw as FullData).map(
          ([countryName, data]) => ({
            country: countryName,
            iso_code: data.iso_code,
            data: data.data || [],
          })
        );

        setCountries(normalized);
        setDisplayed(normalized.slice(0, perPage));
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = countries.filter((c) =>
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setDisplayed(filteredCountries.slice(0, perPage));
  }, [search, countries]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayed((prev) => {
            if (prev.length >= filteredCountries.length) return prev;
            const nextData = filteredCountries.slice(
              prev.length,
              prev.length + perPage
            );
            return [...prev, ...nextData];
          });
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [filteredCountries]);

  const toggleExtraField = (field: string) => {
    setExtraFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <div className="sticky top-0 z-30 bg-gray-900 shadow-md p-3 flex gap-2">
        <input
          type="text"
          placeholder="🔍 Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 2022 - 1750 + 1 }, (_, i) => 1750 + i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
        >
          ⚙️ Extra columns
        </button>
      </div>

      {loading ? (
        <div className="p-4 text-gray-400 italic">⏳ Loading table...</div>
      ) : (
        <>
          <table className="min-w-full border border-gray-700 text-sm text-gray-100 border-separate">
            <thead className="bg-gray-900 z-20">
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
                {extraFields.map((field) => (
                  <th
                    key={field}
                    className="px-3 py-2 border border-gray-700 w-40"
                  >
                    {EXTRA_FIELDS.find((f) => f.key === field)?.label ?? field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td
                    colSpan={6 + extraFields.length}
                    className="text-center py-6 text-gray-400"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                displayed.map((country) =>
                  country.data
                    .filter((row) => row.year === selectedYear)
                    .map((row) => (
                      <tr
                        key={`${country.country}-${row.year}`}
                        className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {country.iso_code ?? 'N/A'}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {country.country}
                        </td>
                        <td className="px-3 py-2 border border-gray-700">
                          {row.year}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {row.population ?? 'N/A'}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {row.co2 ?? 'N/A'}
                        </td>
                        <td className="px-3 py-2 border border-gray-700 truncate">
                          {row.co2_per_capita ?? 'N/A'}
                        </td>
                        {extraFields.map((field) => (
                          <td
                            key={field}
                            className="px-3 py-2 border border-gray-700 truncate"
                          >
                            {(row as any)[field] ?? 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))
                )
              )}
            </tbody>
          </table>
          <div ref={loaderRef} className="h-10"></div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg text-white mb-4">Select extra columns</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {EXTRA_FIELDS.map((f) => (
                <label
                  key={f.key}
                  className="flex items-center gap-2 text-gray-200"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={extraFields.includes(f.key)}
                    onChange={() => toggleExtraField(f.key)}
                  />
                  {f.label}
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
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
