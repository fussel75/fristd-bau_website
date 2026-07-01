/**
 * Einmaliger Seed als HTTP-Endpoint statt CLI-Script.
 *
 * Vorteil: Laeuft im bereits initialisierten Payload-Kontext des Servers -
 * kein eigener Prozess, kein Payload-CLI-Silent-Kill.
 *
 * Aufruf (Token = PAYLOAD_SECRET aus .env):
 *   curl -X POST "https://neu.fristd-bau.com/api/seed?token=<SECRET>"
 *
 * Idempotent: skippt Collections die schon Daten haben.
 */
import path from 'path';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

type ImgSpec = { rel: string; alt: string };

async function uploadImage(payload: any, spec: ImgSpec, imagesDir: string) {
  const abs = path.join(imagesDir, spec.rel);
  if (!fs.existsSync(abs)) return { ok: false, reason: `file missing: ${abs}` };
  const buffer = fs.readFileSync(abs);
  const filename = path.basename(spec.rel);
  const mimetype = /\.png$/i.test(filename)
    ? 'image/png'
    : /\.webp$/i.test(filename)
      ? 'image/webp'
      : 'image/jpeg';
  const doc = await payload.create({
    collection: 'media',
    data: { alt: spec.alt },
    file: { data: buffer, mimetype, name: filename, size: buffer.length },
  });
  return { ok: true, id: doc.id as string, filename };
}

