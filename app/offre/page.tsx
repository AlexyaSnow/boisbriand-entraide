import { FormulaireAnnonce } from "@/src/ui/FormulaireAnnonce";

export default function PageOffre() {
  return (
    <main>
      <h1>Publier une offre</h1>
      <p className="lede">
        Un seul item. Pas d’adresse. Le lieu se choisit quand quelqu’un accepte.
      </p>
      <FormulaireAnnonce type="offre" />
    </main>
  );
}
