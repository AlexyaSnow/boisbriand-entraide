import { etatOuverture } from "./horaire";
import { choisirPoint } from "./points";

export function validerCreneau(
  pointId: string,
  quand: Date,
): { ok: true } | { ok: false; message: string } {
  let point;
  try {
    point = choisirPoint(pointId);
  } catch {
    return { ok: false, message: "Lieu hors liste fermée." };
  }
  const etat = etatOuverture(point.horaires, quand);
  if (!etat.ouvert) {
    return {
      ok: false,
      message: "Ce lieu est fermé à cette heure. Choisis un créneau pendant l’ouverture.",
    };
  }
  return { ok: true };
}
