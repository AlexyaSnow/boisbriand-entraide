"use client";

import { FormEvent, useState } from "react";
import { publierAnnonce } from "@/src/actions/annonce";
import { t, type Langue } from "@/src/i18n/textes";

type Props = { type: "offre" | "besoin"; langue: Langue };

const MAX_PHOTOS = 5;

async function alleger(fichier: File): Promise<File> {
  if (!fichier.type.startsWith("image/") || fichier.type.includes("heic")) {
    return fichier;
  }
  const bitmap = await createImageBitmap(fichier);
  const max = 1400;
  const ratio = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * ratio);
  canvas.height = Math.round(bitmap.height * ratio);
  const ctx = canvas.getContext("2d");
  if (!ctx) return fichier;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.72),
  );
  if (!blob) return fichier;
  return new File([blob], "photo.jpg", { type: "image/jpeg" });
}

export function FormulaireAnnonce({ type, langue }: Props) {
  const i = t(langue);
  const [ok, setOk] = useState(false);
  const [erreur, setErreur] = useState("");
  const [attente, setAttente] = useState(false);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttente(true);
    setErreur("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const fichiers = data
      .getAll("photos")
      .filter((x): x is File => x instanceof File && x.size > 0);
    if (fichiers.length > MAX_PHOTOS) {
      setAttente(false);
      setErreur("Maximum 5 photos.");
      return;
    }
    data.delete("photos");
    try {
      for (const fichier of fichiers) {
        data.append("photos", await alleger(fichier));
      }
      const resultat = await publierAnnonce(type, data);
      if (resultat.ok) {
        setOk(true);
        return;
      }
      setErreur(resultat.message);
    } catch {
      setErreur("L’envoi a échoué. Réessaie avec moins de photos.");
    } finally {
      setAttente(false);
    }
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
        <select name="categorie" required defaultValue="autre">
          <option value="vetement">{i.vetement}</option>
          <option value="denree">{i.denree}</option>
          <option value="enfant">{i.enfant}</option>
          <option value="panier">{i.panier}</option>
          <option value="autre">{i.autre}</option>
        </select>
      </label>
      <label>
        {i.photo}
        <span className="hint">Jusqu’à 5 photos. Sur le téléphone, tiens le doigt pour en choisir plusieurs.</span>
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
