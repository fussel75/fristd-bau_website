import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  LegalLayout,
  legalH2Style,
  legalPStyle,
  legalUlStyle,
} from '@/components/LegalLayout';
import { WiderrufForm } from '@/components/WiderrufForm';
import { getSettingsOrDefault } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Widerrufsrecht',
  description:
    'Widerrufsbelehrung für Verbraucher — FriStD-Bau ZuB GmbH & Co. KG. Widerrufsfrist, Folgen des Widerrufs, Wertersatz und Erlöschen des Widerrufsrechts.',
  robots: { index: true, follow: true },
};

export default async function WiderrufsrechtPage() {
  const settings = await getSettingsOrDefault();
  return (
    <>
      <Header active="kontakt" settings={settings} />
      <LegalLayout
        eyebrow="Rechtliches"
        title="Widerrufsbelehrung für Verbraucher"
      >
        <p
          style={{
            ...legalPStyle,
            background: '#FAF8F4',
            border: '1px solid #ECEBE6',
            borderRadius: 10,
            padding: '14px 18px',
            fontSize: 14,
            color: '#6B6C6F',
          }}
        >
          Verbraucher im Sinne des § 13 BGB haben bei außerhalb von
          Geschäfts­räumen geschlossenen Verträgen sowie bei
          Fernabsatzverträgen ein gesetzliches Widerrufsrecht.
        </p>

        <h2 style={legalH2Style}>Widerrufsrecht</h2>
        <p style={legalPStyle}>
          Sie haben das Recht, binnen <strong>vierzehn Tagen</strong> ohne
          Angabe von Gründen diesen Vertrag zu widerrufen.
        </p>
        <p style={legalPStyle}>
          Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
          Vertragsabschlusses.
        </p>
        <p style={legalPStyle}>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
        </p>
        <p style={legalPStyle}>
          <strong>FriStD-Bau ZuB GmbH &amp; Co. KG</strong>
          <br />
          Haldesdorfer Str. 44
          <br />
          22179 Hamburg
          <br />
          Telefon: 040 / 38 67 45 65
          <br />
          Telefax: 040 / 38 67 45 66
          <br />
          Mobil: 0163 / 78 456 40
          <br />
          E-Mail:{' '}
          <a href="mailto:post@fristd-bau.com" style={{ color: '#D2992C' }}>
            post@fristd-bau.com
          </a>
        </p>
        <p style={legalPStyle}>
          mittels einer eindeutigen Erklärung (z. B. per Brief, Fax oder
          E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen,
          informieren.
        </p>
        <p style={legalPStyle}>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
          Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
          Widerrufsfrist absenden.
        </p>

        <h2 style={legalH2Style}>Folgen des Widerrufs</h2>
        <p style={legalPStyle}>
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
          die wir von Ihnen erhalten haben, unverzüglich und spätestens
          binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die
          Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen
          ist.
        </p>
        <p style={legalPStyle}>
          Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
          Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei
          denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart. In
          keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
          berechnet.
        </p>

        <h2 style={legalH2Style}>Wertersatz bei vorzeitigem Beginn der Arbeiten</h2>
        <p style={legalPStyle}>
          Haben Sie verlangt, dass die Arbeiten während der Widerrufsfrist
          beginnen sollen, so haben Sie uns einen angemessenen Betrag zu
          zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von
          der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags
          unter­richten, bereits erbrachten Leistungen im Vergleich zum
          Gesamtumfang der im Vertrag vorgesehenen Leistungen entspricht.
        </p>

        <h2 style={legalH2Style}>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
        <p style={legalPStyle}>
          Ihr Widerrufsrecht bei einem Vertrag zur Erbringung von
          Dienst­leistungen erlischt vorzeitig, wenn wir die Leistung
          vollständig erbracht haben und mit der Ausführung der Leistung
          erst begonnen haben, nachdem Sie
        </p>
        <ul style={legalUlStyle}>
          <li>
            dazu Ihre ausdrückliche Zustimmung gegeben haben, und
          </li>
          <li>
            gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr
            Widerrufsrecht bei vollständiger Vertragserfüllung durch uns
            verlieren.
          </li>
        </ul>

        <h2 style={legalH2Style} id="widerrufsformular">
          Widerruf online erklären
        </h2>
        <p style={legalPStyle}>
          Sie können Ihren Widerruf hier direkt online erklären. Nach dem
          Absenden erhalten Sie eine E-Mail-Bestätigung an die angegebene
          Adresse; wir bearbeiten Ihre Erklärung umgehend.
        </p>
        <p style={{ ...legalPStyle, fontSize: 14, color: '#6B6C6F' }}>
          Alternativ können Sie den Widerruf auch formlos per E-Mail an{' '}
          <a href="mailto:post@fristd-bau.com" style={{ color: '#D2992C' }}>
            post@fristd-bau.com
          </a>{' '}
          oder per Brief bzw. Fax (siehe Kontakt oben) erklären.
        </p>

        <div style={{ margin: '20px 0 32px' }}>
          <WiderrufForm />
        </div>

        <h2 style={legalH2Style}>
          Sonderfall: Vorzeitiger Beginn der Arbeiten
        </h2>
        <div
          style={{
            background: '#FFF7E6',
            border: '1px solid #F0D68C',
            borderLeft: '4px solid #D2992C',
            borderRadius: 10,
            padding: '18px 22px',
            margin: '14px 0 18px',
          }}
        >
          <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#7A5810' }}>
            ⚠ Wichtiger Hinweis
          </p>
          <p style={{ ...legalPStyle, margin: '0 0 10px' }}>
            Wenn Sie ausdrücklich wünschen, dass wir mit den Arbeiten{' '}
            <strong>vor Ablauf der 14-tägigen Widerrufsfrist</strong> beginnen,
            benötigen wir dafür eine separate schriftliche Erklärung von Ihnen.
            Diese Erklärung enthält gleichzeitig eine Vereinbarung zum
            Wertersatz für den Fall, dass Sie dennoch widerrufen.
          </p>
          <p style={{ ...legalPStyle, margin: '0 0 14px' }}>
            Sie können die Erklärung direkt <strong>am Endgerät digital
            unterschreiben</strong> — oder alternativ ausdrucken und
            handschriftlich unterschreiben.
          </p>
          <Link
            href="/widerrufsrecht/vorzeitiger-beginn"
            style={{
              display: 'inline-block',
              background: '#D2992C',
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 22px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Formular „Vorzeitiger Beginn" öffnen →
          </Link>
        </div>
      </LegalLayout>
      <Footer settings={settings} />
    </>
  );
}
