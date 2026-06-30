import type { CollectionConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Bild / Medien',
    plural: 'Bilder & Medien',
  },
  access: {
    read: () => true, // Alle hochgeladenen Medien sind oeffentlich lesbar
  },
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description:
      'Bilder fuer die Website. Beim Upload Alt-Text setzen (SEO + Barrierefreiheit). Focal Point definiert wo der Bild-Fokus beim Zuschnitt liegen soll.',
  },
  upload: {
    // Upload-Ordner (Volume in Docker, lokal: ./media)
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    // Focal point: Punkt der beim Beschnitt der Hauptfokus bleibt
    focalPoint: true,
    // Crop UI im Admin aktivieren
    crop: true,
    // Mehrere Groessen automatisch generieren beim Upload
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 720,
        height: 480,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: 900,
        position: 'centre',
      },
      {
        name: 'full',
        width: 2000,
        height: undefined,
        position: 'centre',
      },
    ],
    // Im Admin wird das thumbnail in Listen angezeigt
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
  ],
};
