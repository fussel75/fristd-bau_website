import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ImageSlot } from '@/components/ImageSlot';
import { FaqAccordion, FaqItem } from '@/components/FaqAccordion';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { LeistungenSidebar, SidebarItem } from '@/components/LeistungenSidebar';

export const metadata = {
  title: 'Leistungen — FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Alle Gewerke. Ein Ansprechpartner. Vom Bauantrag bis zur Schlüsselübergabe — Neubau, Anbau, Sanierung, Dach, Energetik und Innenausbau aus einer Hand.',
};

const SIDEBAR: SidebarItem[] = [
  { id: 'neubau', num: '01', label: 'Neubau in Holz' },
  { id: 'anbau', num: '02', label: 'Anbau & Aufstockung' },
  { id: 'sanierung', num: '03', label: 'Sanierung' },
  { id: 'dach', num: '04', label: 'Dach & Dachdeckerei' },
  { id: 'energetik', num: '05', label: 'Energetik & PV' },
  { id: 'innenausbau', num: '06', label: 'Innenausbau' },
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
    q: 'Wie lange dauert ein Neubau?',
    a: 'Ein Einfamilienhaus im Holzrahmenbau dauert ca. 6–12 Monate, abhängig von Größe und Ausstattung.',
  },
  {
    q: 'Beraten Sie bei Förderprogrammen?',
    a: 'Ja, wir beraten zu KfW- und BAFA-Programmen für energieeffizientes Bauen und Sanieren.',
  },
  {
    q: 'Welche Region deckt FriStD-Bau ab?',
    a: 'Hamburg und Umgebung — wir arbeiten heimatnah und vermeiden lange Anfahrten.',
  },
];

const sectionWrap: React.CSSProperties = {
  paddingBottom: 'clamp(48px, 7vw, 80px)',
  borderBottom: '1px solid #ECEBE6',
  marginBottom: 'clamp(48px, 7vw, 80px)',
};

const sectionWrapLast: React.CSSProperties = {
  paddingBottom: 'clamp(48px, 7vw, 80px)',
};

const headRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 16,
  marginBottom: 18,
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
};

const leadParagraph: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.65,
  color: '#2E2F31',
  margin: 0,
};

const metaGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: 16,
  marginTop: 24,
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

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={metaLabel}>{label}</div>
      <div style={metaValue}>{value}</div>
    </div>
  );
}

