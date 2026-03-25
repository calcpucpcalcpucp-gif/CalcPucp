/*
  Warnings:

  - You are about to drop the `AdminCode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminCodeId` to the `CourseTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseTemplate" ADD COLUMN     "adminCodeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AdminCode";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseTemplate" ADD CONSTRAINT "CourseTemplate_adminCodeId_fkey" FOREIGN KEY ("adminCodeId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
