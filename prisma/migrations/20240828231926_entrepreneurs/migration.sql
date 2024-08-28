-- CreateTable
CREATE TABLE "Entrepreneurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "businessName" TEXT NOT NULL,
    "businessDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrepreneurs_name_key" ON "Entrepreneurs"("name");
