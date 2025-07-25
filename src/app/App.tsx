import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
