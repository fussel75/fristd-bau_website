/**
 * Rendert ein JSON-LD Schema.org Objekt als <script type="application/ld+json">.
 * Server Component - wird direkt ins Server-HTML gerendert (Google + AI-Bots
 * sehen es sofort, keine JS-Ausfuehrung noetig).
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Sichere Serialisierung ohne HTML-Escape-Probleme
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
