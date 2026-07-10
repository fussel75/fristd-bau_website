import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRate, getClientIp, maybeCleanup } from '@/src/lib/rateLimit';

export const dynamic = 'force-dynamic';

const RATE_MAX = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
// 2 MB reichen fuer zwei PNG-Signaturen in voller Aufloesung.
const MAX_BODY_BYTES = 2 * 1024 * 1024;

type Payload = {
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  email: string;
  telefon?: string;
  auftrag: string;
  wertersatzBasis: 'festpreis' | 'stunden' | 'material';
  unterschriftsort: string;
  signaturErklaerung: string; // data:image/png;base64,...
  signaturWertersatz: string;
  datenschutz: boolean;
  hp?: string;
};

const BASIS_LABEL = {
  festpreis: 'des vereinbarten Festpreises (anteilig)',
  stunden: 'des tatsächlichen Stundenaufwandes gemäß Angebot',
  material: 'der verbauten Materialien gemäß Angebot',
};

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Extrahiere die base64-Rohdaten aus einem data:image-URL fuer Attachments.
function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; mimetype: string } | null {
  const m = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/.exec(dataUrl);
  if (!m) return null;
  return { mimetype: m[1], buffer: Buffer.from(m[2], 'base64') };
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Anfrage zu gross.' }, { status: 413 });
  }

  maybeCleanup(RATE_WINDOW_MS);
  const ip = getClientIp(req);
  const rate = checkRate(`vorzeitiger:${ip}`, RATE_MAX, RATE_WINDOW_MS);
  if (!rate.ok) {
    return NextResponse.json(
      { error: `Zu viele Anfragen. Bitte in ${Math.ceil(rate.retryAfter / 60)} Minuten erneut versuchen.` },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } },
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungueltige Anfrage' }, { status: 400 });
  }

  if (body.hp && body.hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const missing: string[] = [];
  if (!body.vorname?.trim()) missing.push('Vorname');
  if (!body.nachname?.trim()) missing.push('Nachname');
  if (!body.strasse?.trim()) missing.push('Strasse/Hausnummer');
  if (!body.plz?.trim()) missing.push('PLZ');
  if (!body.ort?.trim()) missing.push('Ort');
  if (!body.email?.trim()) missing.push('E-Mail');
  if (!body.auftrag?.trim()) missing.push('Auftrags-Bezeichnung');
  if (!body.wertersatzBasis || !BASIS_LABEL[body.wertersatzBasis]) {
    missing.push('Berechnungsgrundlage');
  }
  if (!body.unterschriftsort?.trim()) missing.push('Unterschriftsort');
  if (!body.signaturErklaerung) missing.push('Unterschrift (Erklaerung)');
  if (!body.signaturWertersatz) missing.push('Unterschrift (Wertersatz)');
  if (!body.datenschutz) missing.push('Datenschutz-Zustimmung');
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Bitte ausfuellen: ${missing.join(', ')}` },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: 'Bitte eine gueltige E-Mail-Adresse angeben.' },
      { status: 400 },
    );
  }

  const sig1 = dataUrlToBuffer(body.signaturErklaerung);
  const sig2 = dataUrlToBuffer(body.signaturWertersatz);
  if (!sig1 || !sig2) {
    return NextResponse.json(
      { error: 'Unterschriften ungueltig.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Mail-Versand nicht konfiguriert. Bitte per E-Mail direkt an post@fristd-bau.com senden.',
      },
      { status: 503 },
    );
  }

  const to = process.env.WIDERRUF_TO || 'post@fristd-bau.com';
  const from =
    process.env.RESEND_FROM || 'FriStD-Bau Website <onboarding@resend.dev>';

  const now = new Date();
  const nowStr = now.toLocaleString('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  });
  const dateStr = now.toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' });

  // Beweismittel: IP (bereits weiter oben ermittelt) und User-Agent
  const ua = req.headers.get('user-agent') || 'unbekannt';

  const fullName = `${body.vorname.trim()} ${body.nachname.trim()}`;
  const address = `${body.strasse.trim()}, ${body.plz.trim()} ${body.ort.trim()}`;
  const wertersatzText = BASIS_LABEL[body.wertersatzBasis];

  const htmlBody = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#1a1a1a;max-width:640px">
    <h2 style="font-family:'Archivo',sans-serif;color:#D2992C;margin:0 0 12px">
      Erklärung zum vorzeitigen Beginn + Wertersatz-Vereinbarung
    </h2>
    <p style="color:#6B6C6F;margin:0 0 22px;font-size:13px">
      Elektronisch signiert am <strong>${esc(nowStr)}</strong><br>
      Ort: ${esc(body.unterschriftsort.trim())}
    </p>

    <div style="background:#FAF8F4;border:1px solid #ECEBE6;padding:14px 18px;border-radius:8px;margin:0 0 22px">
      <div style="font-weight:600;margin-bottom:4px">Auftraggeber</div>
      <div>${esc(fullName)}</div>
      <div style="color:#6B6C6F">${esc(address)}</div>
      <div style="margin-top:6px">E-Mail: <a href="mailto:${esc(body.email.trim())}">${esc(body.email.trim())}</a>${body.telefon?.trim() ? ' &nbsp;·&nbsp; Tel: ' + esc(body.telefon.trim()) : ''}</div>
      <div style="margin-top:8px;color:#6B6C6F"><strong>Auftrag:</strong> ${esc(body.auftrag.trim())}</div>
    </div>

    <h3 style="font-family:'Archivo',sans-serif;font-size:17px;margin:24px 0 8px">Erklärung zum vorzeitigen Beginn der Arbeiten</h3>
    <p>Ich verlange ausdrücklich, dass die Firma <strong>FriStD-Bau ZuB GmbH &amp; Co. KG</strong>, Haldesdorfer Str. 44, 22179 Hamburg <strong>vor Ablauf der 14-tägigen Widerrufsfrist</strong> mit der Ausführung der beauftragten Arbeiten beginnt.</p>
    <p style="margin-bottom:6px">Mir ist bekannt,</p>
    <ul style="margin:0 0 12px">
      <li>dass ich bei vollständiger Vertragserfüllung mein Widerrufsrecht verliere,</li>
      <li>dass ich im Falle eines Widerrufs Wertersatz für die bis dahin erbrachten Leistungen zu leisten habe.</li>
    </ul>
    <div style="margin:12px 0 20px">
      <div style="color:#6B6C6F;font-size:13px;margin-bottom:4px">Unterschrift Auftraggeber · ${esc(body.unterschriftsort.trim())}, ${esc(dateStr)}</div>
      <img src="cid:sig-erklaerung" alt="Unterschrift" style="max-width:320px;border-bottom:1px solid #2E2F31;padding-bottom:4px">
    </div>

    <h3 style="font-family:'Archivo',sans-serif;font-size:17px;margin:24px 0 8px">Vereinbarung zum Wertersatz</h3>
    <p>Für den Fall eines Widerrufs nach Beginn der Arbeiten verpflichte ich mich, den Wert der bis dahin erbrachten Leistungen zu bezahlen.</p>
    <p>Die Berechnung erfolgt auf Grundlage <strong>${esc(wertersatzText)}</strong>.</p>
    <div style="margin:12px 0 20px">
      <div style="color:#6B6C6F;font-size:13px;margin-bottom:4px">Unterschrift Auftraggeber · ${esc(body.unterschriftsort.trim())}, ${esc(dateStr)}</div>
      <img src="cid:sig-wertersatz" alt="Unterschrift" style="max-width:320px;border-bottom:1px solid #2E2F31;padding-bottom:4px">
    </div>

    <hr style="border:none;border-top:1px solid #ECEBE6;margin:28px 0 14px">
    <p style="color:#8A8A8C;font-size:11px;line-height:1.5">
      Beweisdaten (automatisch erfasst zur Authentifizierung der elektronischen Signatur):<br>
      Zeitstempel: ${esc(nowStr)}<br>
      IP-Adresse: ${esc(ip)}<br>
      User-Agent: ${esc(ua)}
    </p>
  </div>`;

  const textBody = `ERKLAERUNG ZUM VORZEITIGEN BEGINN + WERTERSATZ-VEREINBARUNG
============================================================

Elektronisch signiert am: ${nowStr}
Ort: ${body.unterschriftsort.trim()}

AUFTRAGGEBER
${fullName}
${address}
E-Mail: ${body.email.trim()}${body.telefon?.trim() ? '\nTelefon: ' + body.telefon.trim() : ''}

Auftrag: ${body.auftrag.trim()}

--- Erklaerung zum vorzeitigen Beginn ---
Ich verlange ausdruecklich, dass die Firma FriStD-Bau ZuB GmbH & Co. KG,
Haldesdorfer Str. 44, 22179 Hamburg VOR ABLAUF DER 14-taegigen Widerrufsfrist
mit der Ausfuehrung der beauftragten Arbeiten beginnt.

Mir ist bekannt,
- dass ich bei vollstaendiger Vertragserfuellung mein Widerrufsrecht verliere,
- dass ich im Falle eines Widerrufs Wertersatz fuer die bis dahin erbrachten
  Leistungen zu leisten habe.

Unterschrift siehe Attachment "unterschrift-erklaerung.png"

--- Vereinbarung zum Wertersatz ---
Fuer den Fall eines Widerrufs nach Beginn der Arbeiten verpflichte ich mich,
den Wert der bis dahin erbrachten Leistungen zu bezahlen.

Berechnungsgrundlage: ${wertersatzText}

Unterschrift siehe Attachment "unterschrift-wertersatz.png"

--- Beweisdaten ---
Zeitstempel:  ${nowStr}
IP-Adresse:   ${ip}
User-Agent:   ${ua}
`;

  const attachments = [
    {
      filename: 'unterschrift-erklaerung.png',
      content: sig1.buffer.toString('base64'),
      contentType: sig1.mimetype,
      contentId: 'sig-erklaerung',
    },
    {
      filename: 'unterschrift-wertersatz.png',
      content: sig2.buffer.toString('base64'),
      contentType: sig2.mimetype,
      contentId: 'sig-wertersatz',
    },
  ];

  const resend = new Resend(apiKey);
  try {
    const send = await resend.emails.send({
      from,
      to: [to],
      replyTo: body.email.trim(),
      subject: `Vorzeitiger Beginn + Wertersatz — ${fullName}`,
      text: textBody,
      html: htmlBody,
      attachments: attachments as unknown as Parameters<
        typeof resend.emails.send
      >[0]['attachments'],
    });
    if (send.error) {
      console.error('[vorzeitiger-beginn] Resend-Error:', send.error);
      return NextResponse.json(
        { error: 'Mail-Versand fehlgeschlagen. Bitte per E-Mail direkt senden.' },
        { status: 502 },
      );
    }

    // Bestaetigung an Kunde (mit selben Anhaengen)
    try {
      await resend.emails.send({
        from,
        to: [body.email.trim()],
        subject:
          'Bestätigung: Erklärung zum vorzeitigen Beginn + Wertersatz-Vereinbarung',
        text:
          `Sehr geehrte/r ${fullName},\n\nvielen Dank — Ihre elektronische Erklaerung ist bei uns eingegangen. Nachfolgend eine Kopie Ihrer Erklaerung zur Aufbewahrung.\n\n` +
          textBody +
          `\n\nMit freundlichen Gruessen\nFriStD-Bau ZuB GmbH & Co. KG`,
        html: htmlBody,
        attachments: attachments as unknown as Parameters<
          typeof resend.emails.send
        >[0]['attachments'],
      });
    } catch (e) {
      console.warn('[vorzeitiger-beginn] Kunden-Bestaetigung fehlgeschlagen:', e);
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[vorzeitiger-beginn] Send-Ausnahme:', msg);
    return NextResponse.json(
      { error: 'Interner Fehler beim Versand.' },
      { status: 500 },
    );
  }
}
