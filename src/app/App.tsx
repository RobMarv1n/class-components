import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary';
import DetailedCharacterLayout from '../pages/main/ui/DetailedCharacterLayout';

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              {/* <Route path="page" element={<AllCharactersPage />} /> */}
              <Route
                path="character/:id"
                element={<DetailedCharacterLayout />}
              />
            </Route>
            {/* <Route path="/about" element={<AboutPage />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
