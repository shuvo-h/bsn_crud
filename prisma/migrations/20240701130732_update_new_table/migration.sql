/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "bsn_user" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "name" TEXT,
    "ic" TEXT,
    "phone_number" TEXT,

    CONSTRAINT "bsn_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bsn_user_code_key" ON "bsn_user"("code");
