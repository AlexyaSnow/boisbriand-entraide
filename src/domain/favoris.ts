import { estPointAutorise } from "./points";

export const MAX_FAVORIS = 3;

export function peutAjouterFavori(deja: string[], pointId: string): { ok: true } | { ok: false; message: string } {
  if (!estPointAutorise(pointId)) {
    return { ok: false, message: "Lieu hors liste fermée." };
  }
  if (deja.includes(pointId)) {
    return { ok: false, message: "Ce lieu est déjà épinglé." };
  }
  if (deja.length >= MAX_FAVORIS) {
    return { ok: false, message: "Maximum trois lieux." };
  }
  return { ok: true };
}
