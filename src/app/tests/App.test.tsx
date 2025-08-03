import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from '../App';
import { renderWithProviders } from '../../shared/mocks/renderFunctions';

function setRoute(route: string) {
  globalThis.history.pushState({}, 'Test page', route);
}

describe('App routing', () => {
  test('Should render MainPage on default route "/"', () => {
    setRoute('/');
    renderWithProviders(<App />);
    expect(screen.getByText(/home/i)).toBeDefined();
  });

  test('Should render DetailedCharacterLayout on route "/character/:id"', () => {
    setRoute('/character/123');
    renderWithProviders(<App />);
    expect(screen.getByText(/character/i)).toBeDefined();
  });

  test('Should render AboutPage on route "/about"', () => {
    setRoute('/about');
    renderWithProviders(<App />);
    expect(screen.getByText(/about/i)).toBeDefined();
  });

  test('Should render NotFoundPage on unknown route', () => {
    setRoute('/some/unknown/path');
    renderWithProviders(<App />);
    expect(screen.getByText(/not found/i)).toBeDefined();
  });
});
