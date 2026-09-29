import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { FormulaireFavoris } from "@/src/ui/FormulaireFavoris";

export const dynamic = "force-dynamic";

export default async function PageFavoris() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main>
        <h1>Mes lieux</h1>
        <p className="lede">Connecte-toi pour épingler 2 ou 3 lieux accessibles à pied.</p>
        <Link href="/connexion">Connexion</Link>
      </main>
    );
  }

  const rows = await prisma.favoriLieu.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main>
      <h1>Mes lieux</h1>
      <p className="lede">Pas un carnet de personnes. Seulement des points de la liste fermée. Maximum trois.</p>
      <FormulaireFavoris epingles={rows.map((r) => r.pointId)} />
    </main>
  );
}
