import React from 'react';

type Settings = {
  companyName: string;
  phone: string;
  phoneLink: string;
};

export function LegalLayout({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* PAGE INTRO */}
      <section
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding:
            'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px) clamp(24px, 3vw, 40px)',
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
          {eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            margin: '0 0 18px',
          }}
        >
          {title}
        </h1>
      </section>

      {/* CONTENT */}
      <section
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 36px) clamp(56px, 8vw, 96px)',
          fontSize: 16,
          lineHeight: 1.7,
          color: '#2E2F31',
        }}
      >
        {children}
      </section>
    </div>
  );
}

// Wiederverwendbare Sub-Ueberschrift fuer Rechtstexte
export const legalH2Style: React.CSSProperties = {
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(20px, 2.4vw, 24px)',
  letterSpacing: '-0.015em',
  margin: '38px 0 12px',
};

export const legalH3Style: React.CSSProperties = {
  fontFamily: "'Archivo', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(16px, 1.8vw, 18px)',
  margin: '24px 0 8px',
};

export const legalPStyle: React.CSSProperties = {
  margin: '0 0 14px',
};

export const legalUlStyle: React.CSSProperties = {
  margin: '0 0 14px',
  paddingLeft: 22,
};

export const legalDlStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(160px, 200px) 1fr',
  gap: '6px 20px',
  margin: '0 0 20px',
};
