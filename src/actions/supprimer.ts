"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { estAdmin } from "@/src/domain/admin";
import { prisma } from "@/src/lib/prisma";

export async function supprimerAnnonce(id: string) {
  const session = await auth();
  const admin = estAdmin(session?.user?.email, process.env.ADMIN_EMAILS || "");
  if (!admin) return { ok: false as const, message: "Réservé à l’admin." };

  await prisma.annonce.delete({ where: { id } });
  revalidatePath("/");
  return { ok: true as const };
}
