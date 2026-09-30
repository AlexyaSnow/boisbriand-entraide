import Link from "next/link";
import { t, type Langue } from "@/src/i18n/textes";

export function Pied({ langue }: { langue: Langue }) {
  const i = t(langue);
  return (
    <footer className="pied">
      <p>
        <strong>{i.marque}</strong> — {i.piedLigne}
      </p>
      <p className="pied-liens">
        <Link href="/comment-ca-marche">{i.lienMarche}</Link>
        <Link href="/confidentialite">{i.lienConfidentialite}</Link>
        <Link href="/a-propos">{i.lienApropos}</Link>
        <a
          href="https://github.com/AlexyaSnow/boisbriand-entraide"
          rel="noreferrer"
        >
          {i.lienGithub}
        </a>
      </p>
      <p>
        <a href={`mailto:${i.courrielOrga}`}>{i.courrielOrga}</a>
      </p>
    </footer>
  );
}
