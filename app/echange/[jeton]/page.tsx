import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { chatAutorise } from "@/src/domain/echange";
import { prisma } from "@/src/lib/prisma";
import { FormulaireMessage } from "@/src/ui/FormulaireMessage";

export default async function PageEchange({
  params,
}: {
  params: Promise<{ jeton: string }>;
}) {
  const { jeton } = await params;
  const session = await auth();
  const echange = await prisma.echange.findUnique({
    where: { jeton },
    include: {
      annonce: true,
      messages: { include: { auteur: true }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!echange) notFound();

  const moi = session?.user?.id;
  const membre = moi === echange.offrantId || moi === echange.demandeurId;
  if (!membre) {
    return (
      <main>
        <h1>Jeton privé</h1>
        <p className="lede">Seuls les deux comptes de cet échange peuvent l’ouvrir.</p>
        <Link href="/">Retour</Link>
      </main>
    );
  }

  const ouvert = chatAutorise({
    jeton: echange.jeton,
    annonceId: echange.annonceId,
    offrantId: echange.offrantId,
    demandeurId: echange.demandeurId,
    statut: echange.statut,
  });

  return (
    <main>
      <p className="hint">
        <Link href={`/annonce/${echange.annonceId}`}>{echange.annonce.titre}</Link>
      </p>
      <h1>Jeton</h1>
      <p className="lede">Un item, un échange, un jeton. Pas de salon.</p>

      <ul className="liste">
        {echange.messages.length === 0 ? (
          <li className="point">
            <span className="meta">Aucun message pour l’instant.</span>
          </li>
        ) : (
          echange.messages.map((m) => (
            <li className="point" key={m.id}>
              <span className="nom">{m.auteur.name || m.auteur.email}</span>
              <span className="meta">{m.texte}</span>
            </li>
          ))
        )}
      </ul>

      {ouvert ? (
        <FormulaireMessage jeton={jeton} />
      ) : (
        <p className="ok">Échange clos. Plus de messages.</p>
      )}
    </main>
  );
}
