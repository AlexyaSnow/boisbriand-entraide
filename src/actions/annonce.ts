"use server";

import { auth } from "@/auth";
import { validerAnnonce } from "@/src/domain/annonce";
import { prisma } from "@/src/lib/prisma";

export async function publierAnnonce(
  type: "offre" | "besoin",
  formData: FormData,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Connecte-toi avec Google pour publier." };
  }

  const valide = validerAnnonce({
    titre: String(formData.get("titre") ?? ""),
    categorie: String(formData.get("categorie") ?? ""),
  });
  if (!valide.ok) return valide;

  try {
    await prisma.annonce.create({
      data: {
        type,
        titre: valide.titre,
        categorie: valide.categorie,
        detail: String(formData.get("detail") ?? "").trim(),
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
