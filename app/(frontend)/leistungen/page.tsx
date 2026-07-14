import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqAccordion, FaqItem } from '@/components/FaqAccordion';
import { LeistungenSidebar, SidebarItem } from '@/components/LeistungenSidebar';
import { HeroSlideshow, HeroSlide } from '@/components/HeroSlideshow';
import { getSettingsOrDefault, getPageHero } from '@/src/lib/data';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  faqPageSchema,
  serviceSchema,
  breadcrumbSchema,
  SITE_URL,
} from '@/src/lib/schema';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Leistungen — FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Drei Meister-Disziplinen unter einem Dach: Zimmerei & Holzbau, Dachdeckerei & Klempnerei, Heizung, Sanitär & Wärmepumpen. Plus eigene Planung und Hausanschlüsse.',
};

type SubGroup = { heading: string; items: string[] };

type Hauptbereich = {
  id: string;
  num: string;
  title: string;
  badge: string;
  img: string;               // Haupt-Bild (Fallback wenn images leer)
  imgAlt: string;
  images?: HeroSlide[];      // Wenn gesetzt: Slideshow statt einzelnem Bild
  lead: string;
  items: string[];           // flache Chip-Liste
  subGroups?: SubGroup[];    // ODER gruppierte Chips (mit kleiner Ueberschrift)
};

const HAUPTBEREICHE: Hauptbereich[] = [
  {
    id: 'holzbau',
    num: '01',
    title: 'Zimmerei & Holzbau',
    badge: 'Meisterbetrieb Zimmererhandwerk',
    img: '/images/leistungen/neubau.jpg',
    imgAlt: 'Holzrahmenbau — FriStD-Bau Zimmerei',
    images: [
      { src: '/images/leistungen/neubau.jpg', alt: 'Holzrahmenbau — FriStD-Bau Zimmerei' },
      { src: '/images/referenzen/ref-01-neubau-heestweg.jpg', alt: 'Neubau in Holzrahmenbau' },
      { src: '/images/referenzen/ref-08-anbau-krupunder.jpg', alt: 'Anbau in Holzbauweise' },
      { src: '/images/leistungen/innenausbau.jpg', alt: 'Innenausbau — Holz-Trockenbau' },
    ],
    lead:
      'Alle Zimmererarbeiten für Ihr Bauvorhaben — von der Konstruktion bis zur Aufstellung. Holz ist nachhaltig, leicht und schnell montiert. Ideal auch für Aufstockung und Anbau ohne aufwendige Fundamente.',
    items: [
      'Holzrahmenbau',
      'Aufstockung & Anbau',
      'Dachstuhl & Dachgauben',
      'Brettschichtholz-Konstruktion',
      'Holzfassade',
      'Fachwerksanierung',
      'Holz-Carport',
      'Innenausbau & Trockenbau',
    ],
  },
  {
    id: 'dachdeckerei',
    num: '02',
    title: 'Dachdeckerei, Klempnerei & Photovoltaik',
    badge: 'Meisterbetrieb Dachdeckerhandwerk · „Dach und dicht" · PV-Partner',
    img: '/images/leistungen/dach.jpg',
    imgAlt: 'Dachdeckerarbeiten am Wohngebäude — FriStD-Bau',
    images: [
      { src: '/images/leistungen/dach.jpg', alt: 'Dachdeckerarbeiten am Wohngebäude' },
      { src: '/images/referenzen/ref-05-dachstuhl-schiller.jpg', alt: 'Dachstuhl-Konstruktion vom Zimmerermeister' },
      { src: '/images/referenzen/ref-06-dachsanierung-wacholderweg.jpg', alt: 'Dachsanierung am Wohngebäude' },
      { src: '/images/referenzen/ref-03-mansarddach-stofferkamp75.jpg', alt: 'Mansarddach-Aufstockung' },
    ],
    lead:
      'Alles rund ums Dach — von der Neueindeckung bis zur Photovoltaik-Anlage. Fachgerecht ausgeführt vom Dachdeckermeister, inklusive Klempnerarbeiten, Wärmedämmung und PV-Montage mit Netzwerk-Elektriker.',
    items: [],
    subGroups: [
      {
        heading: 'Dachdeckerei',
        items: [
          'Dacheindeckung (Ziegel · Metall · Schiefer)',
          'Dachsanierung',
          'Dachgauben & Mansarddächer',
          'Dachfenster',
          'Wärmedämmung',
          'Blitzschutz',
        ],
      },
      {
        heading: 'Klempnerei',
        items: [
          'Regenrinne & Fallrohre',
          'Metall-Abdeckungen',
          'Kaminverwahrung',
        ],
      },
      {
        heading: 'Photovoltaik',
        items: [
          'PV-Anlage (Aufdach)',
          'PV-Indach-System',
          'Solar-Ziegel',
          'Batteriespeicher',
          'Wechselrichter-Anbindung',
        ],
      },
    ],
  },
  {
    id: 'heizung',
    num: '03',
    title: 'Wärmepumpen, Heizung & Sanitär',
    badge: 'Meisterbetrieb Installations- & Heizungsbau · Stiebel-Eltron-Partner',
    img: '/images/leistungen/energetik.jpg',
    imgAlt: 'Effizienzhaus mit Holzfassade — FriStD-Bau Heizungsbau',
    images: [
      { src: '/images/leistungen/energetik.jpg', alt: 'Effizienzhaus mit Holzfassade' },
      { src: '/images/leistungen/sanierung-nachher.jpg', alt: 'Modernisiertes Haus nach Energetik-Sanierung' },
      { src: '/images/leistungen/sanierung-vorher.jpg', alt: 'Haus vor der Sanierung' },
    ],
    lead:
      'Vom Erdbau bis zur Wärmepumpe — komplette Anlagentechnik aus einer Hand. Zertifizierter Stiebel-Eltron-Partner für Wärmepumpen und zugelassen bei Hamburg Wasser für alle Hausanschlüsse.',
    items: [],
    subGroups: [
      {
        heading: 'Wärme & Energie',
        items: [
          'Luft-Wärmepumpe',
          'Erd-Wärmepumpe',
          'Heizungsanlagen (Gas · Hybrid)',
          'Fußbodenheizung',
          'Warmwasserspeicher',
          'Lüftung mit Wärmerückgewinnung',
        ],
      },
      {
        heading: 'Sanitär',
        items: [
          'Sanitärtechnik & Bad',
          'Gas-Installation',
          'Wasser-Installation',
        ],
      },
      {
        heading: 'Erdbau & Hausanschlüsse',
        items: [
          'Erdbau',
          'Bodenplatte',
          'Wasseranschluss',
          'Abwasseranschluss',
          'Gasanschluss',
          'Drainage',
        ],
      },
    ],
  },
];

