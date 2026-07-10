'use client';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        background: '#D2992C',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      ⎙ Formular ausdrucken
    </button>
  );
}
