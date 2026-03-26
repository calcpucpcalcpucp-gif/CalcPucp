-- DropForeignKey
ALTER TABLE "CourseTemplate" DROP CONSTRAINT "CourseTemplate_adminId_fkey";

-- DropForeignKey
ALTER TABLE "GradeComponent" DROP CONSTRAINT "GradeComponent_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GradeGroup" DROP CONSTRAINT "GradeGroup_tempId_fkey";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CourseTemplate" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "GradeComponent" ADD CONSTRAINT "GradeComponent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "GradeGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeGroup" ADD CONSTRAINT "GradeGroup_tempId_fkey" FOREIGN KEY ("tempId") REFERENCES "CourseTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTemplate" ADD CONSTRAINT "CourseTemplate_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
