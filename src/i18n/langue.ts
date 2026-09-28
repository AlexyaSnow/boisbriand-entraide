import { cookies } from "next/headers";
import type { Langue } from "./textes";

export async function langueActuelle(): Promise<Langue> {
  const valeur = (await cookies()).get("langue")?.value;
  return valeur === "en" ? "en" : "fr";
}
