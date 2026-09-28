"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function changerLangue(langue: "fr" | "en") {
  (await cookies()).set("langue", langue, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  revalidatePath("/", "layout");
}
