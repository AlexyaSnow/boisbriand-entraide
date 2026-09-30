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
const touteLaJournee = [{ debutMin: hm(0), finMin: hm(24) }];
const tim6eSemaine = [{ debutMin: hm(5), finMin: hm(19, 30) }];
const tim6eSam = [{ debutMin: hm(6), finMin: hm(18, 30) }];
const tim6eDim = [{ debutMin: hm(7), finMin: hm(18) }];
const timSancheSemaine = [{ debutMin: hm(5, 30), finMin: hm(20) }];
const timSancheDim = [{ debutMin: hm(7), finMin: hm(20) }];

const hotelStSemaine = [
  { debutMin: hm(8), finMin: hm(12) },
  { debutMin: hm(13), finMin: hm(16, 30) },
];
const hotelStVendredi = [{ debutMin: hm(8), finMin: hm(12) }];


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
    horaires: [touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee],
  },
  {
    id: "tim-sanche",
    nom: "Tim Hortons Montée Sanche",
    adresseAffichee: "355, Montée Sanche",
    horaireConfirme: false,
    horaires: [timSancheDim, timSancheSemaine, timSancheSemaine, timSancheSemaine, timSancheSemaine, timSancheSemaine, timSancheSemaine],
  },
  {
    id: "tim-6e",
    nom: "Tim Hortons 6e Avenue",
    adresseAffichee: "160, 6e Avenue",
    horaireConfirme: true,
    horaires: [tim6eDim, tim6eSemaine, tim6eSemaine, tim6eSemaine, tim6eSemaine, tim6eSemaine, tim6eSam],
  },
  {
    id: "tim-cote-nord",
    nom: "Tim Hortons Côte-Nord",
    adresseAffichee: "Chemin de la Côte-Nord",
    horaireConfirme: false,
    horaires: [touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee, touteLaJournee],
  },
  {
    id: "biblio-ste-therese",
    nom: "Bibliothèque Sainte-Thérèse",
    adresseAffichee: "150, boul. du Séminaire, Sainte-Thérèse",
    horaireConfirme: true,
    horaires: [weekEndBiblio, semaineBiblio, semaineBiblio, semaineBiblio, semaineBiblio, semaineBiblio, weekEndBiblio],
  },
  {
    id: "hotel-ville-ste-therese",
    nom: "Hôtel de ville Sainte-Thérèse",
    adresseAffichee: "6, rue de l’Église, Sainte-Thérèse",
    horaireConfirme: true,
    horaires: [ferme, hotelStSemaine, hotelStSemaine, hotelStSemaine, hotelStSemaine, hotelStVendredi, ferme],
  },
  {
    id: "iga-blainville-est",
    nom: "IGA Sainte-Thérèse",
    adresseAffichee: "450, rue Blainville Est, Sainte-Thérèse",
    horaireConfirme: true,
    horaires: [weekEndIga, semaineIga, semaineIga, semaineIga, semaineIga, semaineIga, weekEndIga],
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
