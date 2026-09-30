"use client";

import { useState } from "react";
import { Vignette } from "@/src/ui/Vignette";

export function Galerie({ urls }: { urls: string[] }) {
  const propres = urls.filter(Boolean);
  const [actif, setActif] = useState(0);
  if (propres.length === 0) return null;
  const courant = propres[Math.min(actif, propres.length - 1)];
  return (
    <div className="galerie">
      <Vignette src={courant} grande />
      {propres.length > 1 ? (
        <div className="minis">
          {propres.map((url, i) => (
            <button
              key={url + i}
              type="button"
              className={i === actif ? "mini on" : "mini"}
              onClick={() => setActif(i)}
            >
              <Vignette src={url} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
