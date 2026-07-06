import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  LegalLayout,
  legalH2Style,
  legalH3Style,
  legalPStyle,
  legalUlStyle,
} from '@/components/LegalLayout';
import { getSettingsOrDefault } from '@/src/lib/data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung von FriStD-Bau ZuB GmbH & Co. KG — Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten nach DSGVO.',
  robots: { index: true, follow: true },
};

export default async function DatenschutzPage() {
  const settings = await getSettingsOrDefault();
  return (
    <>
      <Header active="kontakt" settings={settings} />
      <LegalLayout eyebrow="Rechtliches" title="Datenschutzerklärung">
        <p style={legalPStyle}>
          Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese
          Datenschutz­erklärung informiert Sie darüber, wie wir Ihre
          personen­bezogenen Daten erheben, verwenden und schützen — im
          Einklang mit der Datenschutz-Grundverordnung (DSGVO) und dem
          Bundes­datenschutz­gesetz (BDSG).
        </p>

        <h2 style={legalH2Style}>1. Verantwortlicher</h2>
        <p style={legalPStyle}>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p style={legalPStyle}>
          FriStD-Bau ZuB GmbH &amp; Co. KG
          <br />
          Ronny Friedrich
          <br />
          Haldesdorfer Str. 44, 22179 Hamburg
          <br />
          Telefon: 040 / 38 67 45 65
          <br />
          E-Mail:{' '}
          <a href="mailto:post@fristd-bau.com" style={{ color: '#D2992C' }}>
            post@fristd-bau.com
          </a>
        </p>

        <h2 style={legalH2Style}>2. Server-Logfiles</h2>
        <p style={legalPStyle}>
          Beim Aufruf unserer Website werden durch den Hosting-Anbieter
          automatisch Informationen erfasst und in Server-Logfiles
          gespeichert. Dies sind:
        </p>
        <ul style={legalUlStyle}>
          <li>Anonymisierte IP-Adresse</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Aufgerufene Seite / Datei</li>
          <li>Übertragene Datenmenge</li>
          <li>Verwendeter Browser und Betriebssystem</li>
          <li>Referrer-URL (zuvor besuchte Seite)</li>
        </ul>
        <p style={legalPStyle}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an der stabilen und sicheren Bereitstellung der Website). Die Daten
          werden spätestens nach 30 Tagen gelöscht.
        </p>
        <p style={legalPStyle}>
          Hosting-Dienstleister: Hostinger International Ltd., Kaunas,
          Litauen — mit Serverstandort innerhalb der EU. Es besteht ein
          Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO.
        </p>

        <h2 style={legalH2Style}>3. Kontaktaufnahme</h2>

        <h3 style={legalH3Style}>3.1 Kontaktformular</h3>
        <p style={legalPStyle}>
          Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen,
          werden Ihre Angaben (Name, E-Mail, Telefon, Anfrage) zwecks
          Bearbeitung der Anfrage bei uns gespeichert.
        </p>
        <p style={legalPStyle}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) und
          Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung durch aktives
          Absenden). Diese Daten geben wir nicht ohne Ihre Einwilligung
          weiter.
        </p>
        <p style={legalPStyle}>
          Speicherdauer: Ihre Daten werden gelöscht, sobald die Anfrage
          bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten
          entgegen­stehen (in der Regel Handelsbriefe: 6 Jahre nach §&nbsp;257
          HGB, steuerlich relevante Unterlagen: 10 Jahre nach §&nbsp;147 AO).
        </p>

        <h3 style={legalH3Style}>3.2 Kontakt per E-Mail oder Telefon</h3>
        <p style={legalPStyle}>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage
          inkl. aller daraus hervor­gehenden personen­bezogenen Daten
          ausschließlich zum Zweck der Bearbeitung Ihres Anliegens gespeichert.
        </p>

        <h2 style={legalH2Style}>4. Bewerbungen (Karriere-Seite)</h2>
        <p style={legalPStyle}>
          Wenn Sie sich über eine der auf unserer Karriere-Seite verlinkten
          E-Mail-Adressen bewerben, verarbeiten wir Ihre Bewerbungsunterlagen
          ausschließlich zum Zweck der Personalauswahl. Rechtsgrundlage:
          §&nbsp;26 Abs. 1 BDSG. Nach Abschluss des Bewerbungsverfahrens
          werden die Unterlagen spätestens nach 6 Monaten gelöscht, sofern
          keine Einstellung erfolgt und keine anderweitige Einwilligung
          vorliegt.
        </p>

        <h2 style={legalH2Style}>5. Google Fonts</h2>
        <p style={legalPStyle}>
          Wir binden Schriften des Anbieters Google Fonts (Google Ireland
          Limited, Gordon House, Barrow Street, Dublin 4, Irland) direkt vom
          Google-Server. Beim Aufruf einer Seite lädt Ihr Browser die
          Schriften nach — dabei kann Google Ihre IP-Adresse verarbeiten.
        </p>
        <p style={legalPStyle}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (einheitliche
          Darstellung der Schriften). Weitere Informationen:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D2992C' }}
          >
            https://policies.google.com/privacy
          </a>
          .
        </p>

        <h2 style={legalH2Style}>6. OpenStreetMap-Karte auf der Kontaktseite</h2>
        <p style={legalPStyle}>
          Auf unserer Kontaktseite wird eine Karte über den Dienst
          OpenStreetMap (OSM) eingebettet. Anbieter: OpenStreetMap Foundation,
          St John's Innovation Centre, Cowley Road, Cambridge, CB4 0WS, UK.
          Beim Laden der Kartenansicht kann Ihre IP-Adresse an OSM übermittelt
          werden.
        </p>
        <p style={legalPStyle}>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Bereitstellung einer
          nutzerfreundlichen Standortangabe). Weitere Informationen:{' '}
          <a
            href="https://osmfoundation.org/wiki/Privacy_Policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D2992C' }}
          >
            https://osmfoundation.org/wiki/Privacy_Policy
          </a>
          .
        </p>

        <h2 style={legalH2Style}>7. SSL-/TLS-Verschlüsselung</h2>
        <p style={legalPStyle}>
          Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
          Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung.
          Eine verschlüsselte Verbindung erkennen Sie am „https://" in der
          Adresszeile Ihres Browsers und am Schloss-Symbol.
        </p>

        <h2 style={legalH2Style}>8. Cookies</h2>
        <p style={legalPStyle}>
          Diese Website setzt <strong>keine</strong> Marketing- oder
          Tracking-Cookies. Technisch notwendige Session-Cookies können vom
          Server im Rahmen der Bereitstellung der Website gesetzt werden;
          diese enthalten keine personen­bezogenen Daten.
        </p>

        <h2 style={legalH2Style}>9. Ihre Rechte als betroffene Person</h2>
        <p style={legalPStyle}>
          Sie haben nach DSGVO folgende Rechte gegenüber uns hinsichtlich
          Ihrer personen­bezogenen Daten:
        </p>
        <ul style={legalUlStyle}>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          <li>
            Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3
            DSGVO)
          </li>
        </ul>
        <p style={legalPStyle}>
          Zur Ausübung Ihrer Rechte wenden Sie sich formlos an die im
          Impressum genannten Kontaktdaten.
        </p>

        <h2 style={legalH2Style}>10. Beschwerderecht bei der Aufsichtsbehörde</h2>
        <p style={legalPStyle}>
          Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren,
          wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personen­bezogenen
          Daten gegen die DSGVO verstößt.
        </p>
        <p style={legalPStyle}>
          Zuständige Aufsichtsbehörde ist:
          <br />
          Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
          <br />
          Ludwig-Erhard-Straße 22, 20459 Hamburg
          <br />
          <a
            href="https://datenschutz-hamburg.de"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D2992C' }}
          >
            datenschutz-hamburg.de
          </a>
        </p>

        <h2 style={legalH2Style}>11. Aktualität dieser Erklärung</h2>
        <p style={legalPStyle}>
          Diese Datenschutzerklärung ist aktuell gültig. Durch die
          Weiter­entwicklung unserer Website oder aufgrund geänderter
          gesetzlicher bzw. behördlicher Vorgaben kann eine Änderung dieser
          Erklärung erforderlich werden.
        </p>
      </LegalLayout>
      <Footer settings={settings} />
    </>
  );
}
