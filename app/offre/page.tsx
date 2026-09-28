import { FormulaireAnnonce } from "@/src/ui/FormulaireAnnonce";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export default async function PageOffre() {
  const langue = await langueActuelle();
  const i = t(langue);
  return (
    <main>
      <h1>{i.titreOffre}</h1>
      <p className="lede">{i.ledeOffre}</p>
      <FormulaireAnnonce type="offre" langue={langue} />
    </main>
  );
}
