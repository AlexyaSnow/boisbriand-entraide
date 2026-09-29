import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PageMesEchanges() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main>
        <h1>Mes échanges</h1>
        <p className="lede">Connecte-toi pour voir tes jetons.</p>
        <Link href="/connexion">Connexion</Link>
      </main>
    );
  }

  const echanges = await prisma.echange.findMany({
    where: {
      OR: [{ offrantId: session.user.id }, { demandeurId: session.user.id }],
    },
    include: { annonce: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Mes échanges</h1>
      <p className="lede">Un item, un jeton. L’accueil ne montre plus une annonce réservée.</p>
      {echanges.length === 0 ? (
        <p className="hint">Aucun jeton pour l’instant.</p>
      ) : (
        <ul className="liste">
          {echanges.map((e) => (
            <li key={e.id}>
              <Link className="annonce" href={`/echange/${e.jeton}`}>
                <div>
                  <span className="nom">{e.annonce.titre}</span>
                  <span className="meta">{e.statut}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
