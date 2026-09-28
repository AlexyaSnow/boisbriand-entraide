"use client";

import { etatOuverture } from "@/src/domain/horaire";
import type { PointAutorise } from "@/src/domain/points";

export function ListePoints({ points }: { points: PointAutorise[] }) {
  return (
    <ul className="liste">
      {points.map((point) => {
        const etat = etatOuverture(point.horaires);
        return (
          <li key={point.id}>
            <span className="nom">{point.nom}</span>
            <span className="meta">{point.adresseAffichee}</span>
            <span className={etat.ouvert ? "etat ouvert" : "etat ferme"}>
              {etat.libelle}
              {!point.horaireConfirme ? " · à vérifier" : ""}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
