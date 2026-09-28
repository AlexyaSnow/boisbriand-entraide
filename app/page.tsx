import Link from "next/link";
import { POINTS_AUTORISES } from "@/src/domain/points";

export default function Accueil() {
  return (
    <main>
      <h1>Donner au suivant, sans le fil Facebook.</h1>
      <p className="lede">
        Un item. Un échange. Un jeton. On se rejoint seulement dans un lieu
        public de la liste.
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
