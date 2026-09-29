import Link from "next/link";
import { auth } from "@/auth";
import { POINTS_AUTORISES } from "@/src/domain/points";
import { ListePoints } from "@/src/ui/ListePoints";
import { prisma } from "@/src/lib/prisma";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export const dynamic = "force-dynamic";

function libelleCategorie(
  categorie: string,
  i: ReturnType<typeof t>,
): string {
  if (categorie === "vetement") return i.vetement;
  if (categorie === "denree") return i.denree;
  if (categorie === "enfant") return i.enfant;
  return i.autre;
}

export default async function Accueil() {
  const langue = await langueActuelle();
  const i = t(langue);
  const session = await auth();

  let annonces: {
    id: string;
    type: string;
    titre: string;
    categorie: string;
    photoUrl: string | null;
  }[] = [];
  try {
    annonces = await prisma.annonce.findMany({
      where: { statut: "ouverte" },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  } catch {
    annonces = [];
  }

  let conversations: {
    jeton: string;
    titre: string;
    dernier: string;
  }[] = [];
  if (session?.user?.id) {
    try {
      const rows = await prisma.echange.findMany({
        where: {
          OR: [
            { offrantId: session.user.id },
            { demandeurId: session.user.id },
          ],
        },
        include: {
          annonce: true,
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
        orderBy: { createdAt: "desc" },
        take: 4,
      });
      conversations = rows.map((e) => ({
        jeton: e.jeton,
        titre: e.annonce.titre,
        dernier: e.messages[0]?.texte ?? "Aucun message encore",
      }));
    } catch {
      conversations = [];
    }
  }

  return (
    <main>
      <h1>{i.titre}</h1>
      <p className="lede">{i.lede}</p>
      <div className="actions">
        <Link className="btn btn-primary" href="/offre">
          {i.btnOffre}
        </Link>
        <Link className="btn btn-ghost" href="/besoin">
          {i.btnBesoin}
        </Link>
      </div>

      {session?.user ? (
        <>
          <h2>Tes messages</h2>
          {conversations.length === 0 ? (
            <p className="hint">Aucune conversation en cours.</p>
          ) : (
            <ul className="liste">
              {conversations.map((c) => (
                <li key={c.jeton}>
                  <Link className="annonce" href={`/echange/${c.jeton}`}>
                    <div>
                      <span className="nom">{c.titre}</span>
                      <span className="meta">{c.dernier}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="hint">
            <Link href="/mes-echanges">Tous les messages</Link>
          </p>
        </>
      ) : null}

      <h2>{i.annonces}</h2>
      {annonces.length === 0 ? (
        <p className="hint">{i.aucune}</p>
      ) : (
        <ul className="liste">
          {annonces.map((a) => (
            <li key={a.id}>
              <Link className="annonce" href={`/annonce/${a.id}`}>
                {a.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="vignette" src={a.photoUrl} alt="" />
                ) : null}
                <div>
                  <span className="nom">{a.titre}</span>
                  <span className="meta">
                    {a.type === "offre" ? i.offre : i.besoinLabel} ·{" "}
                    {libelleCategorie(a.categorie, i)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <h2>{i.points}</h2>
      <ListePoints points={POINTS_AUTORISES} langue={langue} />
    </main>
  );
}
