import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Seite',
    plural: 'Seiten',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description:
      'Inhalte fuer die einzelnen Seiten. Slug = URL-Pfad (z.B. "start", "leistungen").',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Seitentitel',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL-Pfad)',
      required: true,
      unique: true,
      admin: {
        description:
          'Eindeutig. start, leistungen, referenzen, karriere, kontakt — kein "/", keine Umlaute.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta-Description (fuer Google)',
      maxLength: 160,
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero-Bereich',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Kleine Zeile oben (z.B. "Leistungen")',
        },
        {
          name: 'headline',
          type: 'textarea',
          label: 'Hauptueberschrift (Zeilenumbruch erlaubt)',
        },
        {
          name: 'subline',
          type: 'textarea',
          label: 'Untertitel / Beschreibung',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero-Bild (optional)',
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Inhalts-Abschnitte (optional, fuer freie Texte)',
      labels: {
        singular: 'Abschnitt',
        plural: 'Abschnitte',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Ueberschrift',
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Inhalt',
        },
      ],
    },
  ],
};
