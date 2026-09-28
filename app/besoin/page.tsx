import { FormulaireAnnonce } from "@/src/ui/FormulaireAnnonce";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export default async function PageBesoin() {
  const langue = await langueActuelle();
  const i = t(langue);
  return (
    <main>
      <h1>{i.titreBesoin}</h1>
      <p className="lede">{i.ledeBesoin}</p>
      <FormulaireAnnonce type="besoin" langue={langue} />
    </main>
  );
}
