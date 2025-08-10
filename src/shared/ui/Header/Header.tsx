import { Link } from 'react-router-dom';
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
import ResetCacheButton from '../ResetCacheButton/ResetCacheButton';

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4">
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <div className="flex gap-2">
        <ToggleThemeButton />
        <ResetCacheButton />
      </div>
    </div>
  );
}
