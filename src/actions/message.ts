"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { peutEcrire, validerMessage } from "@/src/domain/message";
import { prisma } from "@/src/lib/prisma";

export async function posterMessage(jeton: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }

  const brut = String(formData.get("texte") ?? "");
  const valide = validerMessage(brut);
  if (!valide.ok) return valide;

  const echange = await prisma.echange.findUnique({ where: { jeton } });
  if (!echange) return { ok: false as const, message: "Jeton introuvable." };

  if (!peutEcrire(echange, session.user.id)) {
    return { ok: false as const, message: "Plus de messages sur ce jeton." };
  }

  await prisma.message.create({
    data: {
      echangeId: echange.id,
      auteurId: session.user.id,
      texte: valide.texte,
    },
  });

  revalidatePath(`/echange/${jeton}`);
  return { ok: true as const };
}
