ALTER TABLE "Annonce" ADD COLUMN IF NOT EXISTS "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
UPDATE "Annonce" SET "photos" = ARRAY["photoUrl"] WHERE "photoUrl" IS NOT NULL AND ("photos" IS NULL OR cardinality("photos") = 0);
