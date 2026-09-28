import Link from "next/link";

export default function Introuvable() {
  return (
    <main>
      <h1>Page introuvable</h1>
      <p className="lede">Cette adresse n’existe pas dans l’application.</p>
      <Link className="btn btn-primary" href="/">
        Retour à l’accueil
      </Link>
    </main>
  );
}
