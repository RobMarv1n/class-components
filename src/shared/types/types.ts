export type YearlyData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
};

export type CountryData = {
  country: string;
  iso_code?: string;
  data: YearlyData[];
};

export type RawCountryData = {
  iso_code?: string;
  data: YearlyData[];
};

export type FullData = Record<string, RawCountryData>;
