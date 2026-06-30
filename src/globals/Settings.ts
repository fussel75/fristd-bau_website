import type { GlobalConfig } from 'payload';

export const SettingsGlobal: GlobalConfig = {
  slug: 'settings',
  label: 'Allgemeine Einstellungen',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Header, Footer, Kontaktdaten — fuer alle Seiten zentral.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Kontaktdaten',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              label: 'Firmenname',
              defaultValue: 'FriStD-Bau ZuB GmbH & Co. KG',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon (Anzeige)',
              defaultValue: '040 / 38 67 45 65',
            },
            {
              name: 'phoneLink',
              type: 'text',
              label: 'Telefon (Link, internationale Form)',
              defaultValue: '+494038674565',
            },
            {
              name: 'mobile',
              type: 'text',
              label: 'Mobil (optional)',
              defaultValue: '0163 / 78 456 40',
            },
            {
              name: 'email',
              type: 'email',
              label: 'E-Mail',
              defaultValue: 'post@fristd-bau.com',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Adresse',
              defaultValue: 'Haldesdorfer Str. 44\n22179 Hamburg-Bramfeld',
            },
            {
              name: 'hours',
              type: 'array',
              label: 'Erreichbarkeit',
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  required: true,
                  label: 'Tage',
                },
                {
                  name: 'time',
                  type: 'text',
                  required: true,
                  label: 'Zeit',
                },
              ],
              defaultValue: [
                { days: 'Mo – Fr', time: '07:00 – 17:00' },
                { days: 'Sa', time: 'nach Vereinbarung' },
                { days: 'So', time: 'geschlossen' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerTagline',
              type: 'textarea',
              label: 'Footer-Beschreibung',
              defaultValue:
                'FriStD-Bau ZuB GmbH & Co. KG · Zimmerei, Dachdeckerei & Baufirma in Hamburg-Bramfeld. Holzbau vom Feinsten.',
            },
            {
              name: 'legalRegistration',
              type: 'text',
              label: 'Registergericht-Eintrag',
              defaultValue: 'HRA 112897 · Hamburg',
            },
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright-Text',
              defaultValue:
                '© 2026 FriStD-Bau ZuB GmbH & Co. KG — Alle Rechte vorbehalten.',
            },
          ],
        },
        {
          label: 'Statistik (Hero)',
          fields: [
            {
              name: 'stats',
              type: 'array',
              label: 'Stats fuer die Startseite',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Wert (z.B. "15+", "★ 4,8")',
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Untertitel',
                },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Hervorheben (golden)',
                  defaultValue: false,
                },
              ],
              defaultValue: [
                { value: '15+', label: 'Jahre Erfahrung', highlight: false },
                { value: '12+', label: 'Gewerke aus einer Hand', highlight: false },
                { value: '★ 4,8', label: 'Kunden-Bewertung', highlight: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
