"use client";

import { useState } from "react";
import { posterMessage } from "@/src/actions/message";

export function FormulaireMessage({ jeton }: { jeton: string }) {
  const [erreur, setErreur] = useState("");

  async function envoyer(formData: FormData) {
    setErreur("");
    const r = await posterMessage(jeton, formData);
    if (!r.ok) setErreur(r.message);
  }

  return (
    <form action={envoyer}>
      <label>
        Message
        <textarea name="texte" maxLength={500} required />
      </label>
      <button className="btn btn-primary" type="submit">
        Envoyer
      </button>
      {erreur ? <p className="etat ferme">{erreur}</p> : null}
    </form>
  );
}
