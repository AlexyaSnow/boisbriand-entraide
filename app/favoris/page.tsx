import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { FormulaireFavoris } from "@/src/ui/FormulaireFavoris";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export const dynamic = "force-dynamic";

export default async function PageFavoris() {
  const langue = await langueActuelle();
  const i = t(langue);
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main>
        <h1>{i.lieuxTitre}</h1>
        <p className="lede">{i.lieuxConnexion}</p>
        <Link href="/connexion">{i.connexion}</Link>
      </main>
    );
  }

  const rows = await prisma.favoriLieu.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <main>
      <h1>{i.lieuxTitre}</h1>
      <p className="lede">{i.lieuxLede}</p>
      <FormulaireFavoris epingles={rows.map((r) => r.pointId)} />
    </main>
  );
}
