"use client";

import { useState } from "react";
import { accepterReponse } from "@/src/actions/accepter";

export function BoutonAccepter({ reponseId }: { reponseId: string }) {
  const [message, setMessage] = useState("");

  async function envoyer() {
    const r = await accepterReponse(reponseId);
    if (r && !r.ok) setMessage(r.message);
  }

  return (
    <div>
      <button className="btn btn-primary" type="button" onClick={envoyer}>
        Accepter — créer le jeton
      </button>
      {message ? <p className="etat ferme">{message}</p> : null}
    </div>
  );
}
