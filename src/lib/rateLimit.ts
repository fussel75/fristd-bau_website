import type { NextRequest } from 'next/server';

/**
 * Simpler In-Memory-Bucket pro IP. Ausreichend fuer einen Handwerksbetrieb
 * mit einem einzigen Container-Instance — kein Redis noetig. Bei
 * Container-Neustart wird der Speicher geloescht (dann ist der Bot eh weg).
 */

type Bucket = number[];
const store = new Map<string, Bucket>();

/**
 * Holt die Client-IP aus dem Request. Traefik/Hostinger reichen die echte
 * IP als X-Forwarded-For weiter. Falls das fehlt, faellt es auf "unknown"
 * zurueck — dann teilen sich alle Requests denselben Bucket, was nur ein
 * Rate-Limit-Problem waere, kein Sicherheitsproblem.
 */
export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

/**
 * Prueft ob die IP innerhalb des Zeitfensters noch Requests machen darf.
 * Gibt { ok: true } zurueck wenn ja, sonst { ok: false, retryAfter } (in
 * Sekunden bis zum naechsten erlaubten Request).
 *
 * @param key   Eindeutiger Schluessel pro Endpoint + IP, z.B. `widerruf:1.2.3.4`
 * @param max   Maximale Anzahl Requests im Fenster
 * @param windowMs  Fenstergroesse in Millisekunden
 */
export function checkRate(
  key: string,
  max: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = store.get(key) || [];
  // Alte Timestamps rausschmeissen
  const fresh = bucket.filter((t) => now - t < windowMs);
  if (fresh.length >= max) {
    const oldest = fresh[0];
    const retryAfter = Math.ceil((windowMs - (now - oldest)) / 1000);
    store.set(key, fresh);
    return { ok: false, retryAfter };
  }
  fresh.push(now);
  store.set(key, fresh);
  return { ok: true };
}

/**
 * Occasional Cleanup: alle 5 Minuten alte Buckets entfernen, damit der
 * Speicher nicht ewig waechst. Laeuft nur wenn die Route aufgerufen wird —
 * kein Timer noetig.
 */
let lastCleanup = 0;
export function maybeCleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  for (const [k, bucket] of store.entries()) {
    const fresh = bucket.filter((t) => now - t < windowMs);
    if (fresh.length === 0) store.delete(k);
    else store.set(k, fresh);
  }
}
