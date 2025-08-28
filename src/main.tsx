import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './app/App';

const root = document.querySelector('#root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
