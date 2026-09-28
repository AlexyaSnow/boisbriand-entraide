export const CATEGORIES = ["vetement", "denree", "enfant", "autre"] as const;
export type CategorieAnnonce = (typeof CATEGORIES)[number];

export function validerAnnonce(input: {
  titre: string;
  categorie: string;
}): { ok: true; titre: string; categorie: CategorieAnnonce } | { ok: false; message: string } {
  const titre = input.titre.trim();
  if (titre.length < 3 || titre.length > 80) {
    return { ok: false, message: "Le titre doit faire entre 3 et 80 caractères." };
  }
  if (!CATEGORIES.includes(input.categorie as CategorieAnnonce)) {
    return { ok: false, message: "Catégorie invalide." };
  }
  return { ok: true, titre, categorie: input.categorie as CategorieAnnonce };
}