export default function LeistungenPage() {
  return (
    <div>
      <Header active="leistungen" />

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
          Alle Gewerke.
          <br />
          Ein Ansprechpartner.
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: '#6B6C6F',
            maxWidth: 640,
            margin: 0,
          }}
        >
          Vom Bauantrag bis zur Schlüsselübergabe — unsere Kompetenzen greifen
          ineinander und werden über unser eingespieltes Meister-Netz koordiniert.
        </p>
      </section>

      {/* TWO-COL: sidebar nav + content */}
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
            {/* 01 Neubau */}
            <div id="neubau" style={sectionWrap}>
              <div style={headRow}>
                <span style={numStyle}>01</span>
                <h2 style={h2Style}>Neubau in Holz</h2>
              </div>
              <ImageSlot
                id="leist-1"
                style={slotStyle}
                placeholder="Foto: Neubau in Holz — fertiges Einfamilien- oder Mehrfamilienhaus, repräsentative Außenansicht"
              />
              <p style={{ ...leadParagraph, marginBottom: 18 }}>
                Eigenheime und Mehrfamilienhäuser im Holzrahmenbau — gesamtheitlich
                geplant. Vom ersten Skizzengespräch über Bauantrag und Statik bis zur
                Schlüsselübergabe übernehmen wir alle Schritte.
              </p>
              <div style={metaGrid}>
                <MetaCell
                  label="Enthalten"
                  value="Holzrahmenbau · Bauplanung · Statik · Bauleitung"
                />
                <MetaCell
                  label="Typisch"
                  value="Einfamilienhaus, Mehrfamilienhaus, Doppelhaus"
                />
                <MetaCell label="Bauzeit" value="ca. 6–12 Monate je Vorhaben" />
              </div>
            </div>

            {/* 02 Anbau */}
            <div id="anbau" style={sectionWrap}>
              <div style={headRow}>
                <span style={numStyle}>02</span>
                <h2 style={h2Style}>Anbau &amp; Aufstockung</h2>
              </div>
              <ImageSlot
                id="leist-2"
                style={slotStyle}
                placeholder="Foto: Aufstockung oder Anbau in Holzbauweise — Außenansicht im Fertigzustand"
              />
              <p style={leadParagraph}>
                Zusätzlicher Wohnraum und spürbare Wertsteigerung für Ihr
                Bestandsgebäude — durch leichten Holzbau ohne aufwendige
                Fundamentarbeit.
              </p>
              <div style={metaGrid}>
                <MetaCell
                  label="Enthalten"
                  value="Holzbau · Maurerarbeiten · Statik · Bauantrag"
                />
                <MetaCell
                  label="Typisch"
                  value="Dachaufstockung, seitlicher Anbau, Erweiterung"
                />
                <MetaCell label="Bauzeit" value="ca. 3–6 Monate" />
              </div>
            </div>

            {/* 03 Sanierung */}
            <div id="sanierung" style={sectionWrap}>
              <div style={headRow}>
                <span style={numStyle}>03</span>
                <h2 style={h2Style}>Sanierung</h2>
              </div>
              <BeforeAfterSlider
                beforeId="leist-3-before"
                afterId="leist-3-after"
                beforePlaceholder="Foto: Sanierung VORHER — Fassade vor Modernisierung"
                afterPlaceholder="Foto: Sanierung NACHHER — Fassade nach Modernisierung"
              />
              <p style={leadParagraph}>
                Behutsame Modernisierung mit Blick auf den energetischen und
                bauphysikalischen Aufbau der Bauteile — für ein gesundes Raumklima
                und niedrige Betriebskosten.
              </p>
              <div style={metaGrid}>
                <MetaCell
                  label="Enthalten"
                  value="WDVS · Bauphysik · Energieberatung · Fenster & Türen"
                />
                <MetaCell
                  label="Typisch"
                  value="Energetische Sanierung, Dachsanierung, Fassade"
                />
                <MetaCell
                  label="Förderung"
                  value="Beratung zu KfW & BAFA-Programmen"
                />
              </div>
            </div>

            {/* 04 Dach */}
            <div id="dach" style={sectionWrap}>
              <div style={headRow}>
                <span style={numStyle}>04</span>
                <h2 style={h2Style}>Dach &amp; Dachdeckerei</h2>
              </div>
              <ImageSlot
                id="leist-4"
                style={slotStyle}
                placeholder="Foto: Dachstuhl im Rohbau oder fertige Dacheindeckung (Detail Holz-Konstruktion)"
              />
              <p style={leadParagraph}>
                Dachstühle, Dachsanierungen und Carports — handwerklich sauber
                ausgeführt vom Zimmerermeister. Klempnerarbeiten und Eindeckung aus
                einer Hand.
              </p>
              <div style={metaGrid}>
                <MetaCell
                  label="Enthalten"
                  value="Dachstuhl · Dachdeckung · Klempnerarbeiten · Carport"
                />
                <MetaCell
                  label="Typisch"
                  value="Neueindeckung, Dachstuhl-Erneuerung, Holz-Carport"
                />
                <MetaCell label="Bauzeit" value="ca. 2–6 Wochen" />
              </div>
            </div>

            {/* 05 Energetik */}
            <div id="energetik" style={sectionWrap}>
              <div style={headRow}>
                <span style={numStyle}>05</span>
                <h2 style={h2Style}>Energetik &amp; PV</h2>
              </div>
              <ImageSlot
                id="leist-5"
                style={slotStyle}
                placeholder="Foto: Photovoltaik-Anlage auf Dach oder installierte Wärmepumpe"
              />
              <p style={leadParagraph}>
                Photovoltaik, Wärmepumpen und Energieberatung für niedrige
                Betriebskosten. Optional mit Heimautomation für Steuerung von
                Anlagentechnik und Elektronik.
              </p>
              <div style={metaGrid}>
                <MetaCell
                  label="Enthalten"
                  value="Photovoltaik · Wärmepumpe · Energieberatung · Heimautomation"
                />
                <MetaCell label="Standards" value="KfW-Effizienzhaus 40 & 55" />
                <MetaCell
                  label="Förderung"
                  value="Beratung zu Förderprogrammen inklusive"
                />
              </div>
            </div>

            {/* 06 Innenausbau */}
            <div id="innenausbau" style={sectionWrapLast}>
              <div style={headRow}>
                <span style={numStyle}>06</span>
                <h2 style={h2Style}>Innenausbau</h2>
              </div>
              <ImageSlot
                id="leist-6"
                style={slotStyle}
                placeholder="Foto: Innenausbau — fertiger Wohnraum, Trockenbau-Detail oder Bodenbelag"
              />
              <p style={leadParagraph}>
                Trockenbau und hochwertiger Innenausbau — der letzte Schliff für ein
                fertiges Zuhause. Inklusive Maler-, Sanitär- und Elektrikerarbeiten
                über unser Meister-Netz.
              </p>
              <div style={metaGrid}>
                <MetaCell
                  label="Enthalten"
                  value="Trockenbau · Malerarbeiten · Sanitär · Elektrik"
                />
                <MetaCell
                  label="Typisch"
                  value="Komplettausbau, Badsanierung, Bodenbeläge"
                />
                <MetaCell label="Bauzeit" value="je nach Umfang" />
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
            Kombination.
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

      <Footer />
    </div>
  );
}
