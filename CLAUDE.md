# FriStD-Bau Website

Firmen-Website für **FriStD-Bau ZuB GmbH & Co. KG** (Zimmerei, Dachdeckerei, Heizungsbau) in Hamburg-Bramfeld. Betreiber: Ronny Friedrich.

## Stack

- **Next.js 15** App-Router mit SSR (`export const dynamic = 'force-dynamic'` auf allen dynamischen Seiten)
- **React 19**, TypeScript
- **Payload CMS 3.85** mit SQLite (via drizzle-kit `push: true` — auf Migrations umstellen vor dem nächsten Payload-Update)
- **Docker + Traefik + Let's Encrypt** auf Hostinger-VPS (IP 187.77.67.33)
- **Resend** für Formular-Mails (Widerruf, Vorzeitiger Beginn)
- **Auto-Deploy** per GitHub Actions on push to main (appleboy/ssh-action)

## Domains

- `fristd-bau.com` — alte TYPO3-Seite auf Mittwald (Apex-Umzug steht aus)
- `neu.fristd-bau.com` — neue Seite auf VPS (live)

## Wichtige Verzeichnisse

- `app/(frontend)/` — öffentliche Seiten (Route Group)
- `app/(payload)/` — Payload-Admin unter `/admin`
- `app/api/` — Formular-Handler (`widerruf/`, `vorzeitiger-beginn/`, `seed/`)
- `components/` — geteilte React-Components (SlideShow, Lightbox, WiderrufForm, VorzeitigerBeginnForm, SignaturePad, ReferenzenGallery, LeistungenSidebar, …)
- `src/collections/` — Payload-Collections (References, Pages, Media, Jobs, Users)
- `src/globals/` — Payload-Globals (Settings)
- `src/lib/` — Data-Layer (`data.ts`), Rate-Limit, Schema-Helpers
- `public/images/` — statische Fallback-Bilder (werden bevorzugt durch Payload-Uploads ersetzt)

## Umgebungsvariablen (VPS)

Werden im **Hostinger Docker Manager → Umgebung** gepflegt (nicht in `docker-compose.yml`, dort nur `${VAR}`-Referenzen):

- `PAYLOAD_SECRET` — 64-stellig hex, für JWT-Cookies
- `DATABASE_URI` — SQLite file `file:./data/payload.db` (persistiert via Docker-Volume)
- `NEXT_PUBLIC_SERVER_URL` — `https://neu.fristd-bau.com`
- `RESEND_API_KEY` — für Mail-Versand
- `RESEND_FROM` — Absender-Formatierung (nach Domain-Verifikation umstellen von onboarding@resend.dev)
- `WIDERRUF_TO` — Empfänger-Adresse (default post@fristd-bau.com)

## Wichtige Konventionen

- **Force-dynamic** auf allen Seiten die Payload-Daten lesen — sonst Static-Cache-Falle
- **Bilder**: Alt-Text ist Pflicht in Payload Media. Immer echte Fotos, keine Renderings.
- **Referenz-Titel**: keine Straßennamen (Datenschutz), keine Baujahre (wirkt alt)
- **Rate-Limit + Body-Size-Limit** auf allen öffentlichen API-Routes (siehe `src/lib/rateLimit.ts`)
- **Karriere → Jobs** kommen aus Payload-Collection `jobs`, `active: true` steuert Sichtbarkeit
- **Kontakt-Formular** ist nur `mailto:` (kein Endpoint = spam-frei by design)

## Content-Pflege durch den User (Ronny)

Foto-Archiv liegt auf `T:/` (Netzlaufwerk). Kuration/Upload passiert über Payload-Admin unter `/admin`:

- **Startseite Hero-Slideshow**: Settings → Startseite: Hero-Slides
- **Impressionen-Videos**: Settings → Startseite: Impressionen (Videos, mp4/webm)
- **Referenzen mit Bilder-Galerie**: Referenzen → [Projekt] → Weitere Bilder (Lightbox)
- **Firmen-Info, Öffnungszeiten, Stats**: Settings → jeweiliger Tab

## Deploy

```bash
git push origin main
```

Löst GitHub Actions Workflow aus (`.github/workflows/deploy.yml`). Baut Container auf dem VPS neu. Status: **NICHT per Bash-Loop pollen** — der User schaut selbst in `github.com/fussel75/fristd-bau_website/actions` und sagt Bescheid bei Fehler.

## Feature-Status (Stand `bbda05a`)

**Fertig:**
- Alle 5 Hauptseiten (Start, Leistungen, Referenzen, Karriere, Kontakt)
- 3 Rechtstexte (Impressum, Datenschutz, Widerrufsrecht) mit Widerruf-Formular
- Vorzeitiger-Beginn-Formular mit Canvas-Signatur (Textform § 126b BGB)
- Payload CMS mit 5 Collections + Settings
- SEO: JSON-LD (LocalBusiness, FAQPage, JobPosting, Service, Breadcrumb), sitemap, robots.txt, llms.txt
- Google Search Console verifiziert
- Hero-Slideshow (Startseite), Leistungen-Bild-Slider (3 Sektionen), Referenz-Karten-Slider mit Lightbox
- Security-Hardening: Rate-Limit, Body-Size-Limit, Security-Headers

**Offen:**
- Impressionen-Sektion mit Videos aus `T:/Instagram/` (30 .mov Reels → mp4/webm konvertieren + Grid mit Autoplay)
- Bilder-Kandidaten aus T:/ sichten und via Payload-Admin einpflegen
- Resend-Domain-Verifikation (aktuell wohl noch onboarding@resend.dev als Absender)
- Google Business Profile + Bing Places anlegen
- Handwerkskammer-Verzeichnis mit neuer URL aktualisieren
