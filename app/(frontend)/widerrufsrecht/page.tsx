import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  LegalLayout,
  legalH2Style,
  legalPStyle,
  legalUlStyle,
} from '@/components/LegalLayout';
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

        <h2 style={legalH2Style}>Muster-Widerrufsformular</h2>
        <p style={legalPStyle}>
          Wenn Sie den Vertrag widerrufen wollen, können Sie das folgende
          Formular verwenden. Ausfüllen und an uns zurücksenden reicht.
        </p>
        <div
          style={{
            background: '#FAF8F4',
            border: '1px solid #ECEBE6',
            borderRadius: 10,
            padding: '20px 24px',
            fontSize: 15,
            lineHeight: 1.7,
            margin: '20px 0',
          }}
        >
          <p style={{ margin: '0 0 12px' }}>
            <strong>An:</strong>
            <br />
            FriStD-Bau ZuB GmbH &amp; Co. KG
            <br />
            Haldesdorfer Str. 44, 22179 Hamburg
            <br />
            E-Mail: post@fristd-bau.com
          </p>
          <p style={{ margin: '0 0 12px' }}>
            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
            Vertrag über die Erbringung der folgenden Dienstleistung:
          </p>
          <p style={{ margin: '0 0 8px' }}>
            _____________________________________________________________
          </p>
          <p style={{ margin: '12px 0 8px' }}>
            Bestellt am (*) / erhalten am (*): _______________________
          </p>
          <p style={{ margin: '0 0 8px' }}>
            Name des/der Verbraucher(s): _______________________
          </p>
          <p style={{ margin: '0 0 8px' }}>
            Anschrift des/der Verbraucher(s): _______________________
          </p>
          <p style={{ margin: '12px 0 8px' }}>
            Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
            _______________________
          </p>
          <p style={{ margin: '0 0 8px' }}>Datum: _______________________</p>
          <p style={{ margin: '12px 0 0', fontSize: 13, color: '#8A8A8C' }}>
            (*) Unzutreffendes streichen.
          </p>
        </div>
      </LegalLayout>
      <Footer settings={settings} />
    </>
  );
}
