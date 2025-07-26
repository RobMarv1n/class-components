import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary';
import DetailedCharacterLayout from '../pages/main/ui/DetailedCharacterLayout';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import AboutPage from '../pages/About/AboutPage';

function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route
                path="character/:id"
                element={<DetailedCharacterLayout />}
              />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
