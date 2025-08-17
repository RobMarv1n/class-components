import { useEffect, type ReactNode } from 'react';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { ThemeContext } from './ThemeContext';

type Theme = 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useLocalStorage<Theme>('app-theme', 'light');

  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
