"use client";

import { FormEvent, useState } from "react";
import { publierAnnonce } from "@/src/actions/annonce";
import { t, type Langue } from "@/src/i18n/textes";

type Props = { type: "offre" | "besoin"; langue: Langue };

export function FormulaireAnnonce({ type, langue }: Props) {
  const i = t(langue);
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
    return <p className="ok">{type === "offre" ? i.okOffre : i.okBesoin}</p>;
  }

  return (
    <form onSubmit={envoyer}>
      <label>
        {i.champTitre}
        <span className="hint">{i.hintTitre}</span>
        <input name="titre" required maxLength={80} />
      </label>
      <label>
        {i.categorie}
        <select name="categorie" required defaultValue="vetement">
          <option value="vetement">{i.vetement}</option>
          <option value="denree">{i.denree}</option>
          <option value="enfant">{i.enfant}</option>
          <option value="autre">{i.autre}</option>
        </select>
      </label>
      <label>
        {i.photo}
        <span className="hint">{i.hintPhoto}</span>
        <input
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
        />
      </label>
      <label>
        {i.detail}
        <textarea name="detail" maxLength={400} />
      </label>
      <p className="hint">{i.hintLieu}</p>
      {erreur ? <p className="etat ferme">{erreur}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={attente}>
        {attente ? i.attente : i.publier}
      </button>
    </form>
  );
}
