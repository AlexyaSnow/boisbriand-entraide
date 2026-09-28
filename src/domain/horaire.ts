export type Intervalle = { debutMin: number; finMin: number };

export function hm(h: number, m = 0): number {
  return h * 60 + m;
}

export function etatOuverture(
  horaires: Intervalle[][],
  maintenant = new Date(),
  fuseau = "America/Toronto",
): { ouvert: boolean; libelle: string } {
  const parts = new Intl.DateTimeFormat("fr-CA", {
    timeZone: fuseau,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(maintenant);

  const jourTxt = parts.find((p) => p.type === "weekday")?.value ?? "lun.";
  const heure = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const min = hm(heure, minute);

  const indexJour: Record<string, number> = {
    dim: 0,
    lun: 1,
    mar: 2,
    mer: 3,
    jeu: 4,
    ven: 5,
    sam: 6,
  };
  const cle = Object.keys(indexJour).find((k) => jourTxt.toLowerCase().startsWith(k)) ?? "lun";
  const jour = indexJour[cle];
  const creneaux = horaires[jour] ?? [];
  const ouvert = creneaux.some((c) => min >= c.debutMin && min < c.finMin);

  if (ouvert) {
    const courant = creneaux.find((c) => min >= c.debutMin && min < c.finMin)!;
    return { ouvert: true, libelle: `Ouvert · jusqu'’à ${fmt(courant.finMin)}` };
  }

  const prochain = creneaux.find((c) => min < c.debutMin);
  if (prochain) {
    return { ouvert: false, libelle: `Fermé · ouvre à ${fmt(prochain.debutMin)}` };
  }
  return { ouvert: false, libelle: "Fermé" };
}

function fmt(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}
