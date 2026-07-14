import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RotatingWord } from '@/components/RotatingWord';
import { HeroSlideshow, HeroSlide } from '@/components/HeroSlideshow';
import {
  getSettingsOrDefault,
  getReferences,
  mediaUrl,
  MediaShape,
  getPageHero,
  getHeroSlides,
} from '@/src/lib/data';

// Fallback-Slides falls im CMS noch keine Hero-Slides gepflegt sind.
// Werden aus dem bestehenden public/images/-Fundus kuratiert — kann der
// Nutzer spaeter im Payload-Admin komplett uebersteuern.
const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  { src: '/images/start/hero.jpg', alt: 'Holzrahmenbau — FriStD-Bau Hauptprojekt' },
  { src: '/images/referenzen/ref-01-neubau-heestweg.jpg', alt: 'Neubau in Holzrahmenbau mit Holzweichfaser-Daemmung' },
  { src: '/images/referenzen/ref-02-aufstockung-suederfeld.jpg', alt: 'Aufstockung in Holzbauweise mit Holzfassade' },
  { src: '/images/leistungen/dach.jpg', alt: 'Dachdeckerarbeiten am Wohngebaeude' },
  { src: '/images/referenzen/ref-05-dachstuhl-schiller.jpg', alt: 'Dachstuhl-Konstruktion vom Zimmerermeister' },
];

// Immer server-rendern mit aktuellen CMS-Daten (keine Static-Cache-Falle).
export const dynamic = 'force-dynamic';

export const metadata = {
  title:
    'FriStD-Bau ZuB GmbH & Co. KG — Zimmerei, Dachdeckerei & Baufirma in Hamburg',
  description:
    'Holzbau vom Feinsten in Hamburg-Bramfeld: Neubau, Anbau, Sanierung, Dach, Energetik und Innenausbau aus einer Hand.',
};

const MARQUEE_ITEMS = [
  'Wir bauen. Vom Feinsten.',
  'Zimmerei',
  'Dachdeckerei',
  'Heizung & Sanitär',
  'Wärmepumpen',
  'Sanierung',
  'Erdbau',
  'Hamburg Wasser zugelassen',
  'Bramfeld',
];

const TEASER_CARDS = [
  {
    num: '01',
    title: 'Zimmerei & Holzbau',
    desc: 'Neubau, Anbau, Aufstockung und Sanierung im Holzrahmenbau.',
    href: '/leistungen#holzbau',
  },
  {
    num: '02',
    title: 'Dachdeckerei & Klempnerei',
    desc: 'Dachstühle, Eindeckungen, Sanierungen und Klempnerarbeiten.',
    href: '/leistungen#dachdeckerei',
  },
  {
    num: '03',
    title: 'Heizung, Sanitär & Wärmepumpen',
    desc: 'Wärmepumpen, Heizungen, Sanitär und PV — Meisterbetrieb für Installations- & Heizungsbau.',
    href: '/leistungen#heizung',
  },
];

const REFERENCE_TEASERS = [
  {
    cat: 'Neubau',
    title: 'Holzrahmenbau Heestweg',
    img: '/images/referenzen/ref-01-neubau-heestweg.jpg',
  },
  {
    cat: 'Aufstockung',
    title: 'Effizienzhaus Süderfeldstraße',
    img: '/images/referenzen/ref-02-aufstockung-suederfeld.jpg',
  },
  {
    cat: 'Dach',
    title: 'Dachstuhl Schillerstraße',
    img: '/images/referenzen/ref-05-dachstuhl-schiller.jpg',
  },
  {
    cat: 'Sanierung',
    title: 'Balkonsanierung Grasredder',
    img: '/images/referenzen/ref-07-balkonsanierung-grasredder.jpg',
  },
  {
    cat: 'Anbau',
    title: 'Anbau Krupunder Weg',
    img: '/images/referenzen/ref-08-anbau-krupunder.jpg',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Beratung',
    desc: 'Beratung vor Ort und gemeinsame Einschätzung Ihres Vorhabens.',
    active: true,
  },
  {
    num: '02',
    title: 'Planung',
    desc: 'Ausführungsplanung, Statik und Visualisierung aus einer Hand.',
    active: false,
  },
  {
    num: '03',
    title: 'Genehmigung',
    desc: 'Bauanträge und Genehmigungen — wir übernehmen die Behördengänge.',
    active: false,
  },
  {
    num: '04',
    title: 'Ausführung',
    desc: 'Koordination aller Gewerke — pünktlich, sauber, zuverlässig.',
    active: false,
  },
];

