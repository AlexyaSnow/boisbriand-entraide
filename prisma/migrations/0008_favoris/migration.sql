CREATE TABLE "FavoriLieu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pointId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FavoriLieu_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "FavoriLieu_userId_pointId_key" ON "FavoriLieu"("userId", "pointId");
ALTER TABLE "FavoriLieu" ADD CONSTRAINT "FavoriLieu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
