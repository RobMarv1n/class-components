import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import Button from '../Button/Button';
import { routing } from '../../../i18n/routing';

type Locale = (typeof routing.locales)[number];

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && routing.locales.includes(value as Locale);
}

export default function ToggleLanguageButton() {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString() ?? '';
  const localeFromHook = useLocale();
  const [isPending, startTransition] = useTransition();

  const currentLocale: Locale = isLocale(localeFromHook)
    ? localeFromHook
    : routing.defaultLocale;

  const nextLocale: Locale =
    currentLocale === routing.locales[0]
      ? routing.locales[1]
      : routing.locales[0];

  const toggleLanguage = () => {
    let newPath = pathname.replace(
      new RegExp(`^/(${routing.locales.join('|')})(?=/|$)`),
      ''
    );

    if (newPath === '' || newPath === '/') {
      newPath = `/${nextLocale}`;
    } else {
      newPath = `/${nextLocale}${newPath}`;
    }

    const finalUrl = `${newPath}${queryString ? `?${queryString}` : ''}`;

    startTransition(() => {
      router.replace(finalUrl);
    });
  };

  return (
    <Button className="w-15" onClick={toggleLanguage} disabled={isPending}>
      {nextLocale.toUpperCase()}
    </Button>
  );
}
