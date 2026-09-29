import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/src/lib/prisma";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export const dynamic = "force-dynamic";

export default async function PageMesEchanges() {
  const langue = await langueActuelle();
  const i = t(langue);
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <main>
        <h1>{i.messagesTitre}</h1>
        <p className="lede">{i.messagesConnexion}</p>
        <Link href="/connexion">{i.connexion}</Link>
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
      <h1>{i.messagesTitre}</h1>
      <p className="lede">{i.messagesLede}</p>
      {echanges.length === 0 ? (
        <p className="hint">{i.aucuneConversationPage}</p>
      ) : (
        <ul className="liste">
          {echanges.map((e) => (
            <li key={e.id}>
              <Link className="annonce" href={`/echange/${e.jeton}`}>
                <div>
                  <span className="nom">{e.annonce.titre}</span>
                  <span className="meta">
                    {e.messages[0]?.texte ?? i.aucunMessage}
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
