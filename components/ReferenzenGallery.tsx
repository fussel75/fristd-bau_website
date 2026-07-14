'use client';

import { useEffect, useState } from 'react';

// Bilder-Bereich einer Referenz-Karte. Bei Gallery mit >1 Bildern: sanfter
// Cross-Fade-Slider mit Auto-Advance (langsamer als der Hero-Slider damit
// die Seite nicht flimmert). Bei einzelnem Bild: statisches img.
function RefCardImage({ project }: { project: RefProject }) {
  const slides = [
    { src: project.img, alt: project.alt },
    ...(project.gallery ?? []),
  ].filter((s) => s.src);
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || hover) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 4500);
    return () => clearTimeout(t);
  }, [i, slides.length, hover]);

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'clamp(220px, 28vw, 280px)',
    background: '#ECEBE6',
  };
  if (slides.length <= 1) {
    return (
      <img
        src={project.img}
        alt={project.alt}
        style={{
          width: '100%',
          height: 'clamp(220px, 28vw, 280px)',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    );
  }
  return (
    <div
      style={boxStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {slides.map((s, idx) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading={idx === 0 ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: idx === i ? 1 : 0,
            transition: 'opacity 700ms ease-in-out',
          }}
        />
      ))}
      {/* Kleiner Zaehler unten rechts damit man merkt dass es mehrere Bilder gibt */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          right: 12,
          padding: '3px 9px',
          borderRadius: 999,
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.02em',
          backdropFilter: 'blur(4px)',
        }}
      >
        {i + 1} / {slides.length}
      </div>
    </div>
  );
}

export type RefProject = {
  cat: string;
  title: string;
  loc: string;
  year: string;
  img: string;
  alt: string;
  // Zusatzbilder fuer den Karten-Slider und die Lightbox. Wenn leer,
  // wird nur `img` gezeigt (statisches Bild wie bisher).
  gallery?: Array<{ src: string; alt: string }>;
};

const CATS = [
  'Alle',
  'Neubau',
  'Aufstockung',
  'Sanierung',
  'Dach',
  'Anbau',
  'Wärmepumpen, Heizung & Sanitär',
  'Sonderbau',
];

// Pro Sparte ein eigener Slogan + Subline fuer die Referenzen-Seite.
// Werden ueber die H1 gerendert wenn ein Filter aktiv ist.
export const SLOGANS: Record<string, { headline: string; subline: string }> = {
  Alle: {
    headline: 'Holzbau, der\nsich sehen lässt.',
    subline:
      'Eine Auswahl unserer Projekte aus Hamburg und Umgebung — gefiltert nach Gewerk.',
  },
  Neubau: {
    headline: 'Neu gebaut.\nVon Grund auf gut.',
    subline:
      'Unsere Neubau-Projekte in Holzbauweise — vom Fundament bis zum First aus einer Hand.',
  },
  Aufstockung: {
    headline: 'Ein Stockwerk mehr.\nOhne Umzug.',
    subline:
      'Aufstockung in Holzbauweise — leicht, schnell und ohne aufwendige neue Fundamente.',
  },
  Sanierung: {
    headline: 'Aus Alt\nwird wertvoll.',
    subline:
      'Sanierungsprojekte, die Substanz erhalten und den Wert steigern — nachhaltig und förderfähig.',
  },
  Dach: {
    headline: 'Das Dach\nüber allem.',
    subline:
      'Neueindeckung, Dachsanierung, Gauben und Dachfenster — vom Dachdeckermeister ausgeführt.',
  },
  Anbau: {
    headline: 'Mehr Raum.\nOhne Auszug.',
    subline:
      'Anbauten in Holzbauweise — wachsen im eigenen Haus, ohne monatelange Baustelle.',
  },
  'Wärmepumpen, Heizung & Sanitär': {
    headline: 'Wärme,\ndie einfach läuft.',
    subline:
      'Wärmepumpen, Heizungen und Sanitäranlagen — zertifizierter Stiebel-Eltron-Partner und Hamburg-Wasser-Zulassung.',
  },
  Sonderbau: {
    headline: 'Wenn Standard\nnicht reicht.',
    subline:
      'Projekte jenseits des Katalogs — Hausboote, Umbauten, individuelle Konstruktionen.',
  },
};

export function ReferenzenGallery({
  projects,
  initialHeadline,
  initialSubline,
}: {
  projects: RefProject[];
  // Fuer den "Alle"-Filter kommen Headline/Subline aus dem CMS-Hero.
  // Sobald ein anderer Filter aktiv ist, greift SLOGANS.
  initialHeadline?: string;
  initialSubline?: string;
}) {
  const [filter, setFilter] = useState<string>('Alle');
  const visible =
    filter === 'Alle' ? projects : projects.filter((p) => p.cat === filter);
  const slogan = SLOGANS[filter];
  const headline =
    filter === 'Alle' && initialHeadline
      ? initialHeadline
      : slogan?.headline ?? '';
  const subline =
    filter === 'Alle' && initialSubline
      ? initialSubline
      : slogan?.subline ?? '';

  return (
    <>
      <h1
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(36px, 6vw, 64px)',
          lineHeight: 1.04,
          letterSpacing: '-0.03em',
          margin: '0 0 18px',
          maxWidth: 880,
          whiteSpace: 'pre-line',
          transition: 'opacity 180ms ease',
        }}
      >
        {headline}
      </h1>
      <p
        style={{
          fontSize: 'clamp(16px, 1.6vw, 19px)',
          lineHeight: 1.6,
          color: '#6B6C6F',
          maxWidth: 640,
          margin: '0 0 40px',
          transition: 'opacity 180ms ease',
        }}
      >
        {subline}
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
        {CATS.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              style={{
                background: active ? '#D2992C' : '#fff',
                color: active ? '#fff' : '#2E2F31',
                border: `1px solid ${active ? '#D2992C' : '#DAD9D3'}`,
                padding: '10px 18px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 180ms ease',
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
        }}
      >
        {visible.map((p) => (
          <div
            key={p.img}
            style={{
              background: '#fff',
              border: '1px solid #ECEBE6',
              borderRadius: 18,
              overflow: 'hidden',
              transition:
                'transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.borderColor = '#D2992C';
              e.currentTarget.style.boxShadow = '0 14px 32px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = '#ECEBE6';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <RefCardImage project={p} />
            <div style={{ padding: 22 }}>
              <div
                style={{
                  fontSize: 12,
                  color: '#D2992C',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {p.cat}
              </div>
              <div
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '-0.01em',
                  marginBottom: 4,
                }}
              >
                {p.title}
              </div>
              <div style={{ fontSize: 14, color: '#8A8A8C' }}>
                {p.loc} · {p.year}
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#8A8A8C',
            fontSize: 16,
          }}
        >
          Keine Projekte in dieser Kategorie.
        </div>
      )}
    </>
  );
}
