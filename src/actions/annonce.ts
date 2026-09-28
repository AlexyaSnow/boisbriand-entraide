"use server";

import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

const categories = ["vetement", "denree", "enfant", "autre"] as const;

export async function publierAnnonce(
  type: "offre" | "besoin",
  formData: FormData,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Connecte-toi avec Google pour publier." };
  }

  const titre = String(formData.get("titre") ?? "").trim();
  const categorie = String(formData.get("categorie") ?? "");
  const detail = String(formData.get("detail") ?? "").trim();

  if (titre.length < 3 || titre.length > 80) {
    return { ok: false, message: "Le titre doit faire entre 3 et 80 caractères." };
  }
  if (!categories.includes(categorie as (typeof categories)[number])) {
    return { ok: false, message: "Catégorie invalide." };
  }

  try {
    await prisma.annonce.create({
      data: {
        type,
        titre,
        categorie: categorie as (typeof categories)[number],
        detail,
        auteurId: session.user.id,
      },
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "La base ne répond pas. Vérifie que Docker tourne.",
    };
  }
}
