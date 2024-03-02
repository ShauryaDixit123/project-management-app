/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "reporter" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_reporter_fkey" FOREIGN KEY ("reporter") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
