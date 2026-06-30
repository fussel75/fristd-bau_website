import 'server-only';
import { getPayload } from './payload';

// Gibt entweder den CMS-Wert zurueck, oder den Fallback wenn der CMS-Wert null/leer ist.
function fallback<T>(value: T | null | undefined, fb: T): T {
  if (value === null || value === undefined) return fb;
  if (typeof value === 'string' && value.trim() === '') return fb;
  return value;
}

export type MediaShape = {
  url?: string | null;
  alt?: string | null;
  sizes?: Record<string, { url?: string | null; width?: number; height?: number }>;
};

// URL zu einem Media-Eintrag mit optionaler Groessen-Variante (thumbnail/card/hero/full).
// Faellt auf das Original zurueck wenn die Groesse fehlt.
export function mediaUrl(m: MediaShape | null | undefined, size?: string): string {
  if (!m) return '';
  if (size && m.sizes && m.sizes[size]?.url) return m.sizes[size].url!;
  return m.url || '';
}

export async function getSettings() {
  try {
    const payload = await getPayload();
    return await payload.findGlobal({ slug: 'settings', depth: 1 });
  } catch (e) {
    console.warn('[data] Settings konnten nicht geladen werden:', e);
    return null;
  }
}

export async function getPage(slug: string) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    });
    return result.docs[0] ?? null;
  } catch (e) {
    console.warn(`[data] Seite ${slug} nicht ladbar:`, e);
    return null;
  }
}

export async function getReferences(opts?: { featured?: boolean; limit?: number }) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'references',
      ...(opts?.featured ? { where: { featured: { equals: true } } } : {}),
      sort: 'order',
      limit: opts?.limit ?? 100,
      depth: 1,
    });
    return result.docs;
  } catch (e) {
    console.warn('[data] Referenzen nicht ladbar:', e);
    return [];
  }
}

export async function getActiveJobs() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'jobs',
      where: { active: { equals: true } },
      sort: 'order',
      depth: 1,
    });
    return result.docs;
  } catch (e) {
    console.warn('[data] Jobs nicht ladbar:', e);
    return [];
  }
}

// Defaults fuer den Fall dass die DB leer ist (frisches Deployment)
export const DEFAULT_SETTINGS = {
  companyName: 'FriStD-Bau ZuB GmbH & Co. KG',
  phone: '040 / 38 67 45 65',
  phoneLink: '+494038674565',
  mobile: '0163 / 78 456 40',
  email: 'post@fristd-bau.com',
  address: 'Haldesdorfer Str. 44\n22179 Hamburg-Bramfeld',
  hours: [
    { days: 'Mo – Fr', time: '07:00 – 17:00' },
    { days: 'Sa', time: 'nach Vereinbarung' },
    { days: 'So', time: 'geschlossen' },
  ],
  footerTagline:
    'FriStD-Bau ZuB GmbH & Co. KG · Zimmerei, Dachdeckerei & Baufirma in Hamburg-Bramfeld. Holzbau vom Feinsten.',
  legalRegistration: 'HRA 112897 · Hamburg',
  copyright: '© 2026 FriStD-Bau ZuB GmbH & Co. KG — Alle Rechte vorbehalten.',
  stats: [
    { value: '15+', label: 'Jahre Erfahrung', highlight: false },
    { value: '12+', label: 'Gewerke aus einer Hand', highlight: false },
    { value: '★ 4,8', label: 'Kunden-Bewertung', highlight: true },
  ],
};

// Holt Settings mit garantiertem Default-Fallback fuer jedes Feld.
export async function getSettingsOrDefault() {
  const s = await getSettings();
  if (!s) return DEFAULT_SETTINGS;
  return {
    companyName: fallback(s.companyName, DEFAULT_SETTINGS.companyName),
    phone: fallback(s.phone, DEFAULT_SETTINGS.phone),
    phoneLink: fallback(s.phoneLink, DEFAULT_SETTINGS.phoneLink),
    mobile: fallback(s.mobile, DEFAULT_SETTINGS.mobile),
    email: fallback(s.email, DEFAULT_SETTINGS.email),
    address: fallback(s.address, DEFAULT_SETTINGS.address),
    hours: (s.hours?.length ? s.hours : DEFAULT_SETTINGS.hours) as Array<{
      days: string;
      time: string;
    }>,
    footerTagline: fallback(s.footerTagline, DEFAULT_SETTINGS.footerTagline),
    legalRegistration: fallback(s.legalRegistration, DEFAULT_SETTINGS.legalRegistration),
    copyright: fallback(s.copyright, DEFAULT_SETTINGS.copyright),
    stats: (s.stats?.length ? s.stats : DEFAULT_SETTINGS.stats) as Array<{
      value: string;
      label: string;
      highlight?: boolean;
    }>,
  };
}
