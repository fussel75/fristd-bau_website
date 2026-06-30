import Link from 'next/link';

type NavKey = 'start' | 'leistungen' | 'referenzen' | 'karriere' | 'kontakt';

const NAV: { key: NavKey; label: string; href: string }[] = [
  { key: 'start', label: 'Start', href: '/' },
  { key: 'leistungen', label: 'Leistungen', href: '/leistungen' },
  { key: 'referenzen', label: 'Referenzen', href: '/referenzen' },
  { key: 'karriere', label: 'Karriere', href: '/karriere' },
  { key: 'kontakt', label: 'Kontakt', href: '/kontakt' },
];

type Settings = {
  companyName: string;
  phone: string;
  phoneLink: string;
};

export function Header({
  active,
  settings,
}: {
  active: NavKey;
  settings: Settings;
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #ECEBE6',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '12px clamp(16px, 3vw, 36px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(12px, 2vw, 28px)',
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src="/fristd-logo.jpg"
            alt={settings.companyName}
            style={{ height: 'clamp(36px, 5vw, 48px)', width: 'auto', display: 'block' }}
          />
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(14px, 2vw, 32px)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {NAV.map((n) => {
            const isActive = n.key === active;
            return (
              <Link
                key={n.key}
                href={n.href}
                style={{
                  textDecoration: 'none',
                  color: isActive ? '#D2992C' : '#54555A',
                  fontSize: 15,
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(10px, 1.4vw, 18px)',
            flexWrap: 'wrap',
          }}
        >
          <a
            href={`tel:${settings.phoneLink}`}
            style={{
              textDecoration: 'none',
              color: '#2E2F31',
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: 'nowrap',
            }}
          >
            {settings.phone}
          </a>
          <Link
            href="/kontakt"
            style={{
              textDecoration: 'none',
              background: '#D2992C',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14,
              whiteSpace: 'nowrap',
            }}
          >
            Angebot anfragen
          </Link>
        </div>
      </div>
    </header>
  );
}
