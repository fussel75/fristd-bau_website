'use client';

import { useEffect, useState } from 'react';

export type SidebarItem = { id: string; num: string; label: string };

export function LeistungenSidebar({ items }: { items: SidebarItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="leistungen-sidebar">
      <div
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8A8A8C',
          marginBottom: 16,
        }}
      >
        Übersicht
      </div>
      {items.map((it, i) => {
        const isActive = it.id === active;
        const isHover = it.id === hover;
        const lift = isHover || isActive;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onMouseEnter={() => setHover(it.id)}
            onMouseLeave={() => setHover(null)}
            style={{
              textDecoration: 'none',
              color: lift ? '#D2992C' : '#2E2F31',
              display: 'flex',
              gap: 14,
              padding: '14px 0',
              paddingLeft: lift ? 10 : 0,
              borderTop: '1px solid #ECEBE6',
              borderBottom:
                i === items.length - 1 ? '1px solid #ECEBE6' : undefined,
              transition: 'padding-left 220ms ease, color 220ms ease',
            }}
          >
            <span
              style={{
                color: '#D2992C',
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              {it.num}
            </span>{' '}
            {it.label}
          </a>
        );
      })}
    </aside>
  );
}
