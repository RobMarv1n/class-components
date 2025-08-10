import { useNavigate, Outlet } from 'react-router-dom';
import { useCallback } from 'react';
import Pagination from './ui/Pagination/Pagination';
import SearchBox from './ui/SearchBox/SearchBox';
import { useCharactersSearch } from './hooks/useCharactersSearch';
import AllCharactersTable from './ui/AllCharactersTable';
import SelectionToolbar from './ui/SelectionToolbar/SelectionToolbar';
import Header from '../../shared/ui/Header/Header';

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

  return (
    <section className="main-page">
      <Header />
      <SearchBox onSearch={handleSearch} initialQuery={lastQuery} />
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
