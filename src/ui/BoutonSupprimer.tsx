"use client";

import { useState } from "react";
import { supprimerAnnonce } from "@/src/actions/supprimer";

export function BoutonSupprimer({ id }: { id: string }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function envoyer() {
    if (!confirm("Supprimer cette annonce ?")) return;
    const r = await supprimerAnnonce(id);
    if (r.ok) {
      setOk(true);
      window.location.href = "/";
      return;
    }
    setErr(r.message);
  }

  if (ok) return <p className="hint">Supprimée.</p>;
  return (
    <div>
      <button className="btn btn-ghost" type="button" onClick={envoyer}>
        Supprimer (admin)
      </button>
      {err ? <p className="etat ferme">{err}</p> : null}
    </div>
  );
}
