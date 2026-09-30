import Link from "next/link";
import { auth } from "@/auth";
import { POINTS_AUTORISES } from "@/src/domain/points";
import { nombreFamillesAidees } from "@/src/domain/echange";
import { ListePoints } from "@/src/ui/ListePoints";
import { Vignette } from "@/src/ui/Vignette";
import { prisma } from "@/src/lib/prisma";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";
import { ObjectifNoel } from "@/src/ui/ObjectifNoel";

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

function libelleCompteur(n: number, i: ReturnType<typeof t>): string {
  if (n === 0) return i.compteurZero;
  if (n === 1) return i.compteurUn;
  return `${n} ${i.compteurN}`;
}

export default async function Accueil() {
  const langue = await langueActuelle();
  const i = t(langue);
  const session = await auth();

  let famillesAidees = 0;
  try {
    const remis = await prisma.echange.findMany({
      where: { statut: "remis" },
      select: { statut: true },
    });
    famillesAidees = nombreFamillesAidees(remis.map((e) => e.statut));
  } catch {
    famillesAidees = 0;
  }

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
    photoUrl: string | null;
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
        dernier: e.messages[0]?.texte ?? i.aucunMessage,
        photoUrl: e.annonce.photoUrl,
      }));
    } catch {
      conversations = [];
    }
  }

  return (
    <main>
      <section className="hero">
        <div>
          <h1>{i.titre}</h1>
          <p className="lede">{i.lede}</p>
          <ObjectifNoel aidees={famillesAidees} langue={langue} />
          <div className="actions">
            <Link className="btn btn-primary" href="/offre">
              {i.btnOffre}
            </Link>
            <Link className="btn btn-ghost" href="/besoin">
              {i.btnBesoin}
            </Link>
          </div>
        </div>
        <svg className="branche" viewBox="0 0 200 260" fill="none" aria-hidden="true">
          <path d="M100 250 C90 180 40 140 70 40" stroke="#2d5a40" strokeWidth="1.4" />
          <path d="M96 160 C130 140 160 90 150 30" stroke="#2d5a40" strokeWidth="1.2" />
          <ellipse cx="68" cy="48" rx="16" ry="8" stroke="#2d5a40" />
          <ellipse cx="88" cy="70" rx="14" ry="7" stroke="#2d5a40" />
          <ellipse cx="148" cy="36" rx="16" ry="8" stroke="#2d5a40" />
          <ellipse cx="132" cy="64" rx="13" ry="7" stroke="#2d5a40" />
        </svg>
      </section>

      {session?.user ? (
        <>
          <div className="bloc-titre">
            <h2>{i.tesMessages}</h2>
            <Link href="/mes-echanges">{i.tousMessages}</Link>
          </div>
          {conversations.length === 0 ? (
            <p className="hint">{i.aucuneConversation}</p>
          ) : (
            <ul className="cartes">
              {conversations.map((c) => (
                <li key={c.jeton}>
                  <Link className="carte" href={`/echange/${c.jeton}`}>
                    <Vignette src={c.photoUrl} />
                    <div>
                      <span className="nom">{c.titre}</span>
                      <span className="meta">{c.dernier}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : null}

      <h2>{i.annonces}</h2>
      {annonces.length === 0 ? (
        <p className="hint">{i.aucune}</p>
      ) : (
        <ul className="grille">
          {annonces.map((a) => (
            <li key={a.id}>
              <Link className="tuile" href={`/annonce/${a.id}`}>
                <Vignette src={a.photoUrl} />
                <div className="tuile-texte">
                  <span className={`badge ${a.type === "besoin" ? "besoin" : ""}`}>
                    {a.type === "offre" ? i.offre : i.besoinLabel}
                  </span>
                  <span className="nom">{a.titre}</span>
                  <span className="meta">{libelleCategorie(a.categorie, i)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <h2>{i.points}</h2>
      <p className="hint">{i.lieuxNote}</p>
      <ListePoints points={POINTS_AUTORISES} langue={langue} />
    </main>
  );
}
