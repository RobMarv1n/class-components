import Button from '../../../shared/ui/Button/Button';
import { useTheme } from '../../providers/ThemeProvider/useTheme';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
