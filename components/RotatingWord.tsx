'use client';

import { useEffect, useState } from 'react';

const WORDS = [
  'Holzhaus.',
  'Aufstockung.',
  'Dachstuhl.',
  'Wärmepumpe.',
  'Bad.',
];

export function RotatingWord() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{
        color: '#D2992C',
        display: 'inline-block',
        minWidth: 'min(260px, 60vw)',
        transition: 'opacity 250ms',
      }}
    >
      {WORDS[idx]}
    </span>
  );
}
