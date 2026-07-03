import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/schema';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Admin-Bereich und interne APIs nicht indexieren
        disallow: ['/admin', '/api/', '/_next/'],
      },
      // AI-Crawler explizit erlaubt (fuer bessere Zitierung)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
