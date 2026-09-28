"use client";

import { etatOuverture } from "@/src/domain/horaire";
import type { PointAutorise } from "@/src/domain/points";
import { t, type Langue } from "@/src/i18n/textes";

export function ListePoints({
  points,
  langue,
}: {
  points: PointAutorise[];
  langue: Langue;
}) {
  const i = t(langue);
  return (
    <ul className="liste">
      {points.map((point) => {
        const etat = etatOuverture(point.horaires);
        let libelle = etat.ouvert ? i.ouvert : i.ferme;
        if (etat.ouvert && etat.heure) libelle += ` · ${i.jusqua} ${etat.heure}`;
        if (!etat.ouvert && etat.heure) libelle += ` · ${i.ouvreA} ${etat.heure}`;
        if (!point.horaireConfirme) libelle += ` · ${i.aVerifier}`;
        return (
          <li key={point.id}>
            <span className="nom">{point.nom}</span>
            <span className="meta">{point.adresseAffichee}</span>
            <span className={etat.ouvert ? "etat ouvert" : "etat ferme"}>
              {libelle}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
