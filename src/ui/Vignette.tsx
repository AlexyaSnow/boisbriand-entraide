"use client";

export function Vignette({
  src,
  grande,
}: {
  src: string | null;
  grande?: boolean;
}) {
  if (!src) return <span className={grande ? "photo-grande vide" : "vignette vide"} />;
  const affiche = grande ? src.replace("-sm.webp", ".webp") : src;
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={grande ? "photo-grande" : "vignette"}
      src={affiche}
      alt=""
      width={grande ? 1200 : 160}
      height={grande ? 900 : 160}
      loading={grande ? "eager" : "lazy"}
      decoding="async"
    />
  );
  if (!grande) return img;
  return (
    <a href={affiche} target="_blank" rel="noreferrer">
      {img}
    </a>
  );
}
