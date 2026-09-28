import Link from "next/link";
import { POINTS_AUTORISES } from "@/src/domain/points";
import { ListePoints } from "@/src/ui/ListePoints";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Accueil() {
  let annonces: { id: string; type: string; titre: string; categorie: string }[] =
    [];
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
      <h1>Entraide à Boisbriand</h1>
      <p className="lede">
        Publier un don ou un besoin. Se rejoindre dans un lieu public de la
        liste. Un item, un échange.
      </p>
      <div className="actions">
        <Link className="btn btn-primary" href="/offre">
          Publier une offre
        </Link>
        <Link className="btn btn-ghost" href="/besoin">
          Publier un besoin
        </Link>
      </div>
      <h2>Annonces ouvertes</h2>
      {annonces.length === 0 ? (
        <p className="hint">Aucune annonce pour l’instant.</p>
      ) : (
        <ul className="liste">
          {annonces.map((a) => (
            <li key={a.id}>
              <span className="nom">{a.titre}</span>
              <span className="meta">
                {a.type === "offre" ? "Offre" : "Besoin"} · {a.categorie}
              </span>
            </li>
          ))}
        </ul>
      )}
      <h2 style={{ marginTop: "2rem" }}>Points de rencontre</h2>
      <ListePoints points={POINTS_AUTORISES} />
    </main>
  );
}
