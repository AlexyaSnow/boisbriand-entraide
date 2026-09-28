"use client";

import { FormEvent, useState } from "react";

type Props = { type: "offre" | "besoin" };

export function FormulaireAnnonce({ type }: Props) {
  const [ok, setOk] = useState(false);

  function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(true);
  }

  if (ok) {
    return (
      <p className="ok">
        {type === "offre" ? "Offre" : "Besoin"} prêt. La base de données n’est
        pas encore branchée : rien n’est stocké pour de bon.
      </p>
    );
  }

  return (
    <form onSubmit={envoyer}>
      <label>
        Titre
        <span className="hint">Une ligne. Un item.</span>
        <input
          name="titre"
          required
          maxLength={80}
          placeholder="Manteau d’hiver, enfant 6 ans"
        />
      </label>
      <label>
        Catégorie
        <select name="categorie" required defaultValue="vetement">
          <option value="vetement">Vêtement</option>
          <option value="denree">Denrée non périssable</option>
          <option value="enfant">Article pour enfant</option>
          <option value="autre">Autre ressource</option>
        </select>
      </label>
      <label>
        Détail (optionnel)
        <textarea name="detail" maxLength={400} />
      </label>
      <p className="hint">
        Le lieu de rencontre se choisit plus tard, dans la liste fermée. Pas
        d’adresse personnelle.
      </p>
      <button className="btn btn-primary" type="submit">
        Publier
      </button>
    </form>
  );
}
