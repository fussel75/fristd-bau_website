import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqAccordion, FaqItem } from '@/components/FaqAccordion';
import { LeistungenSidebar, SidebarItem } from '@/components/LeistungenSidebar';
import { getSettingsOrDefault } from '@/src/lib/data';

export const metadata = {
  title: 'Leistungen — FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Drei Meister-Disziplinen unter einem Dach: Zimmerei & Holzbau, Dachdeckerei & Klempnerei, Heizung, Sanitär & Wärmepumpen. Plus eigene Planung und Hausanschlüsse.',
};

type Hauptbereich = {
  id: string;
  num: string;
  title: string;
  badge: string;
  img: string;
  imgAlt: string;
  lead: string;
  items: string[];
  meta: { label: string; value: string }[];
};

const HAUPTBEREICHE: Hauptbereich[] = [
  {
    id: 'holzbau',
    num: '01',
    title: 'Zimmerei & Holzbau',
    badge: 'Meisterbetrieb Zimmererhandwerk',
    img: '/images/leistungen/neubau.jpg',
    imgAlt: 'Neubau im Holzrahmenbau — FriStD-Bau Baustelle',
    lead:
      'Vom ersten Skizzengespräch über Bauantrag und Statik bis zur Schlüsselübergabe. Eigenheime und Mehrfamilienhäuser im Holzrahmenbau, Aufstockungen, Sanierungen, Innenausbau und Carports.',
    items: [
      'Neubau in Holzrahmenbau',
      'Anbau & Aufstockung',
      'Sanierung & energetische Ertüchtigung',
      'Innenausbau & Trockenbau',
      'Holz-Carports',
      'Dachgauben',
    ],
    meta: [
      { label: 'Bauzeit', value: 'ca. 3–12 Monate je Vorhaben' },
      { label: 'Förderung', value: 'KfW-Effizienzhaus 40 & 55, BAFA' },
      { label: 'Typisch', value: 'EFH, MFH, Doppelhaus, Aufstockung' },
    ],
  },
  {
    id: 'dachdeckerei',
    num: '02',
    title: 'Dachdeckerei & Klempnerei',
    badge: 'Meisterbetrieb Dachdeckerhandwerk',
    img: '/images/leistungen/dach.jpg',
    imgAlt: 'Dachsanierung am Wohngebäude — FriStD-Bau Dachdecker',
    lead:
      'Vom Zimmermeister konstruiert, vom Dachdeckermeister eingedeckt. Dachstühle, Eindeckungen, Sanierungen und Klempnerarbeiten — alles aus einer Hand.',
    items: [
      'Dachstuhl & Konstruktion',
      'Dacheindeckung (Ziegel, Metall, Schiefer)',
      'Dachsanierung',
      'Klempnerarbeiten',
      'Dachflächenfenster',
      'Carport-Dach',
    ],
    meta: [
      { label: 'Bauzeit', value: 'ca. 2–6 Wochen' },
      { label: 'Typisch', value: 'Neueindeckung, Dachstuhl-Erneuerung, Sanierung' },
      { label: 'Inkl.', value: 'Statik, Wärmeschutznachweis' },
    ],
  },
  {
    id: 'heizung',
    num: '03',
    title: 'Heizung, Sanitär & Wärmepumpen',
    badge: 'Meisterbetrieb Installations- & Heizungsbau',
    img: '/images/leistungen/energetik.jpg',
    imgAlt: 'Effizienzhaus mit Holzfassade — FriStD-Bau',
    lead:
      'Wärmepumpen, Heizungsanlagen, Sanitärtechnik und Photovoltaik — energiebewusst geplant und ausgeführt vom eigenen Meisterbetrieb. Förderberatung inklusive.',
    items: [
      'Wärmepumpen (Luft-Wasser, Sole)',
      'Heizungsanlagen (Gas, Hybrid)',
      'Sanitärtechnik & Bad',
      'Photovoltaik & Solar',
      'Energieberatung',
      'Heimautomation',
    ],
    meta: [
      { label: 'Förderung', value: 'BEG, KfW, BAFA' },
      { label: 'Standards', value: 'KfW-Effizienzhaus 40 & 55' },
      { label: 'Inkl.', value: 'Energieberatung & Wärmeschutznachweis' },
    ],
  },
];

type Querschnitt = {
  id: string;
  title: string;
  icon: string;
  trustBadge?: string;
  lead: string;
  items: string[];
};

