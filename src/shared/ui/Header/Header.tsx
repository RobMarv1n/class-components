import { Link } from 'react-router-dom';
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';

export default function Header() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <ToggleThemeButton />
    </>
  );
}
