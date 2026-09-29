"use client";

import { useState } from "react";
import { POINTS_AUTORISES } from "@/src/domain/points";
import { ajouterFavori, retirerFavori } from "@/src/actions/favoris";

export function FormulaireFavoris({ epingles }: { epingles: string[] }) {
  const [erreur, setErreur] = useState("");

  async function ajouter(formData: FormData) {
    setErreur("");
    const r = await ajouterFavori(formData);
    if (!r.ok) setErreur(r.message);
  }

  async function retirer(id: string) {
    setErreur("");
    const r = await retirerFavori(id);
    if (!r.ok) setErreur(r.message);
  }

  return (
    <>
      <ul className="liste">
        {epingles.length === 0 ? (
          <li className="point">
            <span className="meta">Aucun lieu épinglé. Utile si tu te déplaces à pied.</span>
          </li>
        ) : (
          epingles.map((id) => {
            const p = POINTS_AUTORISES.find((x) => x.id === id);
            if (!p) return null;
            return (
              <li className="point" key={id}>
                <span className="nom">{p.nom}</span>
                <span className="meta">{p.adresseAffichee}</span>
                <form action={() => retirer(id)}>
                  <button className="btn btn-ghost" type="submit">
                    Retirer
                  </button>
                </form>
              </li>
            );
          })
        )}
      </ul>
      <form action={ajouter}>
        <label>
          Ajouter un lieu
          <select name="pointId" required defaultValue="">
            <option value="" disabled>
              Choisir
            </option>
            {POINTS_AUTORISES.filter((p) => !epingles.includes(p.id)).map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom}
              </option>
            ))}
          </select>
        </label>
        <button className="btn btn-primary" type="submit">
          Épingler
        </button>
        {erreur ? <p className="etat ferme">{erreur}</p> : null}
      </form>
    </>
  );
}
