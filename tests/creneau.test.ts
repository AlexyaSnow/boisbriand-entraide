import { describe, expect, it } from "vitest";
import { validerCreneau } from "../src/domain/creneau";

describe("créneau",
  () => {
    it("accepte la biblio un lundi après-midi",
      () => {
        const lundi = new Date("2026-09-28T15:00:00Z");
        expect(validerCreneau("biblio-grande-allee", lundi).ok).toBe(true);
      });

    it("refuse l’hôtel de ville le dimanche",
      () => {
        const dimanche = new Date("2026-09-27T15:00:00Z");
        expect(validerCreneau("hotel-ville", dimanche).ok).toBe(false);
      });

    it("refuse un domicile",
      () => {
        expect(validerCreneau("chez-moi", new Date()).ok).toBe(false);
      });
  });
