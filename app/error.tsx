"use client";

export default function Erreur({ reset }: { reset: () => void }) {
  return (
    <main>
      <h1>La page n’a pas pu s’afficher</h1>
      <p className="lede">
        Connexion interrompue ou erreur interne. Rien n’a été perdu sur ton
        compte : on n’enregistre pas encore.
      </p>
      <button className="btn btn-primary" type="button" onClick={() => reset()}>
        Réessayer
      </button>
    </main>
  );
}
