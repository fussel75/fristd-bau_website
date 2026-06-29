import Link from 'next/link';

export function Footer() {
  return (
    <footer style={{ background: '#2E2F31', color: '#B6B6B8' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 56px) clamp(20px, 4vw, 36px) 28px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(28px, 4vw, 40px)',
            paddingBottom: 36,
            borderBottom: '1px solid #4A4B4D',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <img
              src="/fristd-logo-light.png"
              alt="FriStD-Bau"
              style={{
                height: 'clamp(36px, 5vw, 48px)',
                width: 'auto',
                display: 'block',
                marginBottom: 22,
              }}
            />
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.65,
                color: '#B6B6B8',
                margin: 0,
                maxWidth: 320,
              }}
            >
              FriStD-Bau ZuB GmbH &amp; Co. KG · Zimmerei, Dachdeckerei &amp; Baufirma
              in Hamburg-Bramfeld. Holzbau vom Feinsten.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: '#fff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Kontakt
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.9 }}>
              Haldesdorfer Str. 44
              <br />
              22179 Hamburg
              <br />
              040 / 38 67 45 65
              <br />
              post@fristd-bau.com
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: '#fff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Navigation
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.9 }}>
              <Link href="/" style={footerLink}>Start</Link>
              <Link href="/leistungen" style={footerLink}>Leistungen</Link>
              <Link href="/referenzen" style={footerLink}>Referenzen</Link>
              <Link href="/karriere" style={footerLink}>Karriere</Link>
              <Link href="/kontakt" style={footerLink}>Kontakt</Link>
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: '#fff',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Rechtliches
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.9 }}>
              <Link href="/impressum" style={footerLink}>Impressum</Link>
              <Link href="/datenschutz" style={footerLink}>Datenschutz</Link>
              <Link href="/widerrufsrecht" style={footerLink}>Widerrufsrecht</Link>
              <div>HRA 112897 · Hamburg</div>
            </div>
          </div>
        </div>

        <div
          style={{
            paddingTop: 22,
            fontSize: 13,
            color: '#8A8A8C',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>© 2026 FriStD-Bau ZuB GmbH &amp; Co. KG — Alle Rechte vorbehalten.</div>
          <div>Konzeptentwurf</div>
        </div>
      </div>
    </footer>
  );
}

const footerLink: React.CSSProperties = {
  textDecoration: 'none',
  color: '#B6B6B8',
  display: 'block',
};
