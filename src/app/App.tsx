import MainPage from '../pages/main/MainPage';
import { ErrorBoundary } from './providers/ErrorBoundary/ErrorBoundary';
import './styles/App.css';

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
