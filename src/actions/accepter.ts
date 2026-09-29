"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { creerEchange } from "@/src/domain/echange";
import { prisma } from "@/src/lib/prisma";

export async function accepterReponse(reponseId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }

  const reponse = await prisma.reponse.findUnique({
    where: { id: reponseId },
    include: { annonce: true },
  });
  if (!reponse || reponse.annonce.auteurId !== session.user.id) {
    return { ok: false as const, message: "Tu ne peux pas accepter cette réponse." };
  }
  if (reponse.annonce.statut !== "ouverte") {
    return { ok: false as const, message: "Cette annonce n’est plus ouverte." };
  }

  const auteurId = reponse.annonce.auteurId;
  const autreId = reponse.auteurId;
  const offrantId = reponse.annonce.type === "offre" ? auteurId! : autreId;
  const demandeurId = reponse.annonce.type === "offre" ? autreId : auteurId!;

  const metier = creerEchange({
    annonceId: reponse.annonceId,
    offrantId,
    demandeurId,
  });

  await prisma.$transaction([
    prisma.annonce.update({
      where: { id: reponse.annonceId },
      data: { statut: "reservee" },
    }),
    prisma.echange.create({
      data: {
        jeton: metier.jeton,
        annonceId: reponse.annonceId,
        offrantId,
        demandeurId,
        statut: "ouvert",
      },
    }),
  ]);

  redirect(`/echange/${metier.jeton}`);
}
