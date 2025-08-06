import { useTheme } from '../../../app/providers/ThemeProvider/useTheme';
import Button from '../../../shared/ui/Button/Button';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
