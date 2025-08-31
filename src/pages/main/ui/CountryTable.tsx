import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import ExtraColumnsModal from './ExtraColumnsModal';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableColumnsHeader from './TableColumnsHeader';
import type { CountryData, FullData, SortOption } from '../model/types';
import { BASE_URL } from '../model/constants';

const EXTRA_FIELDS = [
  { key: 'cement_co2', label: 'Cement CO₂' },
  { key: 'oil_co2', label: 'Oil CO₂' },
  { key: 'methane', label: 'Methane' },
  { key: 'temperature_change_from_co2', label: 'Temperature change from CO₂' },
];

export default function CountryTable() {
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState<
    Record<string, boolean>
  >({});

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const loaderReference = useRef<HTMLDivElement>(null);
  const itemsPerPageCount = 50;
  const previousDataReference = useRef<Record<string, number | string | null>>(
    {}
  );
  const timeoutReference = useRef<NodeJS.Timeout | null>(null);
  const previousYearReference = useRef<number | null>(null);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const rawData: FullData = await response.json();
        const normalizedCountries: CountryData[] = Object.entries(rawData).map(
          ([countryName, countryData]) => ({
            country: countryName,
            iso_code: countryData.iso_code,
            data: countryData.data || [],
          })
        );
        setAllCountries(normalizedCountries);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    fetchCountriesData();
  }, []);

  const filteredCountries = useMemo(
    () =>
      allCountries.filter((country) =>
        country.country.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [allCountries, searchQuery]
  );

  const sortedCountries = useMemo(() => {
    const countriesCopy = [...filteredCountries];
    if (sortOption.startsWith('name')) {
      countriesCopy.sort((firstCountry, secondCountry) =>
        sortOption === 'name-asc'
          ? firstCountry.country.localeCompare(secondCountry.country)
          : secondCountry.country.localeCompare(firstCountry.country)
      );
    } else {
      countriesCopy.sort((firstCountry, secondCountry) => {
        const firstCountryPopulation =
          firstCountry.data.find((dataEntry) => dataEntry.year === selectedYear)
            ?.population ?? 0;
        const secondCountryPopulation =
          secondCountry.data.find(
            (dataEntry) => dataEntry.year === selectedYear
          )?.population ?? 0;
        return sortOption === 'population-asc'
          ? firstCountryPopulation - secondCountryPopulation
          : secondCountryPopulation - firstCountryPopulation;
      });
    }
    return countriesCopy;
  }, [filteredCountries, sortOption, selectedYear]);

  const visibleCountries = useMemo(
    () => sortedCountries.slice(0, currentPageNumber * itemsPerPageCount),
    [sortedCountries, currentPageNumber]
  );

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [searchQuery, sortOption, selectedYear]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPageNumber((previousPageNumber) =>
            previousPageNumber * itemsPerPageCount >= sortedCountries.length
              ? previousPageNumber
              : previousPageNumber + 1
          );
        }
      },
      { threshold: 0.1 }
    );
    if (loaderReference.current) observer.observe(loaderReference.current);
    return () => {
      if (loaderReference.current) observer.unobserve(loaderReference.current);
    };
  }, [sortedCountries]);

  useEffect(() => {
    if (previousYearReference.current === null) {
      previousYearReference.current = selectedYear;
      return;
    }
    if (previousYearReference.current === selectedYear) return;

    const newHighlightedCells: Record<string, boolean> = {};
    visibleCountries.forEach((country) => {
      const dataEntry = country.data.find(
        (entry) => entry.year === selectedYear
      );
      if (!dataEntry) return;

      ['population', 'co2', 'co2_per_capita', ...extraColumns].forEach(
        (fieldKey) => {
          const cellKey = `${country.country}-${fieldKey}`;
          const fieldValue = dataEntry[fieldKey as keyof typeof dataEntry];
          if (previousDataReference.current[cellKey] !== fieldValue) {
            newHighlightedCells[cellKey] = true;
          }
          previousDataReference.current[cellKey] = fieldValue ?? null;
        }
      );
    });

    if (Object.keys(newHighlightedCells).length > 0) {
      setHighlightedCells(newHighlightedCells);
      if (timeoutReference.current) clearTimeout(timeoutReference.current);
      timeoutReference.current = setTimeout(() => {
        setHighlightedCells({});
        timeoutReference.current = null;
      }, 1000);
    }

    previousYearReference.current = selectedYear;
  }, [selectedYear, visibleCountries, extraColumns]);

  const toggleExtraColumn = useCallback((fieldKey: string) => {
    setExtraColumns((previousExtraColumns) =>
      previousExtraColumns.includes(fieldKey)
        ? previousExtraColumns.filter((field) => field !== fieldKey)
        : [...previousExtraColumns, fieldKey]
    );
  }, []);

  const handleSearchQueryChange = useCallback(
    (newSearchQuery: string) => setSearchQuery(newSearchQuery),
    []
  );

  const handleSortOptionChange = useCallback(
    (newSortOption: SortOption) => setSortOption(newSortOption),
    []
  );

  const handleSelectedYearChange = useCallback(
    (newYear: number) => setSelectedYear(newYear),
    []
  );

  const tableRows = useMemo(() => {
    if (visibleCountries.length === 0) {
      return (
        <tr>
          <td
            colSpan={6 + extraColumns.length}
            className="text-center py-6 text-gray-400"
          >
            No data available
          </td>
        </tr>
      );
    }
    return visibleCountries.flatMap((country) =>
      country.data
        .filter((dataEntry) => dataEntry.year === selectedYear)
        .map((dataEntry) => (
          <TableRow
            key={`${country.country}-${dataEntry.year}`}
            country={country}
            entry={dataEntry}
            extraColumns={extraColumns}
            highlightedCells={highlightedCells}
          />
        ))
    );
  }, [visibleCountries, selectedYear, extraColumns, highlightedCells]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 min-w-[900px]">
      <TableHeader
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQueryChange}
        sortOption={sortOption}
        setSortOption={handleSortOptionChange}
        selectedYear={selectedYear}
        setSelectedYear={handleSelectedYearChange}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="flex-1 overflow-auto min-w-[900px]">
        <table className="min-w-full border border-gray-700 text-sm text-gray-100 border-separate">
          <thead className="bg-gray-900 sticky top-0 z-20">
            <tr>
              <TableColumnsHeader
                extraColumns={extraColumns}
                extraFields={EXTRA_FIELDS}
              />
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
        <div ref={loaderReference} className="h-10"></div>
      </div>

      {isModalOpen && (
        <ExtraColumnsModal
          fields={EXTRA_FIELDS}
          extraColumns={extraColumns}
          toggleExtraColumn={toggleExtraColumn}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
