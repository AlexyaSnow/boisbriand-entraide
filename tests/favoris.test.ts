import { describe, expect, it } from "vitest";
import { peutAjouterFavori } from "../src/domain/favoris";

describe("lieux favoris",
  () => {
    it("accepte un lieu de la liste",
      () => {
        expect(peutAjouterFavori([], "iga-faubourg").ok).toBe(true);
      });

    it("refuse un domicile",
      () => {
        expect(peutAjouterFavori([], "chez-moi").ok).toBe(false);
      });

    it("refuse un quatrième lieu",
      () => {
        const trois = ["iga-faubourg", "tim-faubourg", "biblio-grande-allee"];
        expect(peutAjouterFavori(trois, "tim-6e").ok).toBe(false);
      });
  });
