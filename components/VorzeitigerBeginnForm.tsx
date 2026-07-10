'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignaturePad } from './SignaturePad';

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

type State =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function VorzeitigerBeginnForm() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [sig1, setSig1] = useState<string | null>(null);
  const [sig2, setSig2] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!sig1) {
      setState({
        kind: 'error',
        message:
          'Bitte unterschreiben Sie die Erklärung zum vorzeitigen Beginn.',
      });
      return;
    }
    if (!sig2) {
      setState({
        kind: 'error',
        message:
          'Bitte unterschreiben Sie zusätzlich die Wertersatz-Vereinbarung.',
      });
      return;
    }

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
      auftrag: String(fd.get('auftrag') || '').trim(),
      wertersatzBasis: String(fd.get('wertersatzBasis') || '').trim(),
      unterschriftsort: String(fd.get('unterschriftsort') || '').trim(),
      signaturErklaerung: sig1,
      signaturWertersatz: sig2,
      datenschutz: fd.get('datenschutz') === 'on',
      hp: String(fd.get('hp') || ''),
    };

    try {
      const res = await fetch('/api/vorzeitiger-beginn', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setState({ kind: 'success' });
        form.reset();
        setSig1(null);
        setSig2(null);
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
          ✓ Erklärung ist bei uns eingegangen
        </div>
        <p style={{ margin: '0 0 14px', color: '#3D5A3D' }}>
          Vielen Dank. Wir können jetzt mit den Arbeiten beginnen. Eine
          Bestätigung mit dem vollständigen Text und Ihren Unterschriften haben
          wir Ihnen zur Aufbewahrung per E-Mail geschickt.
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
        padding: 'clamp(20px, 3vw, 32px)',
      }}
    >
      {/* Kunde */}
      <h3
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: 18,
          margin: '0 0 16px',
        }}
      >
        Ihre Angaben
      </h3>

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

      <div style={row2}>
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

      <div style={{ marginBottom: 26 }}>
        <label style={label}>
          Bezeichnung des Auftrags (z.&nbsp;B. Angebots-Nr., Datum)*
        </label>
        <input
          name="auftrag"
          required
          style={input}
          placeholder="z. B. Angebot Nr. 2026-042 vom 10.02.2026 – Aufstockung Musterstraße"
        />
      </div>

      {/* TEIL 1: Erklärung */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #ECEBE6',
          borderRadius: 12,
          padding: '20px 22px',
          marginBottom: 22,
        }}
      >
        <h3
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: 18,
            margin: '0 0 12px',
          }}
        >
          Erklärung zum vorzeitigen Beginn der Arbeiten
        </h3>
        <p style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.55 }}>
          Ich verlange ausdrücklich, dass die Firma <strong>FriStD-Bau ZuB
          GmbH &amp; Co. KG</strong>, Haldesdorfer Str. 44, 22179 Hamburg{' '}
          <strong>vor Ablauf der 14-tägigen Widerrufsfrist</strong> mit der
          Ausführung der beauftragten Arbeiten beginnt.
        </p>
        <p style={{ margin: '0 0 6px', fontSize: 15, lineHeight: 1.55 }}>
          Mir ist bekannt,
        </p>
        <ul
          style={{
            margin: '0 0 18px',
            paddingLeft: 22,
            fontSize: 15,
            lineHeight: 1.55,
          }}
        >
          <li>
            dass ich bei vollständiger Vertragserfüllung mein Widerrufsrecht
            verliere,
          </li>
          <li>
            dass ich im Falle eines Widerrufs Wertersatz für die bis dahin
            erbrachten Leistungen zu leisten habe.
          </li>
        </ul>
        <SignaturePad
          label="Unterschrift Auftraggeber*"
          onChange={setSig1}
        />
      </div>

      {/* TEIL 2: Wertersatz */}
      <div
        style={{
          background: '#fff',
          border: '1px solid #ECEBE6',
          borderRadius: 12,
          padding: '20px 22px',
          marginBottom: 22,
        }}
      >
        <h3
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: 18,
            margin: '0 0 12px',
          }}
        >
          Vereinbarung zum Wertersatz
        </h3>
        <p style={{ margin: '0 0 10px', fontSize: 15, lineHeight: 1.55 }}>
          Für den Fall eines Widerrufs nach Beginn der Arbeiten verpflichte ich
          mich, den Wert der bis dahin erbrachten Leistungen zu bezahlen.
        </p>
        <p
          style={{
            margin: '0 0 10px',
            fontSize: 15,
            lineHeight: 1.55,
            fontWeight: 600,
          }}
        >
          Die Berechnung erfolgt auf Grundlage:*
        </p>
        <div style={{ marginBottom: 18 }}>
          {[
            { value: 'festpreis', text: 'des vereinbarten Festpreises (anteilig)' },
            { value: 'stunden', text: 'des tatsächlichen Stundenaufwandes gemäß Angebot' },
            { value: 'material', text: 'der verbauten Materialien gemäß Angebot' },
          ].map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                padding: '8px 10px',
                marginBottom: 4,
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 15,
              }}
            >
              <input
                type="radio"
                name="wertersatzBasis"
                value={opt.value}
                required
                style={{ marginTop: 3, flex: 'none' }}
              />
              <span>{opt.text}</span>
            </label>
          ))}
        </div>
        <SignaturePad
          label="Unterschrift Auftraggeber*"
          onChange={setSig2}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={label}>Unterschriftsort*</label>
        <input
          name="unterschriftsort"
          required
          style={input}
          placeholder="Hamburg"
          defaultValue="Hamburg"
        />
      </div>

      {/* Honigtopf gegen Spam */}
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
          gelesen und stimme der Verarbeitung meiner Angaben und meiner
          elektronischen Unterschrift zur Bearbeitung des Auftrags zu.*
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
          : 'Verbindlich absenden'}
      </button>

      <p
        style={{
          margin: '14px 0 0',
          fontSize: 12,
          color: '#8A8A8C',
          textAlign: 'center',
        }}
      >
        * Pflichtfeld. Ihre Angaben werden verschlüsselt übertragen und mit
        Zeitstempel dokumentiert. Sie erhalten eine E-Mail-Kopie zur
        Aufbewahrung.
      </p>
    </form>
  );
}
