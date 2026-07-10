import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSettingsOrDefault } from '@/src/lib/data';
import { PrintButton } from '@/components/PrintButton';
import { VorzeitigerBeginnForm } from '@/components/VorzeitigerBeginnForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vorzeitiger Beginn der Arbeiten — digital signieren',
  description:
    'Erklärung zum vorzeitigen Beginn der Arbeiten vor Ablauf der Widerrufsfrist inklusive Vereinbarung zum Wertersatz. Digital am Endgerät unterschreiben oder alternativ ausdrucken.',
  robots: { index: true, follow: true },
};

export default async function VorzeitigerBeginnPage() {
  const settings = await getSettingsOrDefault();
  return (
    <>
      <div className="hide-print">
        <Header active="kontakt" settings={settings} />
      </div>

      {/* Print-optimierte Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page { size: A4; margin: 18mm 20mm; }
              body { background: #fff; }
              .hide-print { display: none !important; }
              .print-only { display: block !important; }
              .print-container { padding: 0 !important; max-width: none !important; }
              a { color: #000 !important; text-decoration: none !important; }
            }
            .print-only { display: none; }
          `,
        }}
      />

      <section
        className="print-container"
        style={{
          maxWidth: 780,
          margin: '0 auto',
          padding:
            'clamp(32px, 6vw, 60px) clamp(20px, 4vw, 36px) clamp(40px, 6vw, 80px)',
          fontSize: 15,
          lineHeight: 1.55,
        }}
      >
        <div className="hide-print">
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: '#D2992C',
              marginBottom: 10,
            }}
          >
            Rechtliches → Widerrufsrecht
          </div>
          <h1
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(28px, 5vw, 40px)',
              margin: '0 0 14px',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
            }}
          >
            Vorzeitiger Beginn der Arbeiten
          </h1>
          <p
            style={{
              margin: '0 0 24px',
              color: '#6B6C6F',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
            }}
          >
            Damit wir mit den Arbeiten vor Ablauf der 14-tägigen Widerrufsfrist
            beginnen können, benötigen wir Ihre schriftliche Erklärung. Sie
            können hier <strong>direkt am Endgerät digital unterschreiben</strong>{' '}
            (Textform gemäß § 126b BGB) oder alternativ das Formular
            ausdrucken und handschriftlich unterschreiben.
          </p>

          {/* DIGITALES FORMULAR */}
          <div style={{ marginBottom: 42 }}>
            <VorzeitigerBeginnForm />
          </div>

          {/* Alternative: Ausdrucken */}
          <div
            style={{
              background: '#FAF8F4',
              border: '1px solid #ECEBE6',
              borderRadius: 12,
              padding: 'clamp(18px, 3vw, 26px)',
              marginBottom: 30,
            }}
          >
            <h2
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                margin: '0 0 8px',
              }}
            >
              Alternative: Formular ausdrucken
            </h2>
            <p style={{ margin: '0 0 14px', color: '#6B6C6F' }}>
              Falls Sie handschriftlich unterschreiben und uns das Original per
              Post, Fax oder als Scan per E-Mail zukommen lassen möchten:
            </p>
            <PrintButton />
            <p style={{ margin: '14px 0 0', fontSize: 13, color: '#8A8A8C' }}>
              Beim Ausdrucken werden Header und Footer automatisch
              ausgeblendet.
            </p>
          </div>
        </div>

        {/* PRINT-VERSION: sichtbar nur beim Drucken */}
        <div className="print-only">
          <div style={{ fontSize: 13, color: '#666', marginBottom: 30 }}>
            FriStD-Bau ZuB GmbH &amp; Co. KG, Zimmerei &amp; Baufirma
            <br />
            Haldesdorfer Str. 44, 22179 Hamburg
          </div>

          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
              Auftraggeber:
            </div>
            <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 44 }}></div>
            <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 44 }}></div>
            <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 44 }}></div>
          </div>

          <div style={{ textAlign: 'right', margin: '20px 0 30px', fontSize: 14 }}>
            Hamburg, den{' '}
            <span
              style={{
                display: 'inline-block',
                minWidth: 160,
                borderBottom: '1px solid #2E2F31',
              }}
            ></span>
          </div>

          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              margin: '0 0 14px',
            }}
          >
            Erklärung zum vorzeitigen Beginn der Arbeiten
          </h2>
          <p style={{ margin: '0 0 12px' }}>
            Ich verlange ausdrücklich, dass die Firma
          </p>
          <p style={{ margin: '0 0 14px', fontWeight: 600 }}>
            FriStD-Bau ZuB GmbH &amp; Co. KG, Haldesdorfer Str. 44, 22179 Hamburg
          </p>
          <p style={{ margin: '0 0 14px' }}>
            <strong>vor Ablauf der 14-tägigen Widerrufsfrist</strong> mit der
            Ausführung der beauftragten Arbeiten beginnt.
          </p>
          <p style={{ margin: '18px 0 8px' }}>Mir ist bekannt,</p>
          <ul style={{ margin: '0 0 20px', paddingLeft: 22 }}>
            <li style={{ marginBottom: 6 }}>
              dass ich bei vollständiger Vertragserfüllung mein Widerrufsrecht
              verliere,
            </li>
            <li>
              dass ich im Falle eines Widerrufs Wertersatz für die bis dahin
              erbrachten Leistungen zu leisten habe.
            </li>
          </ul>
          <div style={{ marginTop: 40, marginBottom: 30 }}>
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 40 }}></div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Ort, Datum</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 40 }}></div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Unterschrift Auftraggeber</div>
              </div>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '40px 0 30px' }} />
          <h2
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              margin: '0 0 14px',
            }}
          >
            Vereinbarung zum Wertersatz
          </h2>
          <p style={{ margin: '0 0 12px' }}>
            Für den Fall eines Widerrufs nach Beginn der Arbeiten verpflichte ich
            mich, den Wert der bis dahin erbrachten Leistungen zu bezahlen.
          </p>
          <p style={{ margin: '0 0 12px' }}>Die Berechnung erfolgt auf Grundlage:</p>
          <div style={{ margin: '0 0 24px' }}>
            {[
              'des vereinbarten Festpreises (anteilig)',
              'des tatsächlichen Stundenaufwandes gemäß Angebot',
              'der verbauten Materialien gemäß Angebot',
            ].map((text) => (
              <div
                key={text}
                style={{
                  marginBottom: 8,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    border: '1.5px solid #2E2F31',
                    flex: 'none',
                    marginTop: 2,
                  }}
                ></span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 40 }}></div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Ort, Datum</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ borderBottom: '1px solid #2E2F31', minHeight: 40 }}></div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Unterschrift Auftraggeber</div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 60,
              paddingTop: 12,
              borderTop: '1px solid #ccc',
              fontSize: 11,
              color: '#666',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 12,
            }}
          >
            <div>
              FriStD-Bau ZuB GmbH &amp; Co. KG<br />
              Haldesdorfer Str. 44<br />
              22179 Hamburg
            </div>
            <div>
              Tel: 040 / 38 67 45 65<br />
              Fax: 040 / 38 67 45 66<br />
              post@fristd-bau.com
            </div>
            <div>
              HRA 112897 · Hamburg<br />
              USt-ID: DE276234295<br />
              Geschäftsführer: Ronny Friedrich
            </div>
          </div>
        </div>
      </section>

      <div className="hide-print">
        <Footer settings={settings} />
      </div>
    </>
  );
}
