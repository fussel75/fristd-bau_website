// Health-Endpoint fuer Docker HEALTHCHECK.
// Sehr leichtgewichtig: keine DB-Pruefung, nur Liveness.
// Lass den Container nicht killen wenn die DB mal kurz hakt - sie kann sich erholen.
export const dynamic = 'force-static';

export function GET() {
  return new Response('ok', {
    status: 200,
    headers: { 'content-type': 'text/plain' },
  });
}
