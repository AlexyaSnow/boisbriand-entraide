import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function enregistrerPhoto(fichier: File): Promise<string> {
  const brut = Buffer.from(await fichier.arrayBuffer());
  const nom = randomUUID();
  const dossier = path.join(process.cwd(), "public", "annonces");
  await mkdir(dossier, { recursive: true });

  const plein = await sharp(brut)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 68 })
    .toBuffer();
  const mini = await sharp(brut)
    .rotate()
    .resize({ width: 400, height: 400, fit: "cover" })
    .webp({ quality: 62 })
    .toBuffer();

  await writeFile(path.join(dossier, `${nom}.webp`), plein);
  await writeFile(path.join(dossier, `${nom}-sm.webp`), mini);

  const localPlein = `/annonces/${nom}.webp`;
  const localMini = `/annonces/${nom}-sm.webp`;

  if (process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID) {
    try {
      const client = new S3Client({
        region: process.env.S3_REGION || "ca-central-1",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      });
      await Promise.all([
        client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: `annonces/${nom}.webp`,
            Body: plein,
            ContentType: "image/webp",
            CacheControl: "public, max-age=31536000, immutable",
          }),
        ),
        client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: `annonces/${nom}-sm.webp`,
            Body: mini,
            ContentType: "image/webp",
            CacheControl: "public, max-age=31536000, immutable",
          }),
        ),
      ]);
    } catch (erreur) {
      console.error("S3 photo", erreur);
    }
  }

  return localMini;
}
