import MainPage from '../pages/main/MainPage';
import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </>
  );
}

export default App;