const QUERSCHNITT: Querschnitt[] = [
  {
    id: 'planung',
    title: 'Planung & Statik',
    icon: '◇',
    trustBadge: 'Eingespieltes Partner-Netzwerk',
    lead:
      'Architektur, Statik und Bauphysik übernehmen unsere langjährigen Partner-Büros — eng abgestimmt, schnelle Wege, ein Ansprechpartner für Sie. Bauantrag und Ausführungsplanung bis 6 Wohneinheiten.',
    items: [
      'Architektur',
      'Statik bis 6 WE',
      'Bauphysik',
      'Bauantrag',
      'Wärmeschutznachweis',
      'Ausführungsplanung',
    ],
  },
  {
    id: 'erdbau',
    title: 'Erdbau & Hausanschlüsse',
    icon: '◈',
    trustBadge: 'Zugelassen für Hamburg Wasser',
    lead:
      'Erdbau, Bodenplatte und alle Hausanschlüsse. Wir sind zugelassen für die Installation von Wasser-, Abwasser- und Gasanschlüssen — vom Anschluss am Versorger bis ins Haus.',
    items: [
      'Erdbau',
      'Wasseranschluss',
      'Abwasseranschluss',
      'Gasanschluss',
      'Bodenplatte',
      'Drainage',
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    q: 'Wie lange dauert ein Erstgespräch?',
    a: 'Ca. 60 Minuten vor Ort oder telefonisch — kostenlos und unverbindlich.',
  },
  {
    q: 'Übernehmen Sie auch nur einzelne Gewerke?',
    a: 'Ja, gerne. Wir arbeiten als Generalunternehmer oder als Teil eines Teams.',
  },
  {
    q: 'Decken Sie wirklich Planung und Bau ab?',
    a: 'Ja. Architektur und Statik übernehmen unsere langjährigen Partner-Büros — eingespielt und schnell abgestimmt, ohne dass Sie sich damit beschäftigen müssen. Bauantrag und Ausführungsplanung bis 6 Wohneinheiten. Ein Ansprechpartner für das gesamte Vorhaben.',
  },
  {
    q: 'Setzen Sie Wärmepumpen und Heizungen auch ohne Neubau?',
    a: 'Ja. Wir installieren Wärmepumpen, Heizungen und Sanitäranlagen auch als eigenständige Modernisierung. Förderberatung (BEG/KfW/BAFA) inklusive.',
  },
  {
    q: 'Welche Hausanschlüsse können Sie übernehmen?',
    a: 'Wir sind zugelassen für Hamburg Wasser sowie Abwasser- und Gasinstallationen. Komplette Hausanschlüsse aus einer Hand.',
  },
  {
    q: 'Welche Region deckt FriStD-Bau ab?',
    a: 'Hamburg und Umgebung — wir arbeiten heimatnah und vermeiden lange Anfahrten.',
  },
];

const SIDEBAR: SidebarItem[] = [
  ...HAUPTBEREICHE.map((b) => ({ id: b.id, num: b.num, label: b.title })),
  { id: 'planung', num: '◇', label: 'Planung & Statik' },
  { id: 'erdbau', num: '◈', label: 'Erdbau & Anschlüsse' },
];

const sectionWrap: React.CSSProperties = {
  paddingBottom: 'clamp(48px, 7vw, 80px)',
  borderBottom: '1px solid #ECEBE6',
  marginBottom: 'clamp(48px, 7vw, 80px)',
};

const numStyle: React.CSSProperties = {
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 800,
  fontSize: 13,
  color: '#D2992C',
};

const h2Style: React.CSSProperties = {
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(28px, 4vw, 38px)',
  lineHeight: 1.08,
  letterSpacing: '-0.025em',
  margin: 0,
};

const slotStyle: React.CSSProperties = {
  width: '100%',
  height: 'clamp(220px, 30vw, 340px)',
  marginBottom: 26,
  objectFit: 'cover',
  borderRadius: 16,
  display: 'block',
};

const leadParagraph: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.65,
  color: '#2E2F31',
  margin: 0,
};

const chip: React.CSSProperties = {
  display: 'inline-block',
  padding: '6px 14px',
  borderRadius: 999,
  background: '#FAF8F4',
  border: '1px solid #ECEBE6',
  fontSize: 13,
  color: '#2E2F31',
  fontWeight: 500,
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: 6,
  background: '#FCEED4',
  color: '#7A5810',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const metaGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 16,
  marginTop: 28,
  paddingTop: 22,
  borderTop: '1px solid #ECEBE6',
};

const metaLabel: React.CSSProperties = {
  fontSize: 12,
  color: '#8A8A8C',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  fontWeight: 600,
  marginBottom: 6,
};

const metaValue: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: '#2E2F31',
};

