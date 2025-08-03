import { useNavigate, Outlet } from 'react-router-dom';
import { useCallback } from 'react';
import Pagination from './ui/Pagination/Pagination';
import SearchBox from './ui/SearchBox/SearchBox';
import { useCharactersSearch } from './hooks/useCharactersSearch';
import Header from '../../widgets/ui/Header/Header';
import AllCharactersTable from './ui/AllCharactersTable';
import SelectionToolbar from './ui/SelectionToolbar/SelectionToolbar';

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

  const handleSearchWithReset = useCallback(
    (query: string) => handleSearch(query, { resetPage: true }),
    [handleSearch]
  );

  return (
    <section className="main-page">
      <Header />
      <SearchBox onSearch={handleSearchWithReset} initialQuery={lastQuery} />
      <div style={{ display: 'flex' }}>
        <AllCharactersTable data={result} error={error} isLoading={isLoading} />
        <Outlet />
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

export default MainPage;
