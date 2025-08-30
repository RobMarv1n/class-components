import { useEffect, useState, useRef } from 'react';
import type { CountryData, FullData } from '../../../shared/types/types';

export default function CountryTable() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [displayed, setDisplayed] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
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
        console.error('Download error:', err);
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

  return (
    <div className="min-h-screen flex flex-col items-stretch bg-gray-950">
      <div className="sticky top-0 bg-gray-900 z-30 p-3 shadow-md">
        <input
          type="text"
          placeholder="🔍 Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="p-4 text-gray-400 italic">⏳ Loading table...</div>
      ) : (
        <div className="overflow-x-auto flex-1 p-2">
          <table className="min-w-full border border-gray-700 text-sm text-gray-100 table-fixed">
            <thead className="bg-gray-900 text-gray-50 top-[56px] z-20">
              <tr>
                <th className="px-3 py-2 border border-gray-700 text-left w-24">
                  ISO
                </th>
                <th className="px-3 py-2 border border-gray-700 text-left w-48">
                  Country
                </th>
                <th className="px-3 py-2 border border-gray-700 text-left w-20">
                  Year
                </th>
                <th className="px-3 py-2 border border-gray-700 text-left w-40">
                  Population
                </th>
                <th className="px-3 py-2 border border-gray-700 text-left w-40">
                  CO₂
                </th>
                <th className="px-3 py-2 border border-gray-700 text-left w-40">
                  CO₂ per capita
                </th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No data available
                  </td>
                </tr>
              ) : (
                displayed.map((country) =>
                  country.data
                    .filter((row) => row.year === 2015)
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
                      </tr>
                    ))
                )
              )}
            </tbody>
          </table>
          <div ref={loaderRef} className="h-10"></div>
        </div>
      )}
    </div>
  );
}
