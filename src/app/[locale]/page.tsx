'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCharactersSearch } from '../../pages/main/hooks/useCharactersSearch';
import AllCharactersTable from '../../pages/main/ui/AllCharactersTable';
import Pagination from '../../pages/main/ui/Pagination/Pagination';
import SearchBox from '../../pages/main/ui/SearchBox/SearchBox';
import SelectionToolbar from '../../pages/main/ui/SelectionToolbar/SelectionToolbar';
import DetailedCharacterLayout from './@details/character/[id]/page';

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
