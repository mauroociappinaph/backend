/*
  Warnings:

  - You are about to drop the column `name` on the `Entrepreneurs` table. All the data in the column will be lost.
  - Added the required column `email` to the `Entrepreneurs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Entrepreneurs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Entrepreneurs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entrepreneurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "description" TEXT,
    "businessName" TEXT NOT NULL,
    "businessDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Entrepreneurs" ("businessDescription", "businessName", "createdAt", "description", "id", "updatedAt") SELECT "businessDescription", "businessName", "createdAt", "description", "id", "updatedAt" FROM "Entrepreneurs";
DROP TABLE "Entrepreneurs";
ALTER TABLE "new_Entrepreneurs" RENAME TO "Entrepreneurs";
CREATE UNIQUE INDEX "Entrepreneurs_email_key" ON "Entrepreneurs"("email");
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "entrepreneursId" INTEGER,
    CONSTRAINT "Product_entrepreneursId_fkey" FOREIGN KEY ("entrepreneursId") REFERENCES "Entrepreneurs" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "description", "id", "image", "name", "price", "updatedAt") SELECT "createdAt", "description", "id", "image", "name", "price", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
