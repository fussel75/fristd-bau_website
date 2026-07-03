import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ReferenzenGallery, RefProject } from '@/components/ReferenzenGallery';
import { getSettingsOrDefault, getReferences, mediaUrl, MediaShape, getPageHero } from '@/src/lib/data';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, SITE_URL } from '@/src/lib/schema';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Referenzen — FriStD-Bau ZuB GmbH & Co. KG',
  description:
    'Eine Auswahl unserer Bauprojekte aus Hamburg und Umgebung: Neubau, Aufstockung, Sanierung, Dach und mehr.',
};

const PROJECTS: RefProject[] = [
  {
    cat: 'Neubau',
    title: 'Holzrahmenbau Heestweg',
    loc: 'Hamburg',
    year: '2024',
    img: '/images/referenzen/ref-01-neubau-heestweg.jpg',
    alt: 'Neubau in Holzrahmenbau mit Holzweichfaser-Daemmung',
  },
  {
    cat: 'Aufstockung',
    title: 'Effizienzhaus Süderfeldstraße',
    loc: 'Hamburg',
    year: '2023',
    img: '/images/referenzen/ref-02-aufstockung-suederfeld.jpg',
    alt: 'Aufstockung in Holzbauweise mit Holzfassade',
  },
  {
    cat: 'Aufstockung',
    title: 'Mansarddach-Aufstockung Stofferkamp 75',
    loc: 'Hamburg',
    year: '2023',
    img: '/images/referenzen/ref-03-mansarddach-stofferkamp75.jpg',
    alt: 'Mansarddach-Aufstockung in Holzbauweise',
  },
  {
    cat: 'Aufstockung',
    title: 'Aufstockung Stofferkamp 56',
    loc: 'Hamburg',
    year: '2022',
    img: '/images/referenzen/ref-04-aufstockung-stofferkamp56.jpg',
    alt: 'Aufstockung in Holzbauweise',
  },
  {
    cat: 'Dach',
    title: 'Dachstuhl Schillerstraße',
    loc: 'Hamburg',
    year: '2023',
    img: '/images/referenzen/ref-05-dachstuhl-schiller.jpg',
    alt: 'Dachstuhl-Konstruktion vom Zimmerermeister',
  },
  {
    cat: 'Dach',
    title: 'Dachsanierung Wacholderweg',
    loc: 'Hamburg',
    year: '2022',
    img: '/images/referenzen/ref-06-dachsanierung-wacholderweg.jpg',
    alt: 'Dachsanierung am Wohngebaeude',
  },
  {
    cat: 'Sanierung',
    title: 'Balkonsanierung Grasredder',
    loc: 'Hamburg',
    year: '2022',
    img: '/images/referenzen/ref-07-balkonsanierung-grasredder.jpg',
    alt: 'Balkonsanierung mit Bangkirai-Holz',
  },
  {
    cat: 'Anbau',
    title: 'Anbau Krupunder Weg',
    loc: 'Hamburg',
    year: '2021',
    img: '/images/referenzen/ref-08-anbau-krupunder.jpg',
    alt: 'Anbau in Holzbauweise',
  },
  {
    cat: 'Sonderbau',
    title: 'Hausboot Umbau',
    loc: 'Hamburg',
    year: '2021',
    img: '/images/referenzen/ref-09-hausboot-umbau.jpg',
    alt: 'Hausboot mit umgebauter Terrasse',
  },
];

export default async function ReferenzenPage() {
  const [settings, dbRefs, hero] = await Promise.all([
    getSettingsOrDefault(),
    getReferences(),
    getPageHero('referenzen', {
      eyebrow: 'Referenzen',
      headline: 'Holzbau, der\nsich sehen lässt.',
      subline:
        'Eine Auswahl unserer Projekte aus Hamburg und Umgebung — gefiltert nach Gewerk.',
    }),
  ]);
  const projects: RefProject[] =
    dbRefs.length > 0
      ? dbRefs.map((r) => {
          const ref = r as {
            title?: string;
            category?: string;
            location?: string;
            year?: string;
            image?: MediaShape;
          };
          return {
            title: ref.title ?? '',
            cat: ref.category ?? '',
            loc: ref.location ?? '',
            year: ref.year ?? '',
            img: mediaUrl(ref.image, 'card'),
            alt: ref.image?.alt ?? ref.title ?? '',
          };
        })
      : PROJECTS;
  const breadcrumb = breadcrumbSchema([
    { name: 'Start', url: `${SITE_URL}/` },
    { name: 'Referenzen', url: `${SITE_URL}/referenzen` },
  ]);

  return (
    <div>
      <JsonLd data={breadcrumb} />
      <Header active="referenzen" settings={settings} />

      {/* INTRO + FILTER */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding:
            'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px) clamp(28px, 4vw, 44px)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 11,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: '#D2992C',
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: 28,
              height: 1,
              background: '#D2992C',
              display: 'inline-block',
            }}
          />
          {hero.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: '0 0 18px',
            maxWidth: 880,
            whiteSpace: 'pre-line',
          }}
        >
          {hero.headline}
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: '#6B6C6F',
            maxWidth: 640,
            margin: '0 0 40px',
          }}
        >
          {hero.subline}
        </p>
      </section>

      {/* GALLERY */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 36px) clamp(56px, 8vw, 96px)',
        }}
      >
        <ReferenzenGallery projects={projects} />
      </section>

      {/* KONTAKT BAND */}
      <section style={{ background: '#FAF8F4', borderTop: '1px solid #ECEBE6' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: 'clamp(48px, 7vw, 80px) clamp(20px, 4vw, 36px)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              margin: '0 0 18px',
            }}
          >
            Ihr Projekt als nächste Referenz?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: '#6B6C6F',
              maxWidth: 540,
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Wir besprechen Ihr Vorhaben unverbindlich und erstellen ein Angebot.
          </p>
          <a
            href="/kontakt"
            style={{
              textDecoration: 'none',
              background: '#D2992C',
              color: '#fff',
              padding: '15px 28px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 15,
              display: 'inline-block',
            }}
          >
            Beratung anfragen
          </a>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
