import { useEffect, useState, useRef } from 'react';
import type { CountryData, FullData } from '../../../shared/types/types';

export default function CountryTable() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [displayed, setDisplayed] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setDisplayed((prev) => {
            if (prev.length >= countries.length) return prev;
            const nextData = countries.slice(
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
  }, [countries]);

  if (loading) {
    return (
      <div className="p-4 text-gray-400 italic">⏳ Загрузка таблицы...</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 text-sm text-gray-100">
        <thead className="bg-gray-900 text-gray-50">
          <tr>
            <th className="px-3 py-2 border border-gray-700 text-left">ISO</th>
            <th className="px-3 py-2 border border-gray-700 text-left">
              Country
            </th>
            <th className="px-3 py-2 border border-gray-700 text-left">Year</th>
            <th className="px-3 py-2 border border-gray-700 text-left">
              Population
            </th>
            <th className="px-3 py-2 border border-gray-700 text-left">CO₂</th>
            <th className="px-3 py-2 border border-gray-700 text-left">
              CO₂ per capita
            </th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((country) =>
            country.data
              .filter((row) => row.year === 2015)
              .map((row) => (
                <tr
                  key={`${country.country}-${row.year}`}
                  className="odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <td className="px-3 py-2 border border-gray-700">
                    {country.iso_code ?? 'N/A'}
                  </td>
                  <td className="px-3 py-2 border border-gray-700">
                    {country.country}
                  </td>
                  <td className="px-3 py-2 border border-gray-700">
                    {row.year}
                  </td>
                  <td className="px-3 py-2 border border-gray-700">
                    {row.population ?? 'N/A'}
                  </td>
                  <td className="px-3 py-2 border border-gray-700">
                    {row.co2 ?? 'N/A'}
                  </td>
                  <td className="px-3 py-2 border border-gray-700">
                    {row.co2_per_capita ?? 'N/A'}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}
