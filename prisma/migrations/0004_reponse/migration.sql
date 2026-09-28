CREATE TABLE "Reponse" (
    "id" TEXT NOT NULL,
    "annonceId" TEXT NOT NULL,
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reponse_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Reponse_annonceId_auteurId_key" ON "Reponse"("annonceId", "auteurId");
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "Annonce"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Reponse" ADD CONSTRAINT "Reponse_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
