import Link from "next/link";
import { POINTS_AUTORISES } from "@/src/domain/points";
import { ListePoints } from "@/src/ui/ListePoints";
import { prisma } from "@/src/lib/prisma";
import { langueActuelle } from "@/src/i18n/langue";
import { t } from "@/src/i18n/textes";

export const dynamic = "force-dynamic";

export default async function Accueil() {
  const langue = await langueActuelle();
  const i = t(langue);
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
      <h2>{i.annonces}</h2>
      {annonces.length === 0 ? (
        <p className="hint">{i.aucune}</p>
      ) : (
        <ul className="liste">
          {annonces.map((a) => (
            <li key={a.id} className="annonce">
              {a.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="vignette" src={a.photoUrl} alt="" />
              ) : null}
              <div>
                <span className="nom">{a.titre}</span>
                <span className="meta">
                  {a.type === "offre" ? i.offre : i.besoinLabel} · {a.categorie}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2 style={{ marginTop: "2rem" }}>{i.points}</h2>
      <ListePoints points={POINTS_AUTORISES} langue={langue} />
    </main>
  );
}
