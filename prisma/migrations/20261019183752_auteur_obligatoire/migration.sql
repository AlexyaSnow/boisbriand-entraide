/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `auteurId` on table `Annonce` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Annonce" DROP CONSTRAINT "Annonce_auteurId_fkey";

-- DropForeignKey
ALTER TABLE "Echange" DROP CONSTRAINT "Echange_demandeurId_fkey";

-- DropForeignKey
ALTER TABLE "Echange" DROP CONSTRAINT "Echange_offrantId_fkey";

-- AlterTable
ALTER TABLE "Annonce" ALTER COLUMN "auteurId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey";

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Echange" ADD CONSTRAINT "Echange_offrantId_fkey" FOREIGN KEY ("offrantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Echange" ADD CONSTRAINT "Echange_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
