import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export default async function APropos() {
  const i = t(await langueActuelle());
  return (
    <main className="page-simple">
      <h1>{i.aproposTitre}</h1>
      <p>{i.apropos1}</p>
      <p>{i.apropos2}</p>
      <p>{i.apropos3}</p>
      <p>
        {i.apropos4}{" "}
        <a href="https://github.com/AlexyaSnow/boisbriand-entraide">
          github.com/AlexyaSnow/boisbriand-entraide
        </a>
      </p>
    </main>
  );
}
