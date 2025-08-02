import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './app/styles/main.css';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const root = document.querySelector('#root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
}
