'use client';

import { useEffect, useRef, useState } from 'react';

export type HeroSlide = {
  src: string;
  alt: string;
};

/**
 * Auto-Fade-Slideshow fuers Startseiten-Hero. Alle Bilder werden
 * uebereinander gestapelt und per opacity ein-/ausgeblendet — kein
 * DOM-Neuaufbau, dadurch ist der Uebergang butterweich und ohne Flicker.
 *
 * - Auto-Wechsel alle `intervalMs` (default 7000)
 * - Pause bei Mouse-Hover / Focus-Within / prefers-reduced-motion
 * - Progress-Dots unten, klickbar
 * - Preloading: Browser laedt naechstes Bild rechtzeitig weil `<img>`
 *   von Anfang an im DOM sitzt
 */
export function HeroSlideshow({
  slides,
  intervalMs = 7000,
  fadeMs = 900,
  height,
  radius = 22,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
  fadeMs?: number;
  height?: string;
  radius?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = slides.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    // Wenn der Nutzer reduzierte Bewegung eingestellt hat: kein Auto-Wechsel
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearTimeout(t);
  }, [index, count, paused, intervalMs]);

  // Wenn nur ein Bild: einfach als statisches Bild rendern.
  if (count === 0) return null;

  const containerHeight = height ?? 'clamp(280px, 50vw, 560px)';

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: containerHeight,
        borderRadius: radius,
        overflow: 'hidden',
        background: '#ECEBE6',
      }}
      aria-roledescription="carousel"
      aria-label="FriStD-Bau Referenz-Slideshow"
    >
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
            display: 'block',
          }}
          aria-hidden={i !== index}
        />
      ))}

      {count > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            zIndex: 2,
          }}
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1} von ${count} anzeigen`}
                aria-current={active}
                style={{
                  width: active ? 28 : 10,
                  height: 10,
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.6)',
                  background: active
                    ? '#D2992C'
                    : 'rgba(255,255,255,0.35)',
                  padding: 0,
                  cursor: 'pointer',
                  transition:
                    'width 220ms ease, background 220ms ease',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
