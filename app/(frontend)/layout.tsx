import type { Metadata } from 'next';
import './globals.css';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  localBusinessSchema,
  websiteSchema,
  SITE_URL,
  SITE_NAME,
} from '@/src/lib/schema';

const OG_IMAGE = `${SITE_URL}/fristd-logo.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Zimmerei, Dachdeckerei, Heizung & Sanitär in Hamburg`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Meisterbetrieb für Zimmerei, Dachdeckerei sowie Heizungs- & Sanitärbau in Hamburg-Bramfeld. Drei Meister-Disziplinen unter einem Dach — Wärmepumpen, Holzbau, Dach. Vom Bauantrag bis zur Fertigstellung.',
  keywords: [
    'Zimmerei Hamburg',
    'Dachdeckerei Hamburg',
    'Wärmepumpe Hamburg',
    'Holzbau Hamburg',
    'Heizungsbau Bramfeld',
    'Sanitär Hamburg',
    'Meisterbetrieb Hamburg',
    'Bauantrag Hamburg',
    'Stiebel-Eltron Partner',
    'Aufstockung Holz',
    'Photovoltaik Hamburg',
    'Energieberatung KfW BAFA',
    'FriStD-Bau',
  ],
  authors: [{ name: 'Ronny Friedrich', url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Meisterbetrieb Hamburg`,
    description:
      'Zimmerei, Dachdeckerei, Heizung & Sanitär. Drei Meister-Disziplinen unter einem Dach in Hamburg-Bramfeld.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Meisterbetrieb Hamburg`,
    description:
      'Zimmerei, Dachdeckerei, Heizung & Sanitär. Drei Meister-Disziplinen unter einem Dach.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'construction',
  verification: {
    google: 'WT9zXEH9lNUyKmEbf2ljf7vjEBFMlFSa82uxj3Utvvk',
  },
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Hanken+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="geo.region" content="DE-HH" />
        <meta name="geo.placename" content="Hamburg-Bramfeld" />
        <meta name="geo.position" content="53.6018;10.0822" />
        <meta name="ICBM" content="53.6018, 10.0822" />
        {/* Globale Schema.org Daten — auf jeder Seite mitgeliefert */}
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
