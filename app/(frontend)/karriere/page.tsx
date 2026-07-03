import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSettingsOrDefault, getActiveJobs, getPageHero } from '@/src/lib/data';
import { JsonLd } from '@/components/seo/JsonLd';
import { jobPostingSchema, breadcrumbSchema, SITE_URL } from '@/src/lib/schema';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Karriere — FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Komm zu uns ins Team. Zimmerergeselle und Dachdeckergeselle gesucht. Hamburger Holzbau-Betrieb mit fairer Bezahlung und sicherer Anstellung.',
};

const BENEFITS = [
  {
    num: '01',
    title: 'Faire Bezahlung',
    desc: 'Übertarifliche Vergütung und Weihnachtsgeld.',
  },
  {
    num: '02',
    title: 'Sichere Anstellung',
    desc: 'Unbefristete Verträge, ganzjährige Beschäftigung.',
  },
  {
    num: '03',
    title: 'Modernes Werkzeug',
    desc: 'Hochwertige Maschinen und neue Firmenfahrzeuge.',
  },
  {
    num: '04',
    title: 'Weiterbildung',
    desc: 'Schulungen, Meisterförderung, fachlicher Austausch.',
  },
  {
    num: '05',
    title: 'Team-Atmosphäre',
    desc: 'Eingespieltes Team, kurze Wege, klare Absprachen.',
  },
  {
    num: '06',
    title: 'Region Hamburg',
    desc: 'Heimatnahe Einsatzorte, keine langen Anfahrten.',
  },
  {
    num: '07',
    title: 'Arbeitskleidung gestellt',
    desc:
      'Hochwertige Berufskleidung und Sicherheitsausrüstung — komplett von uns.',
  },
  {
    num: '08',
    title: 'Jobrad-Leasing',
    desc: 'Dein Wunschrad zu Top-Konditionen — auch privat nutzbar.',
  },
];

const JOBS = [
  {
    title: 'Zimmerergeselle (m/w/d)',
    meta: 'Vollzeit · Hamburg · sofort',
    desc:
      'Mitarbeit bei Neubauten, Aufstockungen und Sanierungen im Holzrahmenbau.',
    tags: ['Holzbau', 'Geselle'],
    mailto: 'mailto:post@fristd-bau.com?subject=Bewerbung%20Zimmerergeselle',
  },
  {
    title: 'Dachdeckergeselle (m/w/d)',
    meta: 'Vollzeit · Hamburg · sofort',
    desc:
      'Dacheindeckungen, Dachsanierungen und Klempnerarbeiten an Wohngebäuden.',
    tags: ['Dach', 'Geselle'],
    mailto: 'mailto:post@fristd-bau.com?subject=Bewerbung%20Dachdeckergeselle',
  },
];

