"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { validerAnnonce } from "@/src/domain/annonce";
import { extensionPhoto, validerPhoto } from "@/src/domain/photo";
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

  const brut = formData.get("photo");
  const fichier = brut instanceof File && brut.size > 0 ? brut : null;
  const photoOk = validerPhoto(fichier);
  if (!photoOk.ok) return photoOk;

  let photoUrl: string | null = null;
  if (fichier) {
    const nom = `${randomUUID()}.${extensionPhoto(fichier.type)}`;
    const dossier = path.join(process.cwd(), "public", "annonces");
    await mkdir(dossier, { recursive: true });
    await writeFile(path.join(dossier, nom), Buffer.from(await fichier.arrayBuffer()));
    photoUrl = `/annonces/${nom}`;
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
