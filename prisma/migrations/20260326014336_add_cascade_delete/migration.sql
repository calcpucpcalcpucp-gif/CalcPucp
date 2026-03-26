/*
  Warnings:

  - A unique constraint covering the columns `[shareCode]` on the table `CourseTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseTemplate_shareCode_key" ON "CourseTemplate"("shareCode");
