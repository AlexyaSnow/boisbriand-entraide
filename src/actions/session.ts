"use server";

import { signIn, signOut } from "@/auth";

export async function connexionGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function deconnexion() {
  await signOut({ redirectTo: "/" });
}
