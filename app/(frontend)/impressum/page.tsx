import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  LegalLayout,
  legalH2Style,
  legalPStyle,
} from '@/components/LegalLayout';
import { getSettingsOrDefault } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Impressum',
  description:
    'Impressum von FriStD-Bau ZuB GmbH & Co. KG — Anbieterkennzeichnung nach § 5 TMG.',
  robots: { index: true, follow: true },
};

export default async function ImpressumPage() {
  const settings = await getSettingsOrDefault();
  return (
    <>
      <Header active="kontakt" settings={settings} />
      <LegalLayout eyebrow="Rechtliches" title="Impressum">
        <h2 style={legalH2Style}>Anbieter</h2>
        <p style={legalPStyle}>
          <strong>FriStD-Bau ZuB GmbH &amp; Co. KG</strong>
          <br />
          Haldesdorfer Str. 44
          <br />
          22179 Hamburg
        </p>

        <h2 style={legalH2Style}>Kontakt</h2>
        <p style={legalPStyle}>
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

        <h2 style={legalH2Style}>Vertretungsberechtigter Geschäftsführer</h2>
        <p style={legalPStyle}>Ronny Friedrich</p>

        <h2 style={legalH2Style}>Handelsregister</h2>
        <p style={legalPStyle}>
          Registergericht: Amtsgericht Hamburg
          <br />
          Registernummer: HRA 112897
        </p>
        <p style={legalPStyle}>
          Vollhaftende Gesellschafterin: FriStD-Bau Verwaltungs GmbH,
          <br />
          Amtsgericht Hamburg, HRB 117552
        </p>

        <h2 style={legalH2Style}>Umsatzsteuer-Identifikationsnummer</h2>
        <p style={legalPStyle}>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          <strong>DE276234295</strong>
        </p>
        <p style={legalPStyle}>
          Steuernummer: 50/620/01587
        </p>

        <h2 style={legalH2Style}>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p style={legalPStyle}>
          Berufsbezeichnung: <strong>Zimmerermeister</strong>
          <br />
          Verliehen in: Deutschland
        </p>
        <p style={legalPStyle}>
          Zuständige Kammer:
          <br />
          Handwerkskammer Hamburg
          <br />
          Holstenwall 12, 20355 Hamburg
          <br />
          Handwerkskammer-Betriebsnummer: 957768
        </p>
        <p style={legalPStyle}>
          Es gelten die berufsrechtlichen Regelungen der Handwerksordnung (HwO)
          und die Berufsordnungen der Handwerkskammer Hamburg. Diese können unter{' '}
          <a
            href="https://www.hwk-hamburg.de"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D2992C' }}
          >
            www.hwk-hamburg.de
          </a>{' '}
          eingesehen werden.
        </p>

        <h2 style={legalH2Style}>Berufshaftpflichtversicherung</h2>
        <p style={legalPStyle}>
          Versicherer: AXA Versicherungs AG
          <br />
          Colonia-Allee 10–20
          <br />
          51067 Köln
        </p>
        <p style={legalPStyle}>Geltungsraum der Versicherung: Deutschland</p>

        <h2 style={legalH2Style}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p style={legalPStyle}>
          Ronny Friedrich
          <br />
          Haldesdorfer Str. 44
          <br />
          22179 Hamburg
        </p>

        <h2 style={legalH2Style}>Streitschlichtung</h2>
        <p style={legalPStyle}>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D2992C' }}
          >
            https://ec.europa.eu/consumers/odr
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p style={legalPStyle}>
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungs­verfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>

        <h2 style={legalH2Style}>Haftungsausschluss</h2>
        <p style={legalPStyle}>
          <strong>Haftung für Inhalte:</strong> Die Inhalte unserer Seiten
          wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine
          Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG
          für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen.
        </p>
        <p style={legalPStyle}>
          <strong>Haftung für Links:</strong> Unser Angebot enthält Links zu
          externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
          haben. Deshalb können wir für diese fremden Inhalte auch keine
          Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets
          der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>
        <p style={legalPStyle}>
          <strong>Urheberrecht:</strong> Die durch die Seitenbetreiber
          erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
          deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
          Autors bzw. Erstellers.
        </p>
      </LegalLayout>
      <Footer settings={settings} />
    </>
  );
}
