import Link from "next/link";
import { POINTS_AUTORISES } from "@/src/domain/points";

export default function Accueil() {
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
      <h2>Points de rencontre</h2>
      <ul className="liste">
        {POINTS_AUTORISES.map((point) => (
          <li key={point.id}>
            <span className="nom">{point.nom}</span>
            <span className="meta">{point.adresseAffichee}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
