import { useNavigate, Outlet } from 'react-router-dom';
import { useCallback } from 'react';

import Pagination from './ui/Pagination/Pagination';
import SearchBox from './ui/SearchBox/SearchBox';
import { AllCharactersTable } from './ui/AllCharactersTable';
import { useCharactersSearch } from './hooks/useCharactersSearch';

export function MainPage() {
  const {
    result,
    error,
    isLoading,
    lastQuery,
    currentPage,
    totalPages,
    handleSearch,
    setSearchParameters,
  } = useCharactersSearch();

  const navigate = useNavigate();

  const handlePageChange = useCallback(
    (page: number) => {
      const parameters = new URLSearchParams(location.search);
      parameters.set('page', page.toString());
      setSearchParameters(parameters);
      navigate(`/?${parameters.toString()}`);
    },
    [setSearchParameters, navigate]
  );

  const handleSelectCharacter = useCallback(
    (id: number) => {
      navigate(`/character/${id}?page=${currentPage}`);
    },
    [navigate, currentPage]
  );

  const handleSearchWithReset = useCallback(
    (query: string) => handleSearch(query, { resetPage: true }),
    [handleSearch]
  );

  return (
    <section className="main-page">
      <SearchBox onSearch={handleSearchWithReset} initialQuery={lastQuery} />
      <div style={{ display: 'flex', width: 650, height: 700 }}>
        {!isLoading && (
          <AllCharactersTable
            data={result}
            error={error}
            onSelectCharacter={handleSelectCharacter}
          />
        )}
        <Outlet />
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPageNumber={currentPage}
          totalPageCount={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

export default MainPage;
