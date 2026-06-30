'use client';

import { useRef, useState, PointerEvent } from 'react';

type Props = {
  initialPos?: number;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfterSlider({
  initialPos = 50,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: Props) {
  const [pos, setPos] = useState(initialPos);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(next);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    try {
      (e.currentTarget as Element & {
        setPointerCapture?: (id: number) => void;
      }).setPointerCapture?.(e.pointerId);
    } catch {}
    update(e.clientX);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0) return;
    update(e.clientX);
  };

  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    try {
      (e.currentTarget as Element & {
        releasePointerCapture?: (id: number) => void;
      }).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(240px, 32vw, 360px)',
        marginBottom: 26,
        borderRadius: 16,
        overflow: 'hidden',
        touchAction: 'none',
        cursor: 'ew-resize',
        background: '#FAF8F4',
      }}
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        draggable={false}
      />
      <img
        src={beforeSrc}
        alt={beforeAlt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          userSelect: 'none',
          pointerEvents: 'none',
          clipPath: `inset(0 calc(100% - ${pos}%) 0 0)`,
        }}
        draggable={false}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 3,
          background: '#D2992C',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 46,
            height: 46,
            background: '#D2992C',
            color: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
            userSelect: 'none',
          }}
        >
          ⇆
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          background: 'rgba(0,0,0,0.72)',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        Vorher
      </div>
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          background: '#D2992C',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}
      >
        Nachher
      </div>
    </div>
  );
}
