/**
 * Einmaliger Seed: fuellt Settings, Referenzen, Jobs und Medien mit den
 * hartcodierten Defaults, damit sie im Admin sichtbar/editierbar sind.
 *
 * Ausfuehrung:
 *   docker exec -it fristd-bau-website npm run seed
 *
 * Idempotent: laeuft nur wenn Collections leer sind.
 */
import path from 'path';
import fs from 'fs';
import { getPayload } from 'payload';
import config from '@payload-config';

// Explicit stdout writes umgehen jegliches console.log-Buffering.
const log = (msg: string) => process.stdout.write(`[seed] ${msg}\n`);
const err = (msg: string) => process.stderr.write(`[seed ERROR] ${msg}\n`);

// Fange ALLES was sonst silent stirbt.
process.on('uncaughtException', (e) => {
  err('uncaughtException: ' + (e?.stack || String(e)));
  process.exit(2);
});
process.on('unhandledRejection', (e) => {
  err('unhandledRejection: ' + (e instanceof Error ? e.stack : String(e)));
  process.exit(3);
});
process.on('exit', (code) => {
  process.stdout.write(`[seed] Prozess beendet mit code ${code}\n`);
});

log('start');
log(`node ${process.version} · pid ${process.pid}`);
log(`cwd = ${process.cwd()}`);

const projectRoot = process.cwd();
const imagesDir = path.resolve(projectRoot, 'public/images');
log(`imagesDir = ${imagesDir} (existiert: ${fs.existsSync(imagesDir)})`);

type ImgSpec = { rel: string; alt: string };

async function uploadImage(payload: any, spec: ImgSpec): Promise<string | null> {
  const abs = path.join(imagesDir, spec.rel);
  if (!fs.existsSync(abs)) {
    log(`  Datei fehlt: ${abs} - skip`);
    return null;
  }
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
  log(`  Bild hochgeladen: ${filename} (id=${doc.id})`);
  return doc.id as string;
}

async function seed() {
  log('Payload-Config importiert. Type = ' + typeof config);
  log('Payload initialisieren...');
  const started = Date.now();
  const payload = await getPayload({ config });
  log(`Payload bereit nach ${Date.now() - started}ms`);

  // 1) Settings
  log('Settings setzen...');
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
      copyright: '© 2026 FriStD-Bau ZuB GmbH & Co. KG — Alle Rechte vorbehalten.',
      stats: [
        { value: '15+', label: 'Jahre Erfahrung', highlight: false },
        { value: '12+', label: 'Gewerke aus einer Hand', highlight: false },
        { value: '★ 4,8', label: 'Kunden-Bewertung', highlight: true },
      ],
    },
  });
  log('  Settings OK');

  // 2) Referenzen
  const existingRefs = await payload.find({ collection: 'references', limit: 1 });
  log(`Referenzen: ${existingRefs.totalDocs} vorhanden`);
  if (existingRefs.totalDocs === 0) {
    log('Referenzen anlegen (9 Projekte + Media-Upload)...');
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
        const imageId = await uploadImage(payload, r.img);
        if (!imageId) continue;
        await payload.create({
          collection: 'references',
          data: {
            title: r.title,
            category: r.category,
            location: r.location,
            year: r.year,
            featured: r.featured ?? false,
            order: r.order,
            image: imageId,
          },
        });
        log(`  Referenz angelegt: ${r.title}`);
      } catch (e: any) {
        err(`  Referenz "${r.title}" fehlgeschlagen: ${e?.message || e}`);
      }
    }
  }

  // 3) Jobs
  const existingJobs = await payload.find({ collection: 'jobs', limit: 1 });
  log(`Jobs: ${existingJobs.totalDocs} vorhanden`);
  if (existingJobs.totalDocs === 0) {
    log('Stellenanzeigen anlegen...');
    const JOBS = [
      {
        title: 'Zimmerergeselle (m/w/d)',
        meta: 'Vollzeit · Hamburg · sofort',
        description: 'Mitarbeit bei Neubauten, Aufstockungen und Sanierungen im Holzrahmenbau.',
        tags: [{ label: 'Holzbau' }, { label: 'Geselle' }],
        applyEmail: 'post@fristd-bau.com',
        active: true,
        order: 1,
      },
      {
        title: 'Dachdeckergeselle (m/w/d)',
        meta: 'Vollzeit · Hamburg · sofort',
        description: 'Dacheindeckungen, Dachsanierungen und Klempnerarbeiten an Wohngebäuden.',
        tags: [{ label: 'Dach' }, { label: 'Geselle' }],
        applyEmail: 'post@fristd-bau.com',
        active: true,
        order: 2,
      },
    ];
    for (const j of JOBS) {
      try {
        await payload.create({ collection: 'jobs', data: j });
        log(`  Stelle angelegt: ${j.title}`);
      } catch (e: any) {
        err(`  Stelle "${j.title}" fehlgeschlagen: ${e?.message || e}`);
      }
    }
  }

  log('Seed erfolgreich abgeschlossen.');
  process.exit(0);
}

seed().catch((e) => {
  err('Seed toplevel-catch: ' + (e instanceof Error ? e.stack : String(e)));
  process.exit(1);
});
