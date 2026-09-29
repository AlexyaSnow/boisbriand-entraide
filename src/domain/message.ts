import { chatAutorise, type Echange } from "./echange";

export function validerMessage(texte: string): { ok: true; texte: string } | { ok: false; message: string } {
  const propre = texte.trim();
  if (propre.length < 1 || propre.length > 500) {
    return { ok: false, message: "Le message doit faire entre 1 et 500 caractères." };
  }
  return { ok: true, texte: propre };
}

export function peutEcrire(echange: Echange, auteurId: string): boolean {
  const membre = auteurId === echange.offrantId || auteurId === echange.demandeurId;
  return membre && chatAutorise(echange);
}