export default async function HomePage() {
  const [settings, featuredRefs, hero, cmsHeroSlides] = await Promise.all([
    getSettingsOrDefault(),
    getReferences({ featured: true, limit: 5 }),
    getPageHero('start', {
      eyebrow: 'Wir bauen. Vom Feinsten. · Hamburg',
      headline: 'Ihr Bauvorhaben.\nVom Plan bis zum\nfertigen',
      subline:
        'Zimmerei, Dachdeckerei & Baufirma aus Hamburg-Bramfeld. Als Generalunternehmer planen und realisieren wir jeden Schritt — ganzheitlich und in Holz.',
    }),
    getHeroSlides(),
  ]);
  // Wenn im CMS Slides gepflegt sind: die nehmen. Sonst Fallback-Auswahl aus /public.
  const heroSlides =
    cmsHeroSlides.length > 0 ? cmsHeroSlides : FALLBACK_HERO_SLIDES;
  // Wenn CMS leer: nutze die hartcodierte Default-Auswahl
  const refTeasers =
    featuredRefs.length > 0
      ? featuredRefs.map((r) => ({
          cat: (r as { category?: string }).category ?? '',
          title: (r as { title?: string }).title ?? '',
          img: mediaUrl((r as { image?: MediaShape }).image, 'card'),
        }))
      : REFERENCE_TEASERS;
  const stats = settings.stats;

  return (
    <div>
      <Header active="start" settings={settings} />

      {/* HERO + KEYFRAMES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.35; transform: scale(1.6); }
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { scrollbar-width: none; }`,
        }}
      />

      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding:
            'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px) clamp(56px, 8vw, 96px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
                marginBottom: 'clamp(20px, 3vw, 28px)',
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
                margin: '0 0 24px',
                color: '#2E2F31',
                whiteSpace: 'pre-line',
              }}
            >
              {hero.headline} <RotatingWord />
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 1.6vw, 18px)',
                lineHeight: 1.6,
                color: '#6B6C6F',
                maxWidth: 480,
                margin: '0 0 32px',
              }}
            >
              {hero.subline}
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: 36,
              }}
            >
              <Link
                href="/kontakt"
                style={{
                  textDecoration: 'none',
                  background: '#D2992C',
                  color: '#fff',
                  padding: '14px 26px',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Projekt besprechen
              </Link>
              <Link
                href="/leistungen"
                style={{
                  textDecoration: 'none',
                  color: '#2E2F31',
                  padding: '14px 24px',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: 15,
                  border: '1px solid #DAD9D3',
                }}
              >
                Leistungen ansehen
              </Link>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 'clamp(24px, 4vw, 44px)',
                paddingTop: 24,
                borderTop: '1px solid #ECEBE6',
                flexWrap: 'wrap',
              }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(22px, 2.4vw, 28px)',
                      color: s.highlight ? '#D2992C' : '#2E2F31',
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 13, color: '#8A8A8C' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <HeroSlideshow slides={heroSlides} />
        </div>
      </section>

      {/* USPs */}
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
            padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 36px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(20px, 3vw, 32px)',
            }}
          >
            {[
              {
                icon: '⊕',
                title: 'Drei Meister-Disziplinen',
                desc:
                  'Zimmerermeister, Dachdeckermeister und Meister für Installations- & Heizungsbau — alle drei Gewerke unter einem Dach.',
              },
              {
                icon: '◆',
                title: 'Planung inklusive',
                desc:
                  'Eingespielte Partner-Büros für Architektur und Statik — Bauantrag und Ausführungsplanung bis 6 Wohneinheiten. Sie haben nur einen Ansprechpartner.',
              },
              {
                icon: '◐',
                title: 'Alle Hausanschlüsse',
                desc:
                  'Zugelassen für Hamburg Wasser sowie Abwasser- und Gasinstallationen. Vom Erdbau bis zur Wärmepumpe.',
              },
            ].map((u) => (
              <div key={u.title}>
                <div
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: 32,
                    color: '#D2992C',
                    marginBottom: 14,
                  }}
                >
                  {u.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    margin: '0 0 10px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {u.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: '#6B6C6F',
                    margin: 0,
                  }}
                >
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section
        style={{
          background: '#2E2F31',
          color: '#fff',
          overflow: 'hidden',
          padding: 'clamp(14px, 2vw, 22px) 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(20px, 2.8vw, 30px)',
            letterSpacing: '-0.02em',
            width: 'max-content',
            animation: 'marquee 32s linear infinite',
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ paddingRight: 32 }}>{item}</span>
              <span
                style={{
                  color: '#D2992C',
                  fontSize: 14,
                  paddingRight: 32,
                }}
              >
                ●
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* LEISTUNGEN TEASER */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 36px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 'clamp(28px, 4vw, 44px)',
            flexWrap: 'wrap',
          }}
        >
          <div>
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
              Leistungen
            </div>
            <h2
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                lineHeight: 1.07,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Alles aus einer Hand.
            </h2>
          </div>
          <Link
            href="/leistungen"
            style={{
              textDecoration: 'none',
              color: '#2E2F31',
              fontWeight: 600,
              fontSize: 15,
              borderBottom: '1px solid #D2992C',
              paddingBottom: 4,
            }}
          >
            Alle Leistungen ansehen →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {TEASER_CARDS.map((c) => (
            <Link
              key={c.num}
              href={c.href}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                background: '#fff',
                border: '1px solid #ECEBE6',
                borderRadius: 18,
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'block',
                transition:
                  'transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: '#D2992C',
                  }}
                >
                  {c.num}
                </span>
                <span style={{ color: '#D2992C' }}>→</span>
              </div>
              <h3
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  margin: '0 0 10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: '#6B6C6F',
                  margin: 0,
                }}
              >
                {c.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* REFERENZEN TEASER */}
      <section style={{ background: '#2E2F31', color: '#fff' }}>
        <div
          style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px, 8vw, 96px) 0' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 24,
              marginBottom: 'clamp(28px, 4vw, 44px)',
              flexWrap: 'wrap',
              padding: '0 clamp(20px, 4vw, 36px)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: '#E0AE4E',
                  marginBottom: 14,
                }}
              >
                Referenzen
              </div>
              <h2
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 4.5vw, 44px)',
                  lineHeight: 1.07,
                  letterSpacing: '-0.025em',
                  margin: 0,
                }}
              >
                Was wir gebaut haben.
              </h2>
            </div>
            <Link
              href="/referenzen"
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                borderBottom: '1px solid #E0AE4E',
                paddingBottom: 4,
              }}
            >
              Alle Projekte ansehen →
            </Link>
          </div>

          <div
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: 16,
              overflowX: 'auto',
              padding: '4px clamp(20px, 4vw, 36px)',
              scrollSnapType: 'x mandatory',
            }}
          >
            {refTeasers.map((r) => (
              <div
                key={r.img}
                style={{
                  flex: '0 0 320px',
                  scrollSnapAlign: 'start',
                  background: '#fff',
                  color: '#2E2F31',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={r.img}
                  alt={r.title}
                  style={{
                    width: '100%',
                    height: 240,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: '18px 20px 22px' }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#D2992C',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {r.cat}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      marginTop: 4,
                    }}
                  >
                    {r.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROZESS */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 36px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
            marginBottom: 'clamp(36px, 5vw, 56px)',
            flexWrap: 'wrap',
          }}
        >
          <div>
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
              So arbeiten wir
            </div>
            <h2
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 4.5vw, 44px)',
                lineHeight: 1.07,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Jeder Schritt geplant.
            </h2>
          </div>
          <p
            style={{
              fontSize: 16,
              color: '#6B6C6F',
              maxWidth: 340,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Ein Ansprechpartner — von der ersten Beratung bis zur Schlüsselübergabe.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 28,
          }}
        >
          {PROCESS.map((p) => (
            <div
              key={p.num}
              style={{
                borderTop: `2px solid ${p.active ? '#D2992C' : '#ECEBE6'}`,
                paddingTop: 22,
              }}
            >
              <div
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  color: '#D2992C',
                  marginBottom: 14,
                }}
              >
                {p.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  margin: '0 0 10px',
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: '#6B6C6F',
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        style={{
          background: '#FAF8F4',
          borderTop: '1px solid #ECEBE6',
          borderBottom: '1px solid #ECEBE6',
        }}
      >
        <div
          style={{
            maxWidth: 880,
            margin: '0 auto',
            padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 36px)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 72,
              color: '#D2992C',
              lineHeight: 0.6,
              marginBottom: 18,
            }}
          >
            „
          </div>
          <p
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(22px, 3vw, 30px)',
              lineHeight: 1.3,
              letterSpacing: '-0.015em',
              margin: '0 0 26px',
              color: '#2E2F31',
            }}
          >
            Holzbau vom Feinsten. Pünktlichkeit, Sauberkeit und Schnelligkeit sind
            für uns Selbstverständlichkeiten.
          </p>
          <div
            style={{
              fontSize: 14,
              color: '#8A8A8C',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Ronny Friedrich · Zimmerermeister
          </div>
        </div>
      </section>

      {/* KARRIERE TEASER */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 36px)',
        }}
      >
        <Link
          href="/karriere"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            background: '#D2992C',
            borderRadius: 24,
            padding: 'clamp(36px, 5vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(28px, 4vw, 56px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#fff',
                    animation: 'pulse 1.6s ease-out infinite',
                  }}
                />{' '}
                Karriere · Jetzt bewerben
              </div>
              <h2
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4.5vw, 44px)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.025em',
                  margin: '0 0 16px',
                  color: '#fff',
                }}
              >
                Wir suchen
                <br />
                Verstärkung.
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: '#FCEED4',
                  margin: 0,
                  maxWidth: 420,
                }}
              >
                Zimmerergeselle und Dachdeckergeselle gesucht — kein Problem, du
                bist eingeplant.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 999,
                  padding: '10px 20px',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Zimmerergeselle (m/w/d)
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 999,
                  padding: '10px 20px',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Dachdeckergeselle (m/w/d)
              </div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 999,
                  padding: '12px 24px',
                  color: '#D2992C',
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Offene Stellen ansehen →
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* KONTAKT CTA */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(56px, 8vw, 96px) clamp(20px, 4vw, 36px)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
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
            Kontakt
          </div>
          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              margin: '0 0 22px',
            }}
          >
            Sprechen wir über
            <br />
            Ihr Projekt.
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: '#6B6C6F',
              margin: '0 0 36px',
            }}
          >
            Ob ganzer Neubau oder einzelnes Gewerk — wir beraten Sie unverbindlich.
          </p>
          <div
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              href="/kontakt"
              style={{
                textDecoration: 'none',
                background: '#D2992C',
                color: '#fff',
                padding: '16px 30px',
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Zum Kontaktformular
            </Link>
            <a
              href="tel:+494038674565"
              style={{
                textDecoration: 'none',
                border: '1px solid #DAD9D3',
                color: '#2E2F31',
                padding: '16px 30px',
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              040 / 38 67 45 65
            </a>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
