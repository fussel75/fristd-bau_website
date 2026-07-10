import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRate, getClientIp, maybeCleanup } from '@/src/lib/rateLimit';

export const dynamic = 'force-dynamic';

// max 3 Anfragen pro IP in 10 Minuten
const RATE_MAX = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
// Payload-Groessen-Grenze: 100 KB reichen fuer das Formular locker
const MAX_BODY_BYTES = 100 * 1024;

type Payload = {
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  email: string;
  telefon?: string;
  dienstleistung: string;
  bestelltAm: string;
  erhaltenAm?: string;
  bemerkung?: string;
  datenschutz: boolean;
  // Anti-Spam Honigtopf: bleibt im Formular unsichtbar leer
  hp?: string;
};

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  // Body-Groesse begrenzen (verhindert OOM durch riesige JSONs)
  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Anfrage zu gross.' }, { status: 413 });
  }

  // Rate-Limit pro IP
  maybeCleanup(RATE_WINDOW_MS);
  const ip = getClientIp(req);
  const rate = checkRate(`widerruf:${ip}`, RATE_MAX, RATE_WINDOW_MS);
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

  // Anti-Spam: Honigtopf muss leer sein
  if (body.hp && body.hp.trim().length > 0) {
    return NextResponse.json({ ok: true }); // Spam still ignorieren, aber "ok" zurueck
  }

  // Pflichtfelder pruefen
  const missing: string[] = [];
  if (!body.vorname?.trim()) missing.push('Vorname');
  if (!body.nachname?.trim()) missing.push('Nachname');
  if (!body.strasse?.trim()) missing.push('Strasse/Hausnummer');
  if (!body.plz?.trim()) missing.push('PLZ');
  if (!body.ort?.trim()) missing.push('Ort');
  if (!body.email?.trim()) missing.push('E-Mail');
  if (!body.dienstleistung?.trim()) missing.push('Beschreibung der Dienstleistung');
  if (!body.bestelltAm?.trim()) missing.push('Bestelldatum');
  if (!body.datenschutz) missing.push('Datenschutz-Zustimmung');
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Bitte ausfuellen: ${missing.join(', ')}` },
      { status: 400 },
    );
  }

  // Basale E-Mail-Validierung
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { error: 'Bitte eine gueltige E-Mail-Adresse angeben.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Mail-Versand nicht konfiguriert. Bitte per E-Mail direkt an post@fristd-bau.com senden.' },
      { status: 503 },
    );
  }

  const to = process.env.WIDERRUF_TO || 'post@fristd-bau.com';
  const from = process.env.RESEND_FROM || 'FriStD-Bau Website <onboarding@resend.dev>';

  const now = new Date().toLocaleString('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  });

  const fullName = `${body.vorname.trim()} ${body.nachname.trim()}`;
  const address = `${body.strasse.trim()}, ${body.plz.trim()} ${body.ort.trim()}`;

  const textBody = `WIDERRUFSERKLAERUNG
====================

An:
FriStD-Bau ZuB GmbH & Co. KG
Haldesdorfer Str. 44, 22179 Hamburg
E-Mail: post@fristd-bau.com

Hiermit widerrufe(n) ich/wir den abgeschlossenen Vertrag ueber die Erbringung
der folgenden Dienstleistung:

${body.dienstleistung.trim()}

Bestellt am: ${body.bestelltAm.trim()}${body.erhaltenAm?.trim() ? ` (erhalten am: ${body.erhaltenAm.trim()})` : ''}

Name des Verbrauchers:
${fullName}

Anschrift des Verbrauchers:
${address}

E-Mail: ${body.email.trim()}${body.telefon?.trim() ? `\nTelefon: ${body.telefon.trim()}` : ''}

${body.bemerkung?.trim() ? `Bemerkung/Zusatz:\n${body.bemerkung.trim()}\n\n` : ''}Datum der Erklaerung: ${now}

