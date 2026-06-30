'use client';

import { useState } from 'react';

export type RefProject = {
  cat: string;
  title: string;
  loc: string;
  year: string;
  img: string;
  alt: string;
};

const CATS = ['Alle', 'Neubau', 'Aufstockung', 'Sanierung', 'Dach', 'Anbau', 'Sonderbau'];

export function ReferenzenGallery({ projects }: { projects: RefProject[] }) {
  const [filter, setFilter] = useState<string>('Alle');
  const visible =
    filter === 'Alle' ? projects : projects.filter((p) => p.cat === filter);

  return (
    <>
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
            <img
              src={p.img}
              alt={p.alt}
              style={{
                width: '100%',
                height: 'clamp(220px, 28vw, 280px)',
                objectFit: 'cover',
                display: 'block',
              }}
            />
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
