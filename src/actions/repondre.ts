"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

export async function repondreAnnonce(
  annonceId: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Connecte-toi avec Google pour répondre." };
  }

  const annonce = await prisma.annonce.findUnique({ where: { id: annonceId } });
  if (!annonce || annonce.statut !== "ouverte") {
    return { ok: false, message: "Cette annonce n’est plus ouverte." };
  }
  if (annonce.auteurId === session.user.id) {
    return { ok: false, message: "Tu ne peux pas répondre à ta propre annonce." };
  }

  try {
    await prisma.reponse.create({
      data: { annonceId, auteurId: session.user.id },
    });
    revalidatePath(`/annonce/${annonceId}`);
    return { ok: true };
  } catch {
    return { ok: false, message: "Tu as déjà répondu." };
  }
}
