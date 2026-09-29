CREATE TYPE "StatutEchange" AS ENUM ('ouvert', 'remis', 'annule');

CREATE TABLE "Echange" (
    "id" TEXT NOT NULL,
    "jeton" TEXT NOT NULL,
    "annonceId" TEXT NOT NULL,
    "offrantId" TEXT NOT NULL,
    "demandeurId" TEXT NOT NULL,
    "statut" "StatutEchange" NOT NULL DEFAULT 'ouvert',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Echange_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Echange_jeton_key" ON "Echange"("jeton");
CREATE UNIQUE INDEX "Echange_annonceId_key" ON "Echange"("annonceId");
ALTER TABLE "Echange" ADD CONSTRAINT "Echange_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "Annonce"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Echange" ADD CONSTRAINT "Echange_offrantId_fkey" FOREIGN KEY ("offrantId") REFERENCES "User"("id") ON UPDATE CASCADE;
ALTER TABLE "Echange" ADD CONSTRAINT "Echange_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "User"("id") ON UPDATE CASCADE;
