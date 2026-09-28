import { hm, type Intervalle } from "./horaire";

export type PointAutorise = {
  id: string;
  nom: string;
  adresseAffichee: string;
  horaires: Intervalle[][];
  horaireConfirme: boolean;
};

const ferme: Intervalle[] = [];
const semaineBiblio = [{ debutMin: hm(10), finMin: hm(21) }];
const weekEndBiblio = [{ debutMin: hm(10), finMin: hm(17) }];
const semaineIga = [{ debutMin: hm(8), finMin: hm(21) }];
const weekEndIga = [{ debutMin: hm(8), finMin: hm(20) }];
const tousTim = [{ debutMin: hm(5), finMin: hm(23) }];

export const POINTS_AUTORISES: PointAutorise[] = [
  {
    id: "biblio-grande-allee",
    nom: "Bibliothèque municipale",
    adresseAffichee: "901, boul. de la Grande-Allée",
    horaireConfirme: true,
    horaires: [weekEndBiblio, semaineBiblio, semaineBiblio, semaineBiblio, semaineBiblio, semaineBiblio, weekEndBiblio],
  },
  {
    id: "maison-citoyen",
    nom: "Maison du citoyen",
    adresseAffichee: "955, boul. de la Grande-Allée",
    horaireConfirme: false,
    horaires: [
      ferme,
      [{ debutMin: hm(8, 15), finMin: hm(16, 15) }],
      [{ debutMin: hm(8, 15), finMin: hm(17) }],
      [{ debutMin: hm(8, 15), finMin: hm(19) }],
      [{ debutMin: hm(8, 15), finMin: hm(17) }],
      [{ debutMin: hm(8), finMin: hm(16) }],
      ferme,
    ],
  },
  {
    id: "hotel-ville",
    nom: "Hôtel de ville",
    adresseAffichee: "940, boul. de la Grande-Allée",
    horaireConfirme: true,
    horaires: [
      ferme,
      [{ debutMin: hm(8, 15), finMin: hm(16, 15) }],
      [{ debutMin: hm(8, 15), finMin: hm(17) }],
      [{ debutMin: hm(8, 15), finMin: hm(19) }],
      [{ debutMin: hm(8, 15), finMin: hm(17) }],
      [{ debutMin: hm(8), finMin: hm(16) }],
      ferme,
    ],
  },
  {
    id: "iga-faubourg",
    nom: "IGA extra Le Faubourg",
    adresseAffichee: "2605, rue d’Annemasse",
    horaireConfirme: true,
    horaires: [weekEndIga, semaineIga, semaineIga, semaineIga, semaineIga, semaineIga, weekEndIga],
  },
  {
    id: "tim-faubourg",
    nom: "Tim Hortons Faubourg",
    adresseAffichee: "2320, boul. du Faubourg",
    horaireConfirme: false,
    horaires: [tousTim, tousTim, tousTim, tousTim, tousTim, tousTim, tousTim],
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
