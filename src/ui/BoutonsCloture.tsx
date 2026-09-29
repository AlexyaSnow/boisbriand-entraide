"use client";

import { cloturerJeton } from "@/src/actions/cloturer";

export function BoutonsCloture({ jeton }: { jeton: string }) {
  async function remis() {
    await cloturerJeton(jeton, "remis");
  }
  async function annuler() {
    await cloturerJeton(jeton, "annule");
  }
  return (
    <div className="actions">
      <form action={remis}>
        <button className="btn btn-primary" type="submit">
          Item remis
        </button>
      </form>
      <form action={annuler}>
        <button className="btn btn-ghost" type="submit">
          Annuler l’échange
        </button>
      </form>
    </div>
  );
}
