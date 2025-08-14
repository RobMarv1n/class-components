import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick and Morty Characters App',
  description:
    'My app for searching and viewing characters from the Rick and Morty universe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Rick and Morty Characters</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
