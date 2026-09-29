"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { peutEcrire } from "@/src/domain/message";
import { estPointAutorise } from "@/src/domain/points";
import { prisma } from "@/src/lib/prisma";

export async function choisirLieuJeton(jeton: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }
  const pointId = String(formData.get("pointId") ?? "");
  if (!estPointAutorise(pointId)) {
    return { ok: false as const, message: "Lieu hors liste fermée." };
  }
  const echange = await prisma.echange.findUnique({ where: { jeton } });
  if (!echange) return { ok: false as const, message: "Jeton introuvable." };
  if (!peutEcrire(echange, session.user.id)) {
    return { ok: false as const, message: "Tu ne peux plus changer le lieu." };
  }
  await prisma.echange.update({
    where: { jeton },
    data: { pointId },
  });
  revalidatePath(`/echange/${jeton}`);
  return { ok: true as const };
}
