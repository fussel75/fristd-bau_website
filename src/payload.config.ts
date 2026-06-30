import path from 'path';
import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { de } from '@payloadcms/translations/languages/de';
import { en } from '@payloadcms/translations/languages/en';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { References } from './collections/References';
import { Jobs } from './collections/Jobs';
import { SettingsGlobal } from './globals/Settings';

// Projekt-Root absolut. process.cwd() ist beim Build /app, bei runtime /app
// (Docker WORKDIR). Falls jemand das Repo lokal mit anderem CWD started,
// faellt es auf den klassischen Pfad zurueck.
const projectRoot = process.cwd();

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      title: 'FriStD-Bau Admin',
      description: 'Inhalte fuer die fristd-bau.com Website verwalten',
    },
  },
  collections: [Users, Media, Pages, References, Jobs],
  globals: [SettingsGlobal],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(projectRoot, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./data/payload.db',
    },
  }),
  // Browser-side image processing fuer Crop + Resize
  sharp,
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: 'de',
  },
  // Upload-Files landen unter /app/media (Volume), oeffentlich abrufbar
  // ueber Payload's /api/media/file/<filename> Route oder direkt.
  upload: {
    limits: {
      fileSize: 20_000_000, // 20 MB
    },
  },
});
