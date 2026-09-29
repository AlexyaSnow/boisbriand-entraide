CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "echangeId" TEXT NOT NULL,
    "auteurId" TEXT NOT NULL,
    "texte" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Message" ADD CONSTRAINT "Message_echangeId_fkey" FOREIGN KEY ("echangeId") REFERENCES "Echange"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