type Planungsbereich = {
  id: string;
  icon: string;
  title: string;
  trustBadge?: string;
  lead: string;
  items: string[];
};

const PLANUNGSBEREICHE: Planungsbereich[] = [
  {
    id: 'planung',
    icon: '◇',
    title: 'Planung',
    trustBadge: 'Architekten-Netzwerk',
    lead:
      'Von der ersten Skizze bis zur Baugenehmigung — Entwurf, Bauantrag und Ausführungsplanung aus einem eingespielten Netzwerk.',
    items: [
      'Entwurf',
      'Bauantrag',
      'Genehmigungsverfahren',
      'Ausführungsplanung',
      'Werkstattplanung',
      'Bauphysik',
      'Zeitplanung',
    ],
  },
  {
    id: 'statik',
    icon: '◈',
    title: 'Statik',
    trustBadge: 'Partner-Statiker · bis 6 WE',
    lead:
      'Statische Berechnung und Nachweise für Ihre geplante Maßnahme — Neubau, Aufstockung, Anbau oder Sanierung. Bis 6 Wohneinheiten.',
    items: [
      'Statische Berechnung',
      'Prüfstatik',
      'Konstruktionsdetails',
      'Nachweise',
    ],
  },
  {
    id: 'energieberatung',
    icon: '◐',
    title: 'Energieberatung',
    trustBadge: 'Partner-Netzwerk: KfW · BAFA · IFB',
    lead:
      'Jedes Förderprogramm hat andere Anforderungen an den Energieberater. Unser Netzwerk deckt alle drei ab — KfW, BAFA, IFB — mit koordinierten Nachweisen bis zur Ausführung.',
    items: [
      'KfW-Effizienzhaus',
      'BAFA-Sanierung',
      'IFB-Förderung',
      'iSFP (Sanierungsfahrplan)',
      'Energieausweis',
      'Wärmeschutznachweis',
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
  {
    id: HAUPTBEREICHE[0].id,
    num: HAUPTBEREICHE[0].num,
    label: HAUPTBEREICHE[0].title,
    categoryHeading: 'Handwerksleistungen',
  },
  ...HAUPTBEREICHE.slice(1).map((b) => ({
    id: b.id,
    num: b.num,
    label: b.title,
  })),
  // Alle Planungspunkte scrollen zum gemeinsamen Sektions-Anker, damit
  // der User immer alle drei Karten zusammen sieht — sonst wirkt es
  // unprofessionell wenn nur eine einzelne Karte im Viewport steht.
  {
    id: PLANUNGSBEREICHE[0].id,
    num: PLANUNGSBEREICHE[0].icon,
    label: PLANUNGSBEREICHE[0].title,
    categoryHeading: 'Planungsleistungen',
    anchor: 'planungsleistungen',
  },
  ...PLANUNGSBEREICHE.slice(1).map((p) => ({
    id: p.id,
    num: p.icon,
    label: p.title,
    anchor: 'planungsleistungen',
  })),
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
  const [settings, hero] = await Promise.all([
    getSettingsOrDefault(),
    getPageHero('leistungen', {
      eyebrow: 'Leistungen',
      headline: 'Drei Meister-Disziplinen.\nEin Ansprechpartner.',
      subline:
        'Zimmerei & Holzbau, Dachdeckerei & Klempnerei, Heizung & Sanitär — alle drei Gewerke mit eigenem Meister. Dazu eigene Planungs­abteilung mit Architekten und Statikern, und Zulassung für Hamburg Wasser. Vom Bauantrag bis zur Wärmepumpe — alles aus einem Haus.',
    }),
  ]);

  // SEO: Schema.org Daten pro Sektion
  const schemas = [
    breadcrumbSchema([
      { name: 'Start', url: `${SITE_URL}/` },
      { name: 'Leistungen', url: `${SITE_URL}/leistungen` },
    ]),
    faqPageSchema(FAQS),
    ...HAUPTBEREICHE.map((b) =>
      serviceSchema(
        b.title,
        b.lead,
        `${SITE_URL}/leistungen#${b.id}`,
        b.items.length > 0 ? b.items : (b.subGroups?.flatMap((g) => g.items) ?? []),
      ),
    ),
    ...PLANUNGSBEREICHE.map((p) =>
      serviceSchema(p.title, p.lead, `${SITE_URL}/leistungen#${p.id}`, p.items),
    ),
  ];

  return (
    <div>
      {schemas.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
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
          {hero.eyebrow}
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
            maxWidth: 700,
            margin: 0,
          }}
        >
          {hero.subline}
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
            {/* SEKTION-HEADER: HANDWERKSLEISTUNGEN */}
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: '#D2992C',
                marginBottom: 8,
              }}
            >
              Handwerksleistungen
            </div>
            <h2
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(22px, 3vw, 30px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 40px',
                color: '#2E2F31',
              }}
            >
              Drei Meister-Disziplinen. Ein Ansprechpartner.
            </h2>

            {/* HAUPTBEREICHE */}
            {HAUPTBEREICHE.map((b) => (
              <div key={b.id} id={b.id} style={sectionWrap}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    marginBottom: 14,
                  }}
                >
                  <span style={numStyle}>{b.num}</span>
                  <h3 style={h2Style}>{b.title}</h3>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <span style={badge}>{b.badge}</span>
                </div>
                {b.images && b.images.length > 1 ? (
                  <div style={{ marginBottom: 26 }}>
                    <HeroSlideshow
                      slides={b.images}
                      intervalMs={8000}
                      height="clamp(220px, 30vw, 340px)"
                      radius={16}
                    />
                  </div>
                ) : (
                  <img src={b.img} alt={b.imgAlt} style={slotStyle} />
                )}
                <p style={{ ...leadParagraph, marginBottom: 22 }}>{b.lead}</p>
                {b.items.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    {b.items.map((it) => (
                      <span key={it} style={chip}>
                        {it}
                      </span>
                    ))}
                  </div>
                )}
                {b.subGroups &&
                  b.subGroups.map((g) => (
                    <div key={g.heading} style={{ marginTop: 22 }}>
                      <div
                        style={{
                          fontFamily: "'Archivo', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#8A8A8C',
                          marginBottom: 10,
                        }}
                      >
                        {g.heading}
                      </div>
                      <div
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
                      >
                        {g.items.map((it) => (
                          <span key={it} style={chip}>
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))}

            {/* SEKTION-HEADER: PLANUNGSLEISTUNGEN */}
            <div
              id="planungsleistungen"
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: '#D2992C',
                marginBottom: 8,
                marginTop: 8,
                scrollMarginTop: 24,
              }}
            >
              Planungsleistungen
            </div>
            <h2
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(22px, 3vw, 30px)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '0 0 32px',
                color: '#2E2F31',
              }}
            >
              Vom Bauantrag bis zur Förderung.
            </h2>

            {/* PLANUNGSBEREICHE BAND */}
            <div
              style={{
                background: '#2E2F31',
                color: '#fff',
                borderRadius: 24,
                padding: 'clamp(20px, 3vw, 32px)',
                marginBottom: 'clamp(48px, 7vw, 80px)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'clamp(14px, 1.6vw, 22px)',
                }}
              >
                {PLANUNGSBEREICHE.map((p) => (
                  <div
                    key={p.id}
                    id={p.id}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      padding: 'clamp(20px, 2.4vw, 28px)',
                      scrollMarginTop: 24,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Archivo', sans-serif",
                        fontWeight: 800,
                        fontSize: 32,
                        color: '#E0AE4E',
                        marginBottom: 14,
                      }}
                    >
                      {p.icon}
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
                      {p.title}
                    </h3>
                    {p.trustBadge && (
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
                        ✓ {p.trustBadge}
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
                      {p.lead}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.items.map((it) => (
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
