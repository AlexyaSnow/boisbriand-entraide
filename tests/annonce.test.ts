import { describe, expect, it } from "vitest";
import { validerAnnonce } from "../src/domain/annonce";

describe("règles d’annonce",
  () => {
    it("accepte un titre d’un item",
      () => {
        const r = validerAnnonce({
          titre: "  Manteau d’hiver enfant 6 ans  ",
          categorie: "vetement",
        });
        expect(r.ok).toBe(true);
        if (r.ok) expect(r.titre).toBe("Manteau d’hiver enfant 6 ans");
      });

    it("refuse un titre trop court",
      () => {
        const r = validerAnnonce({ titre: "ab", categorie: "vetement" });
        expect(r.ok).toBe(false);
      });

    it("refuse une catégorie hors liste",
      () => {
        const r = validerAnnonce({ titre: "Manteau enfant", categorie: "jouet" });
        expect(r.ok).toBe(false);
      });
  });
