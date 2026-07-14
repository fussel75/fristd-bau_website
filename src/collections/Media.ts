import type { CollectionConfig } from 'payload';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const projectRoot = process.cwd();
const STATIC_DIR = path.resolve(projectRoot, 'media');

// Rotiere eine Datei am gegebenen Pfad um die angegebene Gradzahl (im
// Uhrzeigersinn) und schreibe das Ergebnis zurueck.
async function rotateFile(absPath: string, angleDeg: number) {
  if (!fs.existsSync(absPath)) return;
  const buffer = await sharp(absPath).rotate(angleDeg).toBuffer();
  fs.writeFileSync(absPath, buffer);
}

// Rename eine Datei innerhalb des STATIC_DIR. Behaelt die Endung bei falls
// der neue Name keine hat.
function renameFile(oldRel: string, newRel: string) {
  const oldAbs = path.join(STATIC_DIR, oldRel);
  const newAbs = path.join(STATIC_DIR, newRel);
  if (!fs.existsSync(oldAbs) || oldAbs === newAbs) return;
  fs.renameSync(oldAbs, newAbs);
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Bild / Medien',
    plural: 'Bilder & Medien',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description:
      'Bilder fuer die Website. Beim Upload Alt-Text setzen (SEO + Barrierefreiheit). Focal Point definiert wo der Bild-Fokus beim Zuschnitt liegen soll. Rotation dreht das Bild permanent beim Speichern.',
  },
  upload: {
    staticDir: STATIC_DIR,
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'video/mp4',
      'video/webm',
    ],
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 720, height: 480, position: 'centre' },
      { name: 'hero', width: 1600, height: 900, position: 'centre' },
      { name: 'full', width: 2000, height: undefined, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-Text (SEO + Barrierefreiheit)',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift (optional)',
    },
    {
      name: 'rotation',
      type: 'select',
      label: 'Bild drehen',
      defaultValue: '0',
      options: [
        { label: 'Nicht drehen', value: '0' },
        { label: '90° im Uhrzeigersinn', value: '90' },
        { label: '180°', value: '180' },
        { label: '270° (90° gegen den Uhrzeigersinn)', value: '270' },
      ],
      admin: {
        description:
          'Nach dem Speichern wird das Bild + alle Groessen physisch gedreht und das Feld auf "Nicht drehen" zurueckgesetzt.',
      },
    },
  ],
  hooks: {
    // Wenn der User den Dateinamen manuell aendert, benennen wir auch die
    // physische Datei um. Nur der Master-File - die Sizes werden von Payload
    // regeneriert wenn noetig.
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        if (
          originalDoc &&
          data?.filename &&
          data.filename !== originalDoc.filename &&
          !req.context?.skipRenameHook
        ) {
          try {
            renameFile(originalDoc.filename, data.filename);
            // Sizes ebenfalls renamen (Payload macht den DB-Update selbst)
            if (originalDoc.sizes) {
              for (const key of Object.keys(originalDoc.sizes)) {
                const oldName = originalDoc.sizes[key]?.filename;
                const newName = data.sizes?.[key]?.filename;
                if (oldName && newName && oldName !== newName) {
                  renameFile(oldName, newName);
                }
              }
            }
          } catch (e) {
            req.payload.logger.error('Rename fehlgeschlagen: ' + (e as Error).message);
          }
        }
        return data;
      },
    ],
    // Nach dem Speichern: Rotation anwenden falls != 0
    afterChange: [
      async ({ doc, req, operation }) => {
        if (req.context?.skipRotationHook) return doc;
        if (!doc.rotation || doc.rotation === '0') return doc;
        if (operation === 'create' || operation === 'update') {
          const angle = parseInt(doc.rotation, 10);
          try {
            if (doc.filename) {
              await rotateFile(path.join(STATIC_DIR, doc.filename), angle);
            }
            if (doc.sizes) {
              for (const key of Object.keys(doc.sizes)) {
                const s = doc.sizes[key];
                if (s?.filename) {
                  await rotateFile(path.join(STATIC_DIR, s.filename), angle);
                }
              }
            }
            // rotation-Feld zurueck auf 0 setzen (mit context-Flag um Endlosschleife zu vermeiden)
            await req.payload.update({
              collection: 'media',
              id: doc.id,
              data: { rotation: '0' },
              context: { skipRotationHook: true },
            });
          } catch (e) {
            req.payload.logger.error('Rotation fehlgeschlagen: ' + (e as Error).message);
          }
        }
        return doc;
      },
    ],
  },
};
