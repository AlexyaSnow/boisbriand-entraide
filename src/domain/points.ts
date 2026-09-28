export type PointAutorise = {
  id: string;
  nom: string;
  adresseAffichee: string;
};

export const POINTS_AUTORISES: PointAutorise[] = [
  {
    id: "biblio-grande-allee",
    nom: "Bibliothèque municipale",
    adresseAffichee: "901, boul. de la Grande-Allée",
  },
  {
    id: "maison-citoyen",
    nom: "Maison du citoyen",
    adresseAffichee: "955, boul. de la Grande-Allée",
  },
  {
    id: "hotel-ville",
    nom: "Hôtel de ville",
    adresseAffichee: "940, boul. de la Grande-Allée",
  },
  {
    id: "iga-faubourg",
    nom: "IGA extra Le Faubourg",
    adresseAffichee: "2605, rue d’Annemasse",
  },
  {
    id: "tim-faubourg",
    nom: "Tim Hortons Faubourg",
    adresseAffichee: "2320, boul. du Faubourg",
  },
];

export function estPointAutorise(id: string): boolean {
  return POINTS_AUTORISES.some((point) => point.id === id);
}

export function choisirPoint(id: string): PointAutorise {
  const point = POINTS_AUTORISES.find((p) => p.id === id);
  if (!point) {
    throw new Error("Lieu hors liste fermée");
  }
  return point;
}
