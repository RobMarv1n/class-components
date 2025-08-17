'use client';

import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
import ResetCacheButton from '../ResetCacheButton/ResetCacheButton';
import { Link, usePathname } from '../../../i18n/navigation';
import { useTranslations } from 'next-intl';
import ToggleLanguageButton from '../ToggleLanguageButton/ToggleLanguageButton';

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row justify-around items-center p-4">
      <nav className="flex flex-wrap gap-4 w-30 text-gray-700 dark:text-gray-200 font-medium">
        <Link
          href="/"
          className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
            pathname === '/' ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {t('home')}
        </Link>
        <Link
          href="/about"
          className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
            pathname === '/about' ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {t('about')}
        </Link>
      </nav>
      <div className="flex gap-2">
        <ToggleThemeButton />
        <ResetCacheButton />
        <ToggleLanguageButton />
      </div>
    </div>
  );
}
