import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function enregistrerPhoto(fichier: File): Promise<string> {
  const brut = Buffer.from(await fichier.arrayBuffer());
  const webp = await sharp(brut)
    .rotate()
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 68 })
    .toBuffer();

  const nom = `${randomUUID()}.webp`;
  const dossier = path.join(process.cwd(), "public", "annonces");
  await mkdir(dossier, { recursive: true });
  await writeFile(path.join(dossier, nom), webp);
  const local = `/annonces/${nom}`;

  const base = process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, "");
  const peutS3 = Boolean(
    process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && base,
  );

  if (peutS3) {
    try {
      const client = new S3Client({
        region: process.env.S3_REGION || "ca-central-1",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      });
      await client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: `annonces/${nom}`,
          Body: webp,
          ContentType: "image/webp",
          CacheControl: "public, max-age=31536000, immutable",
        }),
      );
      return `${base}/annonces/${nom}`;
    } catch (erreur) {
      console.error("S3 photo", erreur);
    }
  }

  return local;
}
