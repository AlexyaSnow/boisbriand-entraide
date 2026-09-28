"use client";

import { useState } from "react";
import { repondreAnnonce } from "@/src/actions/repondre";

export function BoutonRepondre({
  annonceId,
  libelle,
}: {
  annonceId: string;
  libelle: string;
}) {
  const [etat, setEtat] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function envoyer() {
    const r = await repondreAnnonce(annonceId);
    if (r.ok) {
      setEtat("ok");
      return;
    }
    setEtat("err");
    setMessage(r.message);
  }

  if (etat === "ok") {
    return <p className="ok">Réponse envoyée. Pas de chat tant que l’autre personne n’a pas accepté.</p>;
  }

  return (
    <div>
      <button className="btn btn-primary" type="button" onClick={envoyer}>
        {libelle}
      </button>
      {etat === "err" ? <p className="etat ferme">{message}</p> : null}
    </div>
  );
}
