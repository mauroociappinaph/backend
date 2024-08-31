-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entrepreneurs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "website" TEXT,
    "twitterHandle" TEXT,
    "description" TEXT,
    "businessName" TEXT NOT NULL,
    "businessDescription" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastProductCreated" INTEGER,
    "lastProductUpdated" INTEGER,
    "lastProductDelete" INTEGER
);
INSERT INTO "new_Entrepreneurs" ("businessDescription", "businessName", "createdAt", "description", "email", "firstName", "id", "lastName", "lastProductCreated", "lastProductDelete", "lastProductUpdated", "password", "phoneNumber", "twitterHandle", "updatedAt", "website") SELECT "businessDescription", "businessName", "createdAt", "description", "email", "firstName", "id", "lastName", "lastProductCreated", "lastProductDelete", "lastProductUpdated", "password", "phoneNumber", "twitterHandle", "updatedAt", "website" FROM "Entrepreneurs";
DROP TABLE "Entrepreneurs";
ALTER TABLE "new_Entrepreneurs" RENAME TO "Entrepreneurs";
CREATE UNIQUE INDEX "Entrepreneurs_email_key" ON "Entrepreneurs"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
