import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ fichier: string }> },
) {
  const { fichier } = await params;
  if (!/^[a-z0-9-]+\.(webp|jpg|jpeg|png)$/i.test(fichier)) {
    return new NextResponse("non", { status: 400 });
  }
  const cible = path.join(process.cwd(), "uploads", "annonces", fichier);
  try {
    const data = await readFile(cible);
    return new NextResponse(data, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse("absente", { status: 404 });
  }
}
