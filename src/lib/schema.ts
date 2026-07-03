/**
 * Zentrale Schema.org / JSON-LD Definitionen fuer die Website.
 * Wird von JsonLd-Component ins HTML injiziert und von Google, Bing,
 * ChatGPT, Perplexity etc. maschinenlesbar ausgewertet.
 */

export const SITE_URL = 'https://neu.fristd-bau.com';
export const SITE_NAME = 'FriStD-Bau ZuB GmbH & Co. KG';

// Basis-Adresse (mehrfach genutzt)
const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Haldesdorfer Str. 44',
  addressLocality: 'Hamburg',
  addressRegion: 'Hamburg',
  postalCode: '22179',
  addressCountry: 'DE',
};

const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 53.6018,
  longitude: 10.0822,
};

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  },
];

// Ronny Friedrich als Person (E-E-A-T Signal)
const RONNY = {
  '@type': 'Person',
  name: 'Ronny Friedrich',
  jobTitle: 'Zimmerermeister',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Meisterbrief',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Handwerkskammer Hamburg',
    },
  },
  worksFor: { '@id': `${SITE_URL}/#business` },
};

// Haupt-Business-Objekt — mit mehrfachen Typen (Handwerksbetrieb deckt mehrere ab)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'RoofingContractor', 'HVACBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: 'FriStD-Bau',
  legalName: 'FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Meisterbetrieb für Zimmerei, Dachdeckerei sowie Heizungs- & Sanitärbau in Hamburg-Bramfeld. Drei Meister-Disziplinen unter einem Dach — vom Bauantrag bis zur Wärmepumpe.',
  slogan: 'Wir bauen. Vom Feinsten.',
  url: SITE_URL,
  logo: `${SITE_URL}/fristd-logo.jpg`,
  image: `${SITE_URL}/fristd-logo.jpg`,
  telephone: '+49-40-38674565',
  email: 'post@fristd-bau.com',
  address: POSTAL_ADDRESS,
  geo: GEO,
  openingHoursSpecification: OPENING_HOURS,
  foundingDate: '2011',
  founder: RONNY,
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'Handwerkskammer-Betriebsnummer',
      value: '957768',
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'HRA',
      value: 'HRA 112897',
    },
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Hamburg',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Metropolregion Hamburg',
    },
  ],
  knowsAbout: [
    'Zimmerei',
    'Holzbau',
    'Holzrahmenbau',
    'Aufstockung',
    'Dachdeckerei',
    'Klempnerei',
    'Wärmepumpen',
    'Heizungsbau',
    'Sanitärtechnik',
    'Photovoltaik',
    'Energieberatung',
    'Bauantrag',
    'Statik',
    'Erdbau',
    'Hausanschlüsse',
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Meisterbetrieb',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Handwerkskammer Hamburg',
    },
  },
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Zimmerei & Holzbau' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dachdeckerei & Klempnerei' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wärmepumpen, Heizung & Sanitär' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Planung & Bauantrag' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Energieberatung (KfW/BAFA/IFB)' } },
  ],
  sameAs: [
    // TODO: Google Business Profile, Facebook, Instagram, LinkedIn - hier eintragen wenn vorhanden
  ],
  priceRange: '€€',
  paymentAccepted: 'Überweisung, Rechnung',
};

// WebSite-Schema (fuer Sitelinks Searchbox)
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'de-DE',
  publisher: { '@id': `${SITE_URL}/#business` },
};

// Breadcrumb-Helper
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

// FAQ-Helper
export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

// Service-Helper (fuer jede Leistung)
export function serviceSchema(name: string, description: string, url: string, items: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: [{ '@type': 'City', name: 'Hamburg' }],
    url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name,
      itemListElement: items.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

// JobPosting-Helper
export function jobPostingSchema(job: {
  title: string;
  description: string;
  employmentType?: string; // FULL_TIME | PART_TIME | CONTRACTOR | ...
  datePosted?: string;
  validThrough?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    employmentType: job.employmentType || 'FULL_TIME',
    datePosted: job.datePosted || new Date().toISOString().split('T')[0],
    validThrough: job.validThrough,
    hiringOrganization: {
      '@type': 'Organization',
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/fristd-logo.jpg`,
    },
    jobLocation: {
      '@type': 'Place',
      address: POSTAL_ADDRESS,
    },
    directApply: false,
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'DE',
    },
  };
}
