import { describe, expect, it } from "vitest";
import { estAdmin } from "../src/domain/admin";

describe("admin",
  () => {
    it("reconnaît le courriel autorisé",
      () => {
        expect(estAdmin("AlexyaSnow@gmail.com", "alexyasnow@gmail.com")).toBe(true);
      });

    it("refuse un autre compte",
      () => {
        expect(estAdmin("autre@gmail.com", "alexyasnow@gmail.com")).toBe(false);
      });
  });
