import { describe, expect, it } from "vitest";
import { choisirPoint, estPointAutorise } from "../src/domain/points";

describe("liste fermée des points",
  () => {
    it("accepte un point de la liste",
      () => {
        expect(estPointAutorise("biblio-grande-allee")).toBe(true);
      });

    it("refuse une adresse libre",
      () => {
        expect(estPointAutorise("123-rue-chez-moi")).toBe(false);
        expect(() => choisirPoint("123-rue-chez-moi")).toThrow(
          "Lieu hors liste fermée",
        );
      });
  });