export default async function KarrierePage() {
  const [settings, dbJobs, hero] = await Promise.all([
    getSettingsOrDefault(),
    getActiveJobs(),
    getPageHero('karriere', {
      eyebrow: 'Karriere',
      headline: 'Komm zu uns ins Team.',
      subline:
        'Wir suchen Verstärkung im Hamburger Holzbau — keine Sorge, du bist eingeplant. Bei FriStD-Bau arbeitest du mit modernem Werkzeug an spannenden Projekten in einem eingespielten Team.',
    }),
  ]);
  const jobs =
    dbJobs.length > 0
      ? dbJobs.map((j) => {
          const job = j as {
            title?: string;
            meta?: string;
            description?: string;
            tags?: Array<{ label?: string }>;
            applyEmail?: string;
          };
          return {
            title: job.title ?? '',
            meta: job.meta ?? '',
            desc: job.description ?? '',
            tags: (job.tags ?? []).map((t) => t.label ?? '').filter(Boolean),
            mailto: `mailto:${job.applyEmail ?? 'post@fristd-bau.com'}?subject=Bewerbung%20${encodeURIComponent(job.title ?? '')}`,
          };
        })
      : JOBS;
  // SEO: JobPosting-Schema pro Stelle + Breadcrumb
  const schemas = [
    breadcrumbSchema([
      { name: 'Start', url: `${SITE_URL}/` },
      { name: 'Karriere', url: `${SITE_URL}/karriere` },
    ]),
    ...jobs.map((j) =>
      jobPostingSchema({
        title: j.title,
        description: j.desc,
      }),
    ),
  ];

  return (
    <div>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <Header active="karriere" settings={settings} />

      {/* PULSE-ANIMATION KEYFRAMES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.6); }
          }`,
        }}
      />

      {/* INTRO */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding:
            'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px) clamp(40px, 5vw, 56px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 11,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: '#D2992C',
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: '#D2992C',
                  display: 'inline-block',
                }}
              />
              {hero.eyebrow}
            </div>
            <h1
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(36px, 6vw, 60px)',
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                margin: '0 0 22px',
                whiteSpace: 'pre-line',
              }}
            >
              {hero.headline}
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 1.6vw, 19px)',
                lineHeight: 1.6,
                color: '#6B6C6F',
                margin: '0 0 28px',
                maxWidth: 480,
              }}
            >
              {hero.subline}
            </p>
            <a
              href="#stellen"
              style={{
                textDecoration: 'none',
                background: '#D2992C',
                color: '#fff',
                padding: '14px 26px',
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                display: 'inline-block',
              }}
            >
              Offene Stellen ansehen
            </a>
          </div>
          <img
            src="/images/karriere/hero.jpg"
            alt="Team von FriStD-Bau auf der Baustelle"
            style={{
              width: '100%',
              height: 'clamp(280px, 40vw, 460px)',
              objectFit: 'cover',
              borderRadius: 20,
              display: 'block',
            }}
          />
        </div>
      </section>

      {/* WAS WIR BIETEN */}
      <section
        style={{
          background: '#FAF8F4',
          borderTop: '1px solid #ECEBE6',
          borderBottom: '1px solid #ECEBE6',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: 'clamp(56px, 7vw, 80px) clamp(20px, 4vw, 36px)',
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#D2992C',
              marginBottom: 14,
            }}
          >
            Was wir bieten
          </div>
          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 40px)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              margin: '0 0 44px',
              maxWidth: 640,
            }}
          >
            Mehr als nur ein Job auf dem Bau.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'clamp(20px, 3vw, 32px)',
            }}
          >
            {BENEFITS.map((b) => (
              <div key={b.num}>
                <div
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    color: '#D2992C',
                    marginBottom: 12,
                  }}
                >
                  {b.num}
                </div>
                <h3
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 19,
                    margin: '0 0 8px',
                  }}
                >
                  {b.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#6B6C6F',
                    margin: 0,
                  }}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STELLEN */}
      <section
        id="stellen"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 36px)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: '#D2992C',
            marginBottom: 14,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#D2992C',
              animation: 'pulse 1.6s ease-out infinite',
            }}
          />{' '}
          Offene Stellen
        </div>
        <h2
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(28px, 4.5vw, 44px)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            margin: '0 0 44px',
          }}
        >
          Wir suchen Verstärkung.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {jobs.map((j) => (
            <div
              key={j.title}
              style={{
                background: '#fff',
                border: '1px solid #ECEBE6',
                borderRadius: 18,
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 24,
                alignItems: 'center',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: '-0.01em',
                    marginBottom: 6,
                  }}
                >
                  {j.title}
                </div>
                <div style={{ fontSize: 14, color: '#8A8A8C' }}>{j.meta}</div>
              </div>
              <div style={{ fontSize: 14, color: '#6B6C6F', lineHeight: 1.6 }}>
                {j.desc}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {j.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12,
                      padding: '6px 12px',
                      background: '#FAF8F4',
                      border: '1px solid #ECEBE6',
                      borderRadius: 999,
                      color: '#54555A',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={j.mailto}
                style={{
                  textDecoration: 'none',
                  background: '#D2992C',
                  color: '#fff',
                  padding: '12px 22px',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Jetzt bewerben →
              </a>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            padding: 'clamp(24px, 3vw, 32px)',
            background: '#FAF8F4',
            borderRadius: 18,
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 4,
              }}
            >
              Keine passende Stelle dabei?
            </div>
            <div style={{ fontSize: 14, color: '#6B6C6F' }}>
              Schick uns trotzdem deine Initiativbewerbung — gute Leute können wir
              immer gebrauchen.
            </div>
          </div>
          <a
            href="mailto:post@fristd-bau.com?subject=Initiativbewerbung"
            style={{
              textDecoration: 'none',
              color: '#2E2F31',
              padding: '12px 24px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14,
              border: '1px solid #2E2F31',
              whiteSpace: 'nowrap',
            }}
          >
            Initiativbewerbung senden
          </a>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
