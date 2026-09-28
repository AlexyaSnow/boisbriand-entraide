"use client";

import { FormEvent, useState } from "react";
import { publierAnnonce } from "@/src/actions/annonce";

type Props = { type: "offre" | "besoin" };

export function FormulaireAnnonce({ type }: Props) {
  const [ok, setOk] = useState(false);
  const [erreur, setErreur] = useState("");
  const [attente, setAttente] = useState(false);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttente(true);
    setErreur("");
    const data = new FormData(e.currentTarget);
    const resultat = await publierAnnonce(type, data);
    setAttente(false);
    if (resultat.ok) {
      setOk(true);
      return;
    }
    setErreur(resultat.message);
  }

  if (ok) {
    return (
      <p className="ok">
        {type === "offre" ? "Offre" : "Besoin"} enregistré. Il apparaîtra à
        l’accueil.
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
      {erreur ? <p className="etat ferme">{erreur}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={attente}>
        {attente ? "Enregistrement…" : "Publier"}
      </button>
    </form>
  );
}
