'use client';

import { useState } from 'react';
import Link from 'next/link';

const label: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#54555A',
  marginBottom: 7,
};

const input: React.CSSProperties = {
  width: '100%',
  padding: '13px 14px',
  border: '1px solid #E8E7E2',
  borderRadius: 10,
  fontSize: 15,
  fontFamily: 'inherit',
  color: '#2E2F31',
  background: '#fff',
};

const row2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 14,
  marginBottom: 16,
};

const row3: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gap: 14,
  marginBottom: 16,
};

type State =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function WiderrufForm() {
  const [state, setState] = useState<State>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ kind: 'sending' });
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      vorname: String(fd.get('vorname') || '').trim(),
      nachname: String(fd.get('nachname') || '').trim(),
      strasse: String(fd.get('strasse') || '').trim(),
      plz: String(fd.get('plz') || '').trim(),
      ort: String(fd.get('ort') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      telefon: String(fd.get('telefon') || '').trim(),
      dienstleistung: String(fd.get('dienstleistung') || '').trim(),
      bestelltAm: String(fd.get('bestelltAm') || '').trim(),
      erhaltenAm: String(fd.get('erhaltenAm') || '').trim(),
      bemerkung: String(fd.get('bemerkung') || '').trim(),
      datenschutz: fd.get('datenschutz') === 'on',
      hp: String(fd.get('hp') || ''),
    };

    try {
      const res = await fetch('/api/widerruf', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setState({ kind: 'success' });
        form.reset();
      } else {
        setState({
          kind: 'error',
          message: data.error || 'Unbekannter Fehler.',
        });
      }
    } catch {
      setState({
        kind: 'error',
        message:
          'Verbindung fehlgeschlagen. Bitte per E-Mail direkt an post@fristd-bau.com senden.',
      });
    }
  }

  if (state.kind === 'success') {
    return (
      <div
        style={{
          background: '#F0F7F0',
          border: '1px solid #B5D8B5',
          borderRadius: 12,
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#2E7D32',
            marginBottom: 8,
          }}
        >
          ✓ Widerrufserklärung eingegangen
        </div>
        <p style={{ margin: '0 0 14px', color: '#3D5A3D' }}>
          Vielen Dank. Ihre Erklärung ist bei uns eingegangen. Wir bearbeiten
          sie umgehend und melden uns bei Ihnen. Eine Bestätigung haben wir an
          die von Ihnen angegebene E-Mail-Adresse geschickt.
        </p>
        <button
          type="button"
          onClick={() => setState({ kind: 'idle' })}
          style={{
            marginTop: 8,
            background: 'transparent',
            border: '1px solid #B5D8B5',
            color: '#2E7D32',
            padding: '10px 18px',
            borderRadius: 999,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Neues Formular
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: '#FAF8F4',
        border: '1px solid #ECEBE6',
        borderRadius: 12,
        padding: 24,
      }}
    >
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#6B6C6F' }}>
        Empfänger dieser Erklärung:
      </p>
      <p style={{ margin: '0 0 22px', fontWeight: 600 }}>
        FriStD-Bau ZuB GmbH &amp; Co. KG
        <br />
        <span style={{ fontWeight: 400, color: '#6B6C6F' }}>
          Haldesdorfer Str. 44 · 22179 Hamburg · post@fristd-bau.com
        </span>
      </p>

      <div style={row2}>
        <div>
          <label style={label}>Vorname*</label>
          <input name="vorname" required style={input} />
        </div>
        <div>
          <label style={label}>Nachname*</label>
          <input name="nachname" required style={input} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={label}>Straße und Hausnummer*</label>
        <input name="strasse" required style={input} />
      </div>

      <div style={row3}>
        <div>
          <label style={label}>PLZ*</label>
          <input name="plz" required style={input} inputMode="numeric" />
        </div>
        <div>
          <label style={label}>Ort*</label>
          <input name="ort" required style={input} />
        </div>
      </div>

      <div style={row2}>
        <div>
          <label style={label}>E-Mail*</label>
          <input name="email" type="email" required style={input} />
        </div>
        <div>
          <label style={label}>Telefon (optional)</label>
          <input name="telefon" type="tel" style={input} />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={label}>
          Beschreibung der widerrufenen Dienstleistung*
        </label>
        <textarea
          name="dienstleistung"
          required
          rows={3}
          style={{ ...input, resize: 'vertical' }}
          placeholder="z. B. 'Angebot Nr. 2026-042 vom 10.02.2026 – Aufstockung in Holzbauweise'"
        />
      </div>

      <div style={row2}>
        <div>
          <label style={label}>Bestellt am*</label>
          <input name="bestelltAm" type="date" required style={input} />
        </div>
        <div>
          <label style={label}>Erhalten am (falls zutreffend)</label>
          <input name="erhaltenAm" type="date" style={input} />
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={label}>Bemerkung (optional)</label>
        <textarea
          name="bemerkung"
          rows={2}
          style={{ ...input, resize: 'vertical' }}
        />
      </div>

      {/* Honigtopf gegen Spam - nicht sichtbar fuer echte Nutzer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <label>
          Bitte leer lassen{' '}
          <input name="hp" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
          fontSize: 13,
          color: '#6B6C6F',
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        <input
          type="checkbox"
          name="datenschutz"
          required
          style={{ marginTop: 3, flex: 'none' }}
        />
        <span>
          Ich habe die{' '}
          <Link href="/datenschutz" style={{ color: '#D2992C' }}>
            Datenschutzerklärung
          </Link>{' '}
          gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung
          des Widerrufs zu.*
        </span>
      </label>

      {state.kind === 'error' && (
        <div
          style={{
            background: '#FDECEC',
            border: '1px solid #F5C0C0',
            color: '#B02A2A',
            padding: '12px 14px',
            borderRadius: 10,
            marginBottom: 16,
            fontSize: 14,
          }}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={state.kind === 'sending'}
        style={{
          display: 'block',
          width: '100%',
          background: state.kind === 'sending' ? '#B58940' : '#D2992C',
          color: '#fff',
          padding: 15,
          borderRadius: 999,
          fontWeight: 600,
          fontSize: 16,
          border: 'none',
          cursor: state.kind === 'sending' ? 'wait' : 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {state.kind === 'sending'
          ? 'Wird gesendet …'
          : 'Widerruf verbindlich erklären'}
      </button>

      <p
        style={{
          margin: '14px 0 0',
          fontSize: 12,
          color: '#8A8A8C',
          textAlign: 'center',
        }}
      >
        * Pflichtfeld. Ihre Angaben werden verschlüsselt übertragen und
        ausschließlich zur Bearbeitung Ihres Widerrufs verwendet.
      </p>
    </form>
  );
}