--
Diese Erklaerung wurde ueber das Widerrufsformular auf neu.fristd-bau.com
elektronisch abgeschickt. Absender-Bestaetigung: ${body.email.trim()}
`;

  const htmlBody = `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#1a1a1a;max-width:640px">
    <h2 style="font-family:'Archivo',sans-serif;color:#D2992C;margin:0 0 12px">Widerrufserklärung</h2>
    <p style="color:#6B6C6F;margin:0 0 20px">Über das Widerrufsformular auf <a href="https://neu.fristd-bau.com/widerrufsrecht">neu.fristd-bau.com/widerrufsrecht</a> eingegangen am ${esc(now)}.</p>

    <p><strong>An:</strong><br>
    FriStD-Bau ZuB GmbH &amp; Co. KG<br>
    Haldesdorfer Str. 44, 22179 Hamburg</p>

    <p>Hiermit widerrufe(n) ich/wir den abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:</p>
    <blockquote style="border-left:3px solid #D2992C;padding:8px 14px;margin:10px 0;background:#FAF8F4">${esc(body.dienstleistung.trim()).replace(/\n/g, '<br>')}</blockquote>

    <table style="border-collapse:collapse;margin:20px 0">
      <tr><td style="padding:6px 14px 6px 0;color:#8A8A8C">Bestellt am:</td><td style="padding:6px 0"><strong>${esc(body.bestelltAm.trim())}</strong></td></tr>
      ${body.erhaltenAm?.trim() ? `<tr><td style="padding:6px 14px 6px 0;color:#8A8A8C">Erhalten am:</td><td style="padding:6px 0"><strong>${esc(body.erhaltenAm.trim())}</strong></td></tr>` : ''}
      <tr><td style="padding:6px 14px 6px 0;color:#8A8A8C">Name:</td><td style="padding:6px 0"><strong>${esc(fullName)}</strong></td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#8A8A8C">Anschrift:</td><td style="padding:6px 0">${esc(address)}</td></tr>
      <tr><td style="padding:6px 14px 6px 0;color:#8A8A8C">E-Mail:</td><td style="padding:6px 0"><a href="mailto:${esc(body.email.trim())}">${esc(body.email.trim())}</a></td></tr>
      ${body.telefon?.trim() ? `<tr><td style="padding:6px 14px 6px 0;color:#8A8A8C">Telefon:</td><td style="padding:6px 0">${esc(body.telefon.trim())}</td></tr>` : ''}
    </table>

    ${body.bemerkung?.trim() ? `<p><strong>Bemerkung:</strong><br>${esc(body.bemerkung.trim()).replace(/\n/g, '<br>')}</p>` : ''}

    <hr style="border:none;border-top:1px solid #ECEBE6;margin:24px 0">
    <p style="color:#8A8A8C;font-size:13px">Diese Erklärung wurde über das Widerrufsformular auf neu.fristd-bau.com elektronisch abgeschickt.</p>
  </div>`;

  const resend = new Resend(apiKey);
  try {
    const send = await resend.emails.send({
      from,
      to: [to],
      // Kopie an den Absender geht als BCC / Reply-To — Reply-To ist wichtig,
      // damit du direkt auf die Kunden-Mail antworten kannst
      replyTo: body.email.trim(),
      subject: `Widerrufserklärung von ${fullName}`,
      text: textBody,
      html: htmlBody,
    });
    if (send.error) {
      console.error('[widerruf] Resend-Error:', send.error);
      return NextResponse.json(
        { error: 'Mail-Versand fehlgeschlagen. Bitte per E-Mail direkt senden.' },
        { status: 502 },
      );
    }

    // Bestaetigung an den Kunden (optional, nur wenn from-domain verifiziert)
    try {
      await resend.emails.send({
        from,
        to: [body.email.trim()],
        subject: 'Bestätigung Ihrer Widerrufserklärung',
        text: `Sehr geehrte/r ${fullName},\n\nvielen Dank — Ihre Widerrufserklärung ist bei uns eingegangen. Wir bearbeiten sie umgehend und melden uns bei Ihnen.\n\nZur Ihrer Übersicht senden wir hier nochmal den Inhalt Ihrer Erklärung:\n\n${textBody}\n\nMit freundlichen Grüßen\nFriStD-Bau ZuB GmbH & Co. KG`,
      });
    } catch (e) {
      // Bestaetigungsmail-Fehler ist nicht kritisch — die eigentliche Erklaerung ist raus
      console.warn('[widerruf] Bestaetigung an Kunde fehlgeschlagen:', e);
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[widerruf] Send-Ausnahme:', msg);
    return NextResponse.json(
      { error: 'Interner Fehler beim Versand.' },
      { status: 500 },
    );
  }
}
