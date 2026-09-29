const TYPES_OK = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/pjpeg",
]);
const TAILLE_MAX = 8_000_000;

export function validerPhoto(
  fichier: { type: string; size: number } | null,
): { ok: true } | { ok: false; message: string } {
  if (!fichier || fichier.size === 0) return { ok: true };
  const type = (fichier.type || "").toLowerCase();
  const typeOk = type === "" || type.startsWith("image/") || TYPES_OK.has(type);
  if (!typeOk) {
    return { ok: false, message: "Photo : JPEG, PNG ou WebP seulement." };
  }
  if (fichier.size > TAILLE_MAX) {
    return { ok: false, message: "Photo trop lourde (max 8 Mo)." };
  }
  return { ok: true };
}