export default async function LeistungenPage() {
  const settings = await getSettingsOrDefault();

  return (
    <div>
      <Header active="leistungen" settings={settings} />

      {/* PAGE INTRO */}
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
          Leistungen
        </div>
        <h1
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: '0 0 22px',
            maxWidth: 880,
          }}
        >
          Drei Meister-Disziplinen.<br />
          Ein Ansprechpartner.
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: '#6B6C6F',
            maxWidth: 700,
            margin: 0,
          }}
        >
          Zimmerei &amp; Holzbau, Dachdeckerei &amp; Klempnerei, Heizung &amp;
          Sanitär — alle drei Gewerke mit eigenem Meister. Dazu eigene Planungs­abteilung
          mit Architekten und Statikern, und Zulassung für Hamburg Wasser. Vom Bauantrag
          bis zur Wärmepumpe — alles aus einem Haus.
        </p>
      </section>

      {/* TWO-COL: sidebar + content */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 36px) clamp(56px, 8vw, 96px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
          }}
        >
          <LeistungenSidebar items={SIDEBAR} />

          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            {/* HAUPTBEREICHE */}
            {HAUPTBEREICHE.map((b, i) => (
              <div
                key={b.id}
                id={b.id}
                style={
                  i === HAUPTBEREICHE.length - 1 && QUERSCHNITT.length === 0
                    ? { paddingBottom: 'clamp(48px, 7vw, 80px)' }
                    : sectionWrap
                }
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    marginBottom: 14,
                  }}
                >
                  <span style={numStyle}>{b.num}</span>
                  <h2 style={h2Style}>{b.title}</h2>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <span style={badge}>{b.badge}</span>
                </div>
                <img src={b.img} alt={b.imgAlt} style={slotStyle} />
                <p style={{ ...leadParagraph, marginBottom: 22 }}>{b.lead}</p>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}
                >
                  {b.items.map((it) => (
                    <span key={it} style={chip}>
                      {it}
                    </span>
                  ))}
                </div>
                <div style={metaGrid}>
                  {b.meta.map((m) => (
                    <div key={m.label}>
                      <div style={metaLabel}>{m.label}</div>
                      <div style={metaValue}>{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* QUERSCHNITT BAND */}
            <div
              style={{
                background: '#2E2F31',
                color: '#fff',
                borderRadius: 24,
                padding: 'clamp(32px, 4vw, 48px)',
                marginBottom: 'clamp(48px, 7vw, 80px)',
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: '#E0AE4E',
                  marginBottom: 18,
                }}
              >
                Querschnitt — alles was zusätzlich dazugehört
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'clamp(28px, 4vw, 56px)',
                }}
              >
                {QUERSCHNITT.map((q) => (
                  <div key={q.id} id={q.id}>
                    <div
                      style={{
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 800,
                        fontSize: 32,
                        color: '#E0AE4E',
                        marginBottom: 14,
                      }}
                    >
                      {q.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 700,
                        fontSize: 24,
                        margin: '0 0 12px',
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {q.title}
                    </h3>
                    {q.trustBadge && (
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '5px 12px',
                          borderRadius: 6,
                          background: 'rgba(224,174,78,0.18)',
                          color: '#E0AE4E',
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        ✓ {q.trustBadge}
                      </div>
                    )}
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: '#D8D8DA',
                        margin: '0 0 18px',
                      }}
                    >
                      {q.lead}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {q.items.map((it) => (
                        <span
                          key={it}
                          style={{
                            padding: '5px 11px',
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(224,174,78,0.3)',
                            fontSize: 12.5,
                            color: '#fff',
                            fontWeight: 500,
                          }}
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: '1px solid #ECEBE6' }}>
        <div
          style={{
            maxWidth: 880,
            margin: '0 auto',
            padding: 'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px)',
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
            Häufige Fragen
          </div>
          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 4.5vw, 40px)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              margin: '0 0 40px',
            }}
          >
            Was häufig gefragt wird.
          </h2>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* KONTAKT BAND */}
      <section
        style={{
          background: '#FAF8F4',
          borderTop: '1px solid #ECEBE6',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: 'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            Welches Gewerk brauchen Sie?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: '#6B6C6F',
              maxWidth: 540,
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Wir besprechen Ihr Vorhaben unverbindlich und finden die passende
            Kombination — vom einzelnen Gewerk bis zum Komplettvorhaben.
          </p>
          <a
            href="/kontakt"
            style={{
              textDecoration: 'none',
              background: '#D2992C',
              color: '#fff',
              padding: '15px 28px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 15,
              display: 'inline-block',
            }}
          >
            Beratung anfragen
          </a>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
