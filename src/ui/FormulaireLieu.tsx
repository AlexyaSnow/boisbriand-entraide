"use client";

import { useState } from "react";
import { POINTS_AUTORISES } from "@/src/domain/points";
import { choisirLieuJeton } from "@/src/actions/lieu";

export function FormulaireLieu({
  jeton,
  actuel,
}: {
  jeton: string;
  actuel: string | null;
}) {
  const [erreur, setErreur] = useState("");

  async function envoyer(formData: FormData) {
    setErreur("");
    const r = await choisirLieuJeton(jeton, formData);
    if (!r.ok) setErreur(r.message);
  }

  return (
    <form action={envoyer}>
      <label>
        Lieu de remise (liste fermée)
        <select name="pointId" defaultValue={actuel ?? ""} required>
          <option value="" disabled>
            Choisir
          </option>
          {POINTS_AUTORISES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} — {p.adresseAffichee}
            </option>
          ))}
        </select>
      </label>
      <button className="btn btn-ghost" type="submit">
        Enregistrer le lieu
      </button>
      {erreur ? <p className="etat ferme">{erreur}</p> : null}
    </form>
  );
}
