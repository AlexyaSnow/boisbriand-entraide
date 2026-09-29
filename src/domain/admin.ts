export function estAdmin(email: string | null | undefined, autorises: string): boolean {
  if (!email) return false;
  return autorises
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(email.toLowerCase());
}
