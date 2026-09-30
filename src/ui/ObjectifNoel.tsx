"use client";

import { useEffect, useState } from "react";
import type { Langue } from "@/src/i18n/textes";
import { t } from "@/src/i18n/textes";

const OBJECTIF = 100;
const FIN = Date.parse("2026-12-31T23:59:59-05:00");

function decoupe(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    jours: Math.floor(s / 86400),
    heures: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    secondes: s % 60,
  };
}

function deux(n: number) {
  return String(n).padStart(2, "0");
}

export function ObjectifNoel({
  aidees,
  langue,
}: {
  aidees: number;
  langue: Langue;
}) {
  const i = t(langue);
  const [reste, setReste] = useState(() => decoupe(FIN - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setReste(decoupe(FIN - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const pct = Math.min(100, Math.round((aidees / OBJECTIF) * 100));

  return (
    <div className="objectif-noel">
      <p className="objectif-kicker">{i.noelKicker}</p>
      <div className="objectif-row">
        <div className="objectif-cell">
          <span className="objectif-num">{reste.jours}</span>
          <span className="objectif-lab">{i.noelJours}</span>
        </div>
        <div className="objectif-cell">
          <span className="objectif-num">{deux(reste.heures)}</span>
          <span className="objectif-lab">{i.noelHeures}</span>
        </div>
        <div className="objectif-cell">
          <span className="objectif-num">{deux(reste.minutes)}</span>
          <span className="objectif-lab">{i.noelMinutes}</span>
        </div>
        <div className="objectif-cell">
          <span className="objectif-num">{deux(reste.secondes)}</span>
          <span className="objectif-lab">{i.noelSecondes}</span>
        </div>
      </div>
      <div className="objectif-barre" aria-hidden="true">
        <span style={{ width: `${Math.max(pct, 2)}%` }} />
      </div>
      <p className="objectif-score">
        <strong>
          {aidees} / {OBJECTIF}
        </strong>{" "}
        {i.noelScore}
      </p>
      <p className="objectif-note">{i.noelNote}</p>
    </div>
  );
}
