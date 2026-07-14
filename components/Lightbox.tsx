'use client';

import { useEffect, useState } from 'react';

export type LightboxSlide = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Modal-Overlay mit Bilder-Slider fuer die Referenz-Karten (und andere
 * Galerien). Wird gerendert wenn `open=true`. Tastatursteuerung:
 * Escape schliesst, Pfeil links/rechts blaettert.
 *
 * Bewusst ohne Portal (kein Next.js Client-Portal-Boilerplate) — funktioniert
 * einwandfrei weil position:fixed + z-index:1000 alles ueberdeckt.
 */
export function Lightbox({
  slides,
  open,
  initialIndex = 0,
  title,
  onClose,
}: {
  slides: LightboxSlide[];
  open: boolean;
  initialIndex?: number;
  title?: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    // Body-Scroll blockieren solange offen
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((i) => (i + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, slides.length, onClose]);

  if (!open || slides.length === 0) return null;

  const current = slides[index];
  const hasMultiple = slides.length > 1;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `Bildergalerie: ${title}` : 'Bildergalerie'}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgb(15, 15, 17)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 3vw, 40px)',
        cursor: 'zoom-out',
      }}
    >
      {/* Header: Titel + Zaehler + Schliessen */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: 'clamp(14px, 2vw, 22px) clamp(18px, 3vw, 28px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',
          fontFamily: 'system-ui,-apple-system,sans-serif',
          cursor: 'default',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ minWidth: 0, overflow: 'hidden' }}>
          {title && (
            <div
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                letterSpacing: '-0.005em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </div>
          )}
          {hasMultiple && (
            <div
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 2,
                letterSpacing: '0.02em',
              }}
            >
              Bild {index + 1} von {slides.length}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Schliessen"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            width: 40,
            height: 40,
            borderRadius: 999,
            fontSize: 20,
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            marginLeft: 12,
            flex: 'none',
          }}
        >
          ×
        </button>
      </div>

      {/* Bild-Bereich */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'min(1200px, 100%)',
          maxHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
        }}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 8,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            display: 'block',
            animation: 'lightbox-fade 260ms ease',
          }}
        />
      </div>

      {/* Caption */}
      {current.caption && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 78,
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: 'min(800px, 92%)',
            padding: '8px 16px',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            fontSize: 14,
            borderRadius: 8,
            cursor: 'default',
            textAlign: 'center',
          }}
        >
          {current.caption}
        </div>
      )}

      {/* Prev / Next */}
      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Vorheriges Bild"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + slides.length) % slides.length);
            }}
            style={arrowStyle('left')}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Naechstes Bild"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % slides.length);
            }}
            style={arrowStyle('right')}
          >
            ›
          </button>
        </>
      )}

      {/* Thumbnail-Reihe */}
      {hasMultiple && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            flexWrap: 'wrap',
            padding: '0 16px',
          }}
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1} anzeigen`}
                aria-current={active}
                style={{
                  width: active ? 44 : 12,
                  height: 12,
                  borderRadius: active ? 6 : 999,
                  border: '1px solid rgba(255,255,255,0.6)',
                  background: active ? '#D2992C' : 'rgba(255,255,255,0.3)',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'width 220ms ease, background 220ms ease',
                }}
              />
            );
          })}
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes lightbox-fade { from { opacity: 0.2; transform: scale(0.985); } to { opacity: 1; transform: scale(1); } }`,
        }}
      />
    </div>
  );
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 'clamp(8px, 2vw, 24px)',
    transform: 'translateY(-50%)',
    width: 48,
    height: 48,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.25)',
    color: '#fff',
    fontSize: 28,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  };
}
