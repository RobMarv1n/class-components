'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import DetailedCharacterLayout from './@details/character/[id]/page';
import AllCharactersTable from '../../components/main-page/AllCharactersTable';
import Pagination from '../../components/main-page/Pagination/Pagination';
import SearchBox from '../../components/main-page/SearchBox/SearchBox';
import SelectionToolbar from '../../components/main-page/SelectionToolbar/SelectionToolbar';
import { useCharactersSearch } from '../../shared/hooks/useCharactersSearch';

export default function MainPage() {
  const {
    result,
    error,
    isLoading,
    lastQuery,
    currentPage,
    totalPages,
    handleSearch,
  } = useCharactersSearch();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('page', page.toString());
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <section className="h-full flex flex-col">
      <SearchBox onSearch={handleSearch} initialQuery={lastQuery} />
      <div className="flex flex-1">
        <AllCharactersTable data={result} error={error} isLoading={isLoading} />
        <DetailedCharacterLayout />
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPageNumber={currentPage}
          totalPageCount={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <SelectionToolbar />
    </section>
  );
}
