import { describe, expect, it } from "vitest";
import { creerEchange, cloturer } from "../src/domain/echange";
import { peutEcrire, validerMessage } from "../src/domain/message";

describe("message du jeton",
  () => {
    const ouvert = creerEchange({
      annonceId: "manteau",
      offrantId: "a",
      demandeurId: "b",
    });

    it("accepte un texte court",
      () => {
        expect(validerMessage(" Je suis à l’IGA ")).toEqual({
          ok: true,
          texte: "Je suis à l’IGA",
        });
      });

    it("refuse un texte vide",
      () => {
        expect(validerMessage("   ").ok).toBe(false);
      });

    it("autorise seulement les deux comptes tant que c’est ouvert",
      () => {
        expect(peutEcrire(ouvert, "a")).toBe(true);
        expect(peutEcrire(ouvert, "c")).toBe(false);
      });

    it("interdit d’écrire après la remise",
      () => {
        const remis = cloturer(ouvert, "remis");
        expect(peutEcrire(remis, "a")).toBe(false);
      });
  });
