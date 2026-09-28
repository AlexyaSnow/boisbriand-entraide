const TYPES_OK = new Set(["image/jpeg", "image/png", "image/webp"]);
const TAILLE_MAX = 2_000_000;

export function validerPhoto(
  fichier: { type: string; size: number } | null,
): { ok: true } | { ok: false; message: string } {
  if (!fichier || fichier.size === 0) return { ok: true };
  if (!TYPES_OK.has(fichier.type)) {
    return { ok: false, message: "Photo : JPEG, PNG ou WebP seulement." };
  }
  if (fichier.size > TAILLE_MAX) {
    return { ok: false, message: "Photo trop lourde (max 2 Mo)." };
  }
  return { ok: true };
}

export function extensionPhoto(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}
