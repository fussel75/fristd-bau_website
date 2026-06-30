import type { CollectionConfig } from 'payload';

export const References: CollectionConfig = {
  slug: 'references',
  labels: {
    singular: 'Referenz',
    plural: 'Referenzen',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'year', 'updatedAt'],
    description: 'Bauprojekte fuer die Referenzen-Seite und das Start-Karussell.',
    listSearchableFields: ['title', 'location'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Projekt-Titel',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategorie',
      required: true,
      options: [
        { label: 'Neubau', value: 'Neubau' },
        { label: 'Anbau', value: 'Anbau' },
        { label: 'Aufstockung', value: 'Aufstockung' },
        { label: 'Sanierung', value: 'Sanierung' },
        { label: 'Dach', value: 'Dach' },
        { label: 'Energetik', value: 'Energetik' },
        { label: 'Innenausbau', value: 'Innenausbau' },
        { label: 'Sonderbau', value: 'Sonderbau' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Ort',
      defaultValue: 'Hamburg',
    },
    {
      name: 'year',
      type: 'text',
      label: 'Jahr',
      admin: { width: '120px' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Haupt-Foto',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Auf der Startseite anzeigen',
      defaultValue: false,
      admin: {
        description: 'Wenn aktiviert, taucht das Projekt im Karussell auf der Start-Seite auf.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sortierung',
      defaultValue: 0,
      admin: {
        description:
          'Niedrigere Zahl = weiter vorne. Bei Gleichstand: neuester zuerst.',
        width: '120px',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung (optional)',
    },
  ],
};
