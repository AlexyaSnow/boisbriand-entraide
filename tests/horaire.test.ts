import { describe, expect, it } from "vitest";
import { etatOuverture, hm } from "../src/domain/horaire";

const biblio = [
  [{ debutMin: hm(10), finMin: hm(17) }],
  [{ debutMin: hm(10), finMin: hm(21) }],
  [{ debutMin: hm(10), finMin: hm(21) }],
  [{ debutMin: hm(10), finMin: hm(21) }],
  [{ debutMin: hm(10), finMin: hm(21) }],
  [{ debutMin: hm(10), finMin: hm(21) }],
  [{ debutMin: hm(10), finMin: hm(17) }],
];

describe("horaires",
  () => {
    it("voit la biblio ouverte un lundi matin",
      () => {
        const lundi = new Date("2026-09-28T15:00:00Z");
        const etat = etatOuverture(biblio, lundi);
        expect(etat.ouvert).toBe(true);
      });

    it("voit l’hôtel fermé le dimanche",
      () => {
        const dimanche = new Date("2026-09-27T15:00:00Z");
        const hotel = [[], [], [], [], [], [], []];
        expect(etatOuverture(hotel, dimanche).ouvert).toBe(false);
      });
  });
