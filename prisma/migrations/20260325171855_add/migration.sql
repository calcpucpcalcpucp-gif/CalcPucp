/*
  Warnings:

  - You are about to drop the column `adminCodeId` on the `CourseTemplate` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `CourseTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseTemplate" DROP CONSTRAINT "CourseTemplate_adminCodeId_fkey";

-- AlterTable
ALTER TABLE "CourseTemplate" DROP COLUMN "adminCodeId",
ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseTemplate" ADD CONSTRAINT "CourseTemplate_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
