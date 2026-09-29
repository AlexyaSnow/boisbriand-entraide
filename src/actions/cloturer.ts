"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { cloturer } from "@/src/domain/echange";
import { prisma } from "@/src/lib/prisma";

export async function cloturerJeton(jeton: string, fin: "remis" | "annule") {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }
  const echange = await prisma.echange.findUnique({ where: { jeton } });
  if (!echange) return { ok: false as const, message: "Jeton introuvable." };
  const membre =
    session.user.id === echange.offrantId || session.user.id === echange.demandeurId;
  if (!membre) return { ok: false as const, message: "Pas ton jeton." };
  if (echange.statut !== "ouvert") {
    return { ok: false as const, message: "Déjà clos." };
  }

  const suite = cloturer(
    {
      jeton: echange.jeton,
      annonceId: echange.annonceId,
      offrantId: echange.offrantId,
      demandeurId: echange.demandeurId,
      statut: echange.statut,
    },
    fin,
  );

  await prisma.$transaction([
    prisma.echange.update({
      where: { jeton },
      data: { statut: suite.statut },
    }),
    prisma.annonce.update({
      where: { id: echange.annonceId },
      data: { statut: "fermee" },
    }),
  ]);

  revalidatePath(`/echange/${jeton}`);
  revalidatePath("/mes-echanges");
  revalidatePath("/");
  return { ok: true as const };
}
