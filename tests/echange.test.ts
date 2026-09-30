import { describe, expect, it } from "vitest";
import {
  chatAutorise,
  cloturer,
  creerEchange,
  nombreFamillesAidees,
} from "../src/domain/echange";

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

    it("refuse un échange avec soi-même",
      () => {
        expect(() =>
          creerEchange({
            annonceId: "manteau-6ans",
            offrantId: "a",
            demandeurId: "a",
          }),
        ).toThrow("Un échange implique deux comptes distincts");
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

    it("coupe le chat à l’annulation",
      () => {
        const ouvert = creerEchange({
          annonceId: "boite-conserve",
          offrantId: "a",
          demandeurId: "b",
        });
        const annule = cloturer(ouvert, "annule");
        expect(chatAutorise(annule)).toBe(false);
      });

    it("ne compte que les remises comme familles aidées",
      () => {
        expect(nombreFamillesAidees([])).toBe(0);
        expect(nombreFamillesAidees(["ouvert", "annule"])).toBe(0);
        expect(nombreFamillesAidees(["remis", "ouvert", "remis", "annule"])).toBe(2);
      });
  });