async function runSeed(): Promise<Record<string, unknown>> {
  const log: string[] = [];
  const projectRoot = process.cwd();
  const imagesDir = path.resolve(projectRoot, 'public/images');
  log.push(`imagesDir = ${imagesDir} (existiert: ${fs.existsSync(imagesDir)})`);

  const payload = await getPayload({ config });
  log.push('Payload bereit');

  // Settings
  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'FriStD-Bau ZuB GmbH & Co. KG',
      phone: '040 / 38 67 45 65',
      phoneLink: '+494038674565',
      mobile: '0163 / 78 456 40',
      email: 'post@fristd-bau.com',
      address: 'Haldesdorfer Str. 44\n22179 Hamburg-Bramfeld',
      hours: [
        { days: 'Mo – Fr', time: '07:00 – 17:00' },
        { days: 'Sa', time: 'nach Vereinbarung' },
        { days: 'So', time: 'geschlossen' },
      ],
      footerTagline:
        'FriStD-Bau ZuB GmbH & Co. KG · Zimmerei, Dachdeckerei, Heizung & Sanitär. Meisterbetrieb in Hamburg-Bramfeld. Wir bauen. Vom Feinsten.',
      legalRegistration: 'HRA 112897 · Hamburg',
      copyright:
        '© 2026 FriStD-Bau ZuB GmbH & Co. KG — Alle Rechte vorbehalten.',
      stats: [
        { value: '15+', label: 'Jahre Erfahrung', highlight: false },
        { value: '12+', label: 'Gewerke aus einer Hand', highlight: false },
        { value: '★ 4,8', label: 'Kunden-Bewertung', highlight: true },
      ],
    },
  });
  log.push('Settings OK');

  // Referenzen
  const existingRefs = await payload.find({
    collection: 'references',
    limit: 1,
  });
  let refsCreated = 0;
  if (existingRefs.totalDocs === 0) {
    const REFS = [
      { title: 'Holzrahmenbau Heestweg', category: 'Neubau', location: 'Hamburg', year: '2024', featured: true, order: 1, img: { rel: 'referenzen/ref-01-neubau-heestweg.jpg', alt: 'Neubau in Holzrahmenbau mit Holzweichfaser-Daemmung' } },
      { title: 'Effizienzhaus Süderfeldstraße', category: 'Aufstockung', location: 'Hamburg', year: '2023', featured: true, order: 2, img: { rel: 'referenzen/ref-02-aufstockung-suederfeld.jpg', alt: 'Aufstockung in Holzbauweise mit Holzfassade' } },
      { title: 'Mansarddach-Aufstockung Stofferkamp 75', category: 'Aufstockung', location: 'Hamburg', year: '2023', order: 3, img: { rel: 'referenzen/ref-03-mansarddach-stofferkamp75.jpg', alt: 'Mansarddach-Aufstockung in Holzbauweise' } },
      { title: 'Aufstockung Stofferkamp 56', category: 'Aufstockung', location: 'Hamburg', year: '2022', order: 4, img: { rel: 'referenzen/ref-04-aufstockung-stofferkamp56.jpg', alt: 'Aufstockung in Holzbauweise' } },
      { title: 'Dachstuhl Schillerstraße', category: 'Dach', location: 'Hamburg', year: '2023', featured: true, order: 5, img: { rel: 'referenzen/ref-05-dachstuhl-schiller.jpg', alt: 'Dachstuhl-Konstruktion vom Zimmerermeister' } },
      { title: 'Dachsanierung Wacholderweg', category: 'Dach', location: 'Hamburg', year: '2022', order: 6, img: { rel: 'referenzen/ref-06-dachsanierung-wacholderweg.jpg', alt: 'Dachsanierung am Wohngebaeude' } },
      { title: 'Balkonsanierung Grasredder', category: 'Sanierung', location: 'Hamburg', year: '2022', featured: true, order: 7, img: { rel: 'referenzen/ref-07-balkonsanierung-grasredder.jpg', alt: 'Balkonsanierung mit Bangkirai-Holz' } },
      { title: 'Anbau Krupunder Weg', category: 'Anbau', location: 'Hamburg', year: '2021', featured: true, order: 8, img: { rel: 'referenzen/ref-08-anbau-krupunder.jpg', alt: 'Anbau in Holzbauweise' } },
      { title: 'Hausboot Umbau', category: 'Sonderbau', location: 'Hamburg', year: '2021', order: 9, img: { rel: 'referenzen/ref-09-hausboot-umbau.jpg', alt: 'Hausboot mit umgebauter Terrasse' } },
    ];
    for (const r of REFS) {
      try {
        const up = await uploadImage(payload, r.img, imagesDir);
        if (!up.ok) {
          log.push(`SKIP ${r.title}: ${up.reason}`);
          continue;
        }
        await payload.create({
          collection: 'references',
          data: {
            title: r.title,
            category: r.category,
            location: r.location,
            year: r.year,
            featured: r.featured ?? false,
            order: r.order,
            image: up.id,
          },
        });
        refsCreated++;
        log.push(`Referenz: ${r.title}`);
      } catch (e: any) {
        log.push(`FEHLER Referenz "${r.title}": ${e?.message || e}`);
      }
    }
  } else {
    log.push(`Referenzen: ${existingRefs.totalDocs} bereits vorhanden - skip`);
  }

  // Jobs
  const existingJobs = await payload.find({ collection: 'jobs', limit: 1 });
  let jobsCreated = 0;
  if (existingJobs.totalDocs === 0) {
    const JOBS = [
      {
        title: 'Zimmerergeselle (m/w/d)',
        meta: 'Vollzeit · Hamburg · sofort',
        description:
          'Mitarbeit bei Neubauten, Aufstockungen und Sanierungen im Holzrahmenbau.',
        tags: [{ label: 'Holzbau' }, { label: 'Geselle' }],
        applyEmail: 'post@fristd-bau.com',
        active: true,
        order: 1,
      },
      {
        title: 'Dachdeckergeselle (m/w/d)',
        meta: 'Vollzeit · Hamburg · sofort',
        description:
          'Dacheindeckungen, Dachsanierungen und Klempnerarbeiten an Wohngebäuden.',
        tags: [{ label: 'Dach' }, { label: 'Geselle' }],
        applyEmail: 'post@fristd-bau.com',
        active: true,
        order: 2,
      },
    ];
    for (const j of JOBS) {
      try {
        await payload.create({ collection: 'jobs', data: j });
        jobsCreated++;
        log.push(`Stelle: ${j.title}`);
      } catch (e: any) {
        log.push(`FEHLER Stelle "${j.title}": ${e?.message || e}`);
      }
    }
  } else {
    log.push(`Jobs: ${existingJobs.totalDocs} bereits vorhanden - skip`);
  }

  return { ok: true, refsCreated, jobsCreated, log };
}

async function handle(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const expected = process.env.PAYLOAD_SECRET;
  if (!expected || !token || token !== expected) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const result = await runSeed();
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || String(e), stack: e?.stack },
      { status: 500 },
    );
  }
}

export const POST = handle;
export const GET = handle;
