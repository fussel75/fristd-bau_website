import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FriStD-Bau ZuB GmbH & Co. KG — Zimmerei, Dachdeckerei & Baufirma in Hamburg',
  description:
    'Holzbau vom Feinsten: Neubau, Anbau, Sanierung, Dach, Energetik und Innenausbau aus einer Hand. FriStD-Bau in Hamburg-Bramfeld.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Hanken+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
