"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { peutAjouterFavori } from "@/src/domain/favoris";
import { prisma } from "@/src/lib/prisma";

export async function ajouterFavori(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }
  const pointId = String(formData.get("pointId") ?? "");
  const deja = await prisma.favoriLieu.findMany({
    where: { userId: session.user.id },
    select: { pointId: true },
  });
  const test = peutAjouterFavori(
    deja.map((f) => f.pointId),
    pointId,
  );
  if (!test.ok) return test;
  await prisma.favoriLieu.create({
    data: { userId: session.user.id, pointId },
  });
  revalidatePath("/favoris");
  return { ok: true as const };
}

export async function retirerFavori(pointId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false as const, message: "Connecte-toi." };
  }
  await prisma.favoriLieu.deleteMany({
    where: { userId: session.user.id, pointId },
  });
  revalidatePath("/favoris");
  return { ok: true as const };
}
