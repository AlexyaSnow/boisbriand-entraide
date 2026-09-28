import { describe, expect, it } from "vitest";
import { chatAutorise, cloturer, creerEchange } from "../src/domain/echange";

describe("échange",
  () => {
    it("crée un jeton lié à l’item",
      () => {
        const echange = creerEchange({
          annonceId: "manteau-6ans",
          offrantId: "a",
          demandeurId: "b",
        });
        expect(echange.jeton).toBe("jeton-manteau-6ans");
        expect(chatAutorise(echange)).toBe(true);
      });

    it("coupe le chat à la remise",
      () => {
        const ouvert = creerEchange({
          annonceId: "boite-conserve",
          offrantId: "a",
          demandeurId: "b",
        });
        const remis = cloturer(ouvert, "remis");
        expect(chatAutorise(remis)).toBe(false);
      });
  });
