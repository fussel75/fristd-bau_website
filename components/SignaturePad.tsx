'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  onChange?: (dataUrl: string | null) => void;
  height?: number;
  label?: string;
};

/**
 * Unterschrift-Feld mit Canvas + Pointer Events (funktioniert auf Touch, Stift
 * und Maus). Rendert die Zeichenflaeche in Device-Pixel-Aufloesung damit die
 * Unterschrift auf Retina/HiDPI knackig bleibt. Beim Aendern wird ein
 * data:image/png-URL an onChange geliefert (leer=null wenn Feld leer).
 */
export function SignaturePad({ onChange, height = 180, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [empty, setEmpty] = useState(true);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = height + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [height]);

  function getPoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    lastPoint.current = getPoint(e);
  }

  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const p = getPoint(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    lastPoint.current = p;
  }

  function onUp(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    drawing.current = false;
    lastPoint.current = null;
    setEmpty(false);
    if (onChange && canvasRef.current) {
      onChange(canvasRef.current.toDataURL('image/png'));
    }
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
    onChange?.(null);
  }

  return (
    <div>
      {label && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#54555A',
            marginBottom: 7,
          }}
        >
          {label}
        </div>
      )}
      <div
        ref={wrapRef}
        style={{
          position: 'relative',
          background: '#fff',
          border: '1px solid #E8E7E2',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{
            display: 'block',
            width: '100%',
            touchAction: 'none',
            cursor: 'crosshair',
          }}
        />
        {empty && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              color: '#B0B0B2',
              fontSize: 14,
              fontStyle: 'italic',
            }}
          >
            Hier mit Finger, Stift oder Maus unterschreiben
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: 12,
            right: 12,
            borderTop: '1px dashed #D0D0D2',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div style={{ marginTop: 8, textAlign: 'right' }}>
        <button
          type="button"
          onClick={clear}
          disabled={empty}
          style={{
            background: 'transparent',
            border: 'none',
            color: empty ? '#B0B0B2' : '#D2992C',
            fontSize: 13,
            fontWeight: 600,
            cursor: empty ? 'default' : 'pointer',
            padding: 0,
          }}
        >
          Unterschrift löschen
        </button>
      </div>
    </div>
  );
}
