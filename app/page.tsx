import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 40,
        fontFamily: "'Hanken Grotesk', sans-serif",
      }}
    >
      <img
        src="/fristd-logo.jpg"
        alt="FriStD-Bau"
        style={{ height: 60, width: 'auto' }}
      />
      <h1
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: 28,
          margin: 0,
          textAlign: 'center',
        }}
      >
        FriStD-Bau — Konzeptentwurf
      </h1>
      <p style={{ color: '#6B6C6F', maxWidth: 480, textAlign: 'center', margin: 0 }}>
        Implementiert ist aktuell die Leistungen-Seite. Weitere Seiten folgen.
      </p>
      <Link
        href="/leistungen"
        style={{
          textDecoration: 'none',
          background: '#D2992C',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: 999,
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        Zur Leistungen-Seite →
      </Link>
    </main>
  );
}
