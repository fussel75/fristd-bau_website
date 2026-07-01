import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSettingsOrDefault } from '@/src/lib/data';

export const metadata = {
  title: 'Kontakt — FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Sprechen Sie uns an: Haldesdorfer Str. 44, 22179 Hamburg-Bramfeld. Telefon 040 / 38 67 45 65, E-Mail post@fristd-bau.com.',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  border: '1px solid #E8E7E2',
  borderRadius: 10,
  fontSize: 15,
  fontFamily: 'inherit',
  color: '#2E2F31',
  background: '#fff',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#54555A',
  marginBottom: 7,
};

export default async function KontaktPage() {
  const settings = await getSettingsOrDefault();
  return (
    <div>
      <Header active="kontakt" settings={settings} />

      {/* INTRO */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding:
            'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px) clamp(28px, 4vw, 44px)',
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
            marginBottom: 22,
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
          Kontakt
        </div>
        <h1
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: '0 0 18px',
            maxWidth: 880,
          }}
        >
          Sprechen wir über
          <br />
          Ihr Projekt.
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
          Ob ganzer Neubau oder einzelnes Gewerk — wir beraten Sie unverbindlich und
          erstellen Ihr Angebot.
        </p>
      </section>

      {/* FORM + INFO */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
            alignItems: 'start',
          }}
        >
          {/* FORM */}
          <form
            action="mailto:post@fristd-bau.com"
            method="post"
            encType="text/plain"
            style={{
              background: '#fff',
              border: '1px solid #ECEBE6',
              borderRadius: 20,
              padding: 'clamp(24px, 3vw, 36px)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                margin: '0 0 22px',
                letterSpacing: '-0.015em',
              }}
            >
              Anfrageformular
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div>
                <label style={labelStyle}>Vorname</label>
                <input
                  type="text"
                  name="Vorname"
                  placeholder="Vorname"
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Nachname</label>
                <input
                  type="text"
                  name="Nachname"
                  placeholder="Nachname"
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <label style={labelStyle}>E-Mail</label>
            <input
              type="email"
              name="E-Mail"
              placeholder="ihre@email.de"
              style={{ ...inputStyle, marginBottom: 16 }}
              required
            />

            <label style={labelStyle}>Telefon (optional)</label>
            <input
              type="tel"
              name="Telefon"
              placeholder="040 ..."
              style={{ ...inputStyle, marginBottom: 16 }}
            />

            <label style={labelStyle}>Art des Vorhabens</label>
            <select
              name="Vorhaben"
              style={{ ...inputStyle, marginBottom: 16 }}
              defaultValue=""
              required
            >
              <option value="" disabled>
                Bitte wählen …
              </option>
              <option>Neubau</option>
              <option>Anbau / Aufstockung</option>
              <option>Sanierung</option>
              <option>Dach / Dachdeckerei</option>
              <option>Energetik / PV</option>
              <option>Innenausbau</option>
              <option>Sonstiges</option>
            </select>

            <label style={labelStyle}>Ihr Vorhaben</label>
            <textarea
              name="Nachricht"
              placeholder="Erzählen Sie uns kurz von Ihrem Projekt …"
              rows={5}
              style={{
                ...inputStyle,
                marginBottom: 18,
                resize: 'vertical',
              }}
              required
            />

            <label
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                fontSize: 13,
                color: '#6B6C6F',
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              <input type="checkbox" required style={{ marginTop: 2 }} />
              <span>
                Ich habe die{' '}
                <a href="#" style={{ color: '#D2992C' }}>
                  Datenschutzerklärung
                </a>{' '}
                gelesen und stimme zu.
              </span>
            </label>

            <button
              type="submit"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                textDecoration: 'none',
                background: '#D2992C',
                color: '#fff',
                padding: 15,
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Anfrage senden
            </button>
          </form>

          {/* DIREKTER KONTAKT */}
          <div>
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#8A8A8C',
                marginBottom: 16,
              }}
            >
              Direkter Kontakt
            </div>

            <div
              style={{
                marginBottom: 28,
                paddingBottom: 24,
                borderBottom: '1px solid #ECEBE6',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8A8A8C',
                  marginBottom: 6,
                }}
              >
                Telefon
              </div>
              <a
                href="tel:+494038674565"
                style={{
                  textDecoration: 'none',
                  color: '#2E2F31',
                  fontSize: 'clamp(20px, 2.4vw, 28px)',
                  fontWeight: 700,
                  fontFamily: "'Archivo', sans-serif",
                  letterSpacing: '-0.015em',
                }}
              >
                040 / 38 67 45 65
              </a>
              <div style={{ fontSize: 14, color: '#8A8A8C', marginTop: 4 }}>
                Mobil: 0163 / 78 456 40
              </div>
            </div>

            <div
              style={{
                marginBottom: 28,
                paddingBottom: 24,
                borderBottom: '1px solid #ECEBE6',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8A8A8C',
                  marginBottom: 6,
                }}
              >
                E-Mail
              </div>
              <a
                href="mailto:post@fristd-bau.com"
                style={{
                  textDecoration: 'none',
                  color: '#2E2F31',
                  fontSize: 'clamp(18px, 2vw, 22px)',
                  fontWeight: 700,
                  fontFamily: "'Archivo', sans-serif",
                  letterSpacing: '-0.015em',
                  wordBreak: 'break-all',
                }}
              >
                post@fristd-bau.com
              </a>
            </div>

            <div
              style={{
                marginBottom: 28,
                paddingBottom: 24,
                borderBottom: '1px solid #ECEBE6',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8A8A8C',
                  marginBottom: 6,
                }}
              >
                Adresse
              </div>
              <div
                style={{
                  color: '#2E2F31',
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.45,
                }}
              >
                Haldesdorfer Str. 44
                <br />
                22179 Hamburg-Bramfeld
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#8A8A8C',
                  marginBottom: 10,
                }}
              >
                Erreichbarkeit
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#2E2F31' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <span>Mo – Fr</span>
                  <span style={{ color: '#6B6C6F' }}>07:00 – 17:00</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <span>Sa</span>
                  <span style={{ color: '#6B6C6F' }}>nach Vereinbarung</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <span>So</span>
                  <span style={{ color: '#6B6C6F' }}>geschlossen</span>
                </div>
              </div>
            </div>

            {/* OpenStreetMap-Embed — Haldesdorfer Str. 44, 22179 Hamburg-Bramfeld */}
            <iframe
              title="Standort Haldesdorfer Str. 44, 22179 Hamburg-Bramfeld"
              src="https://www.openstreetmap.org/export/embed.html?bbox=10.0742%2C53.5988%2C10.0902%2C53.6048&layer=mapnik&marker=53.6018%2C10.0822"
              style={{
                width: '100%',
                height: 240,
                border: '1px solid #ECEBE6',
                borderRadius: 14,
              }}
              loading="lazy"
            />
            <div style={{ fontSize: 12, marginTop: 6, color: '#8A8A8C' }}>
              <a
                href="https://www.openstreetmap.org/?mlat=53.6018&mlon=10.0822#map=17/53.6018/10.0822"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#8A8A8C' }}
              >
                Größere Karte anzeigen
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
