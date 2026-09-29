import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PageMesEchanges() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main>
        <h1>Messages</h1>
        <p className="lede">Connecte-toi pour voir tes conversations liées à un item.</p>
        <Link href="/connexion">Connexion</Link>
      </main>
    );
  }

  const echanges = await prisma.echange.findMany({
    where: {
      OR: [{ offrantId: session.user.id }, { demandeurId: session.user.id }],
    },
    include: {
      annonce: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Messages</h1>
      <p className="lede">Une conversation = un item. Pas de salon général.</p>
      {echanges.length === 0 ? (
        <p className="hint">Aucune conversation pour l’instant.</p>
      ) : (
        <ul className="liste">
          {echanges.map((e) => (
            <li key={e.id}>
              <Link className="annonce" href={`/echange/${e.jeton}`}>
                <div>
                  <span className="nom">{e.annonce.titre}</span>
                  <span className="meta">
                    {e.messages[0]?.texte ?? "Aucun message encore"}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
