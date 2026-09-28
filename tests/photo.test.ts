import { describe, expect, it } from "vitest";
import { validerPhoto } from "../src/domain/photo";

describe("photo d’item",
  () => {
    it("accepte l’absence de photo",
      () => {
        expect(validerPhoto(null).ok).toBe(true);
      });

    it("refuse un PDF",
      () => {
        expect(validerPhoto({ type: "application/pdf", size: 100 }).ok).toBe(false);
      });

    it("refuse un fichier trop lourd",
      () => {
        expect(validerPhoto({ type: "image/jpeg", size: 3_000_000 }).ok).toBe(false);
      });
  });
