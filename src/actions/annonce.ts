"use server";

import { auth } from "@/auth";
import { validerAnnonce } from "@/src/domain/annonce";
import { validerPhoto } from "@/src/domain/photo";
import { prisma } from "@/src/lib/prisma";
import { enregistrerPhoto } from "@/src/lib/stockage-photo";

const MAX_PHOTOS = 5;

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

  const bruts = [
    ...formData.getAll("photo"),
    ...formData.getAll("photos"),
  ].filter((x): x is File => x instanceof File && x.size > 0);

  if (bruts.length > MAX_PHOTOS) {
    return { ok: false, message: "Maximum 5 photos par item." };
  }

  for (const fichier of bruts) {
    const photoOk = validerPhoto(fichier);
    if (!photoOk.ok) return photoOk;
  }

  const photos: string[] = [];
  for (const fichier of bruts) {
    try {
      photos.push(await enregistrerPhoto(fichier));
    } catch {
      return { ok: false, message: "Une photo n’a pas pu être enregistrée." };
    }
  }

  try {
    await prisma.annonce.create({
      data: {
        type,
        titre: valide.titre,
        categorie: valide.categorie,
        detail: String(formData.get("detail") ?? "").trim(),
        photoUrl: photos[0] ?? null,
        photos,
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
