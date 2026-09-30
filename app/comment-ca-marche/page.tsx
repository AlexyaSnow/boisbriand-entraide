import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export default async function CommentCaMarche() {
  const i = t(await langueActuelle());
  return (
    <main className="page-simple">
      <h1>{i.marcheTitre}</h1>
      <ol className="etapes">
        <li>{i.marche1}</li>
        <li>{i.marche2}</li>
        <li>{i.marche3}</li>
        <li>{i.marche4}</li>
      </ol>
    </main>
  );
}
