import { POINTS_AUTORISES } from "@/src/domain/points";

export default function Accueil() {
  return (
    <main>
      <h1>Entraide Boisbriand</h1>
      <p className="lede">
        Un item. Un échange. Un jeton. Rencontre seulement dans un lieu de la
        liste.
      </p>
      <h2>Points de rencontre (liste fermée)</h2>
      <ul>
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
