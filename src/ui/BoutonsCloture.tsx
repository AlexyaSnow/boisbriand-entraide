"use client";

import { cloturerJeton } from "@/src/actions/cloturer";

export function BoutonsCloture({ jeton }: { jeton: string }) {
  return (
    <div className="actions">
      <form action={() => cloturerJeton(jeton, "remis")}>
        <button className="btn btn-primary" type="submit">
          Item remis
        </button>
      </form>
      <form action={() => cloturerJeton(jeton, "annule")}>
        <button className="btn btn-ghost" type="submit">
          Annuler l’échange
        </button>
      </form>
    </div>
  );
}
