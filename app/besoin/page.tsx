import { FormulaireAnnonce } from "@/src/ui/FormulaireAnnonce";

export default function PageBesoin() {
  return (
    <main>
      <h1>Publier un besoin</h1>
      <p className="lede">
        Un seul item. Exemple : manteau d’hiver, 6 ans. Pas d’adresse ici.
      </p>
      <FormulaireAnnonce type="besoin" />
    </main>
  );
}
