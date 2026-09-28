-- CreateEnum
CREATE TYPE "TypeAnnonce" AS ENUM ('offre', 'besoin');

-- CreateEnum
CREATE TYPE "Categorie" AS ENUM ('vetement', 'denree', 'enfant', 'autre');

-- CreateEnum
CREATE TYPE "StatutAnnonce" AS ENUM ('ouverte', 'reservee', 'fermee');

-- CreateTable
CREATE TABLE "Annonce" (
    "id" TEXT NOT NULL,
    "type" "TypeAnnonce" NOT NULL,
    "titre" TEXT NOT NULL,
    "categorie" "Categorie" NOT NULL,
    "detail" TEXT NOT NULL DEFAULT '',
    "statut" "StatutAnnonce" NOT NULL DEFAULT 'ouverte',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);
