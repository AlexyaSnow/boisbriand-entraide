"use client";

import { changerLangue } from "@/src/actions/langue";
import type { Langue } from "@/src/i18n/textes";

export function BasculeLangue({ actuelle }: { actuelle: Langue }) {
  return (
    <div className="langues" role="group" aria-label="Language">
      <button
        type="button"
        className={actuelle === "fr" ? "langue on" : "langue"}
        onClick={() => changerLangue("fr")}
      >
        FR
      </button>
      <button
        type="button"
        className={actuelle === "en" ? "langue on" : "langue"}
        onClick={() => changerLangue("en")}
      >
        EN
      </button>
    </div>
  );
}
