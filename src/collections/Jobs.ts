import type { CollectionConfig } from 'payload';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Stellenanzeige',
    plural: 'Stellenanzeigen',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'meta', 'active', 'updatedAt'],
    description: 'Offene Stellen fuer die Karriere-Seite.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Job-Titel',
      required: true,
    },
    {
      name: 'meta',
      type: 'text',
      label: 'Meta-Info (z.B. "Vollzeit · Hamburg · sofort")',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Kurzbeschreibung',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags / Stichworte',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'applyEmail',
      type: 'email',
      label: 'Bewerbungs-E-Mail',
      defaultValue: 'post@fristd-bau.com',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktiv (auf der Website sichtbar)',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 0,
      admin: { width: '120px' },
    },
  ],
};
