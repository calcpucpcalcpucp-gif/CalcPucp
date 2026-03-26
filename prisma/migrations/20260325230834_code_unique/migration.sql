/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_code_key" ON "Admin"("code");
