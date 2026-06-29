'use client';

import { useState } from 'react';

export type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number>(-1);

  return (
    <>
      {items.map((f, i) => {
        const isOpen = i === openIdx;
        return (
          <div
            key={i}
            onClick={() => setOpenIdx(isOpen ? -1 : i)}
            style={{
              borderTop: '1px solid #ECEBE6',
              padding: '24px 0',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
              <h3
                style={{
                  fontFamily: "'Archivo', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(17px, 1.8vw, 20px)',
                  margin: 0,
                  flex: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                {f.q}
              </h3>
              <span
                style={{
                  fontSize: 26,
                  color: '#D2992C',
                  lineHeight: 1,
                  fontWeight: 400,
                  flex: 'none',
                }}
              >
                {isOpen ? '–' : '+'}
              </span>
            </div>
            {isOpen && (
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: '#6B6C6F',
                  margin: '14px 0 0',
                }}
              >
                {f.a}
              </p>
            )}
          </div>
        );
      })}
      <div style={{ borderTop: '1px solid #ECEBE6' }} />
    </>
  );
}
