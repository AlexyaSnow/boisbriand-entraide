"use server";

import { auth } from "@/auth";
import { validerAnnonce } from "@/src/domain/annonce";
import { validerPhoto } from "@/src/domain/photo";
import { prisma } from "@/src/lib/prisma";
import { enregistrerPhoto } from "@/src/lib/stockage-photo";

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

  const brut = formData.get("photo");
  const fichier = brut instanceof File && brut.size > 0 ? brut : null;
  const photoOk = validerPhoto(fichier);
  if (!photoOk.ok) return photoOk;

  let photoUrl: string | null = null;
  if (fichier) {
    try {
      photoUrl = await enregistrerPhoto(fichier);
    } catch {
      return { ok: false, message: "La photo n’a pas pu être enregistrée." };
    }
  }

  try {
    await prisma.annonce.create({
      data: {
        type,
        titre: valide.titre,
        categorie: valide.categorie,
        detail: String(formData.get("detail") ?? "").trim(),
        photoUrl,
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
