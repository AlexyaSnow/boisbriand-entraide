import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function enregistrerPhoto(fichier: File): Promise<string> {
  const brut = Buffer.from(await fichier.arrayBuffer());
  const webp = await sharp(brut)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();

  const nom = `${randomUUID()}.webp`;

  if (process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID) {
    const client = new S3Client({
      region: process.env.S3_REGION || "ca-central-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
      },
    });
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: `annonces/${nom}`,
        Body: webp,
        ContentType: "image/webp",
      }),
    );
    const base = process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, "");
    if (!base) throw new Error("S3_PUBLIC_BASE_URL manquant");
    return `${base}/annonces/${nom}`;
  }

  const dossier = path.join(process.cwd(), "public", "annonces");
  await mkdir(dossier, { recursive: true });
  await writeFile(path.join(dossier, nom), webp);
  return `/annonces/${nom}`;
}
