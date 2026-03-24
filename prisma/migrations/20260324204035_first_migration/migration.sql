/*
  Warnings:

  - You are about to drop the column `aggregation` on the `GradeComponent` table. All the data in the column will be lost.
  - Added the required column `aggregation` to the `GradeGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradeComponent" DROP COLUMN "aggregation";

-- AlterTable
ALTER TABLE "GradeGroup" ADD COLUMN     "aggregation" "AggregationType" NOT NULL;
