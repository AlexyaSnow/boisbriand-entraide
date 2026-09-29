"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { validerCreneau } from "@/src/domain/creneau";
import { peutEcrire } from "@/src/domain/message";
import { estPointAutorise } from "@/src/domain/points";
import { prisma } from "@/src/lib/prisma";

export async function choisirLieuJeton(jeton: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }
  const pointId = String(formData.get("pointId") ?? "");
  const brut = String(formData.get("creneau") ?? "");
  if (!estPointAutorise(pointId)) {
    return { ok: false as const, message: "Lieu hors liste fermée." };
  }
  if (!brut) {
    return { ok: false as const, message: "Choisis un jour et une heure." };
  }
  const quand = new Date(brut);
  if (Number.isNaN(quand.getTime())) {
    return { ok: false as const, message: "Date invalide." };
  }
  const test = validerCreneau(pointId, quand);
  if (!test.ok) return test;

  const echange = await prisma.echange.findUnique({ where: { jeton } });
  if (!echange) return { ok: false as const, message: "Jeton introuvable." };
  if (!peutEcrire(echange, session.user.id)) {
    return { ok: false as const, message: "Tu ne peux plus changer le lieu." };
  }
  await prisma.echange.update({
    where: { jeton },
    data: { pointId, creneauDebut: quand },
  });
  revalidatePath(`/echange/${jeton}`);
  return { ok: true as const };
}
