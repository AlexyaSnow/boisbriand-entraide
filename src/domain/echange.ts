export type StatutEchange = "ouvert" | "remis" | "annule";

export type Echange = {
  jeton: string;
  annonceId: string;
  offrantId: string;
  demandeurId: string;
  statut: StatutEchange;
};

export function creerEchange(input: {
  annonceId: string;
  offrantId: string;
  demandeurId: string;
}): Echange {
  if (input.offrantId === input.demandeurId) {
    throw new Error("Un échange implique deux comptes distincts");
  }
  return {
    jeton: `jeton-${input.annonceId}`,
    annonceId: input.annonceId,
    offrantId: input.offrantId,
    demandeurId: input.demandeurId,
    statut: "ouvert",
  };
}

export function chatAutorise(echange: Echange): boolean {
  return echange.statut === "ouvert";
}

export function cloturer(echange: Echange, fin: "remis" | "annule"): Echange {
  return { ...echange, statut: fin };
}

/** Une famille aidée = un jeton marqué remis. Pas un compte, pas un chat ouvert. */
export function nombreFamillesAidees(statuts: StatutEchange[]): number {
  return statuts.filter((s) => s === "remis").length;
}
