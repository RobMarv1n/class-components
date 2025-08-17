import type { Metadata } from 'next';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from '../providers';
import Header from '../../shared/ui/Header/Header';

export const metadata: Metadata = {
  title: 'Rick and Morty Characters App',
  description:
    'My app for searching and viewing characters from the Rick and Morty universe',
};

export default async function LocaleLayout({
  children,
  details,
  params,
}: RootParams) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head></head>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <div className="w-full shadow-md fixed top-0 left-0 z-50">
              <Header />
            </div>
            <main className="flex justify-center mt-20">{children}</main>
            <aside>{details}</aside>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

type RootParams = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
  details: React.ReactNode;
};
