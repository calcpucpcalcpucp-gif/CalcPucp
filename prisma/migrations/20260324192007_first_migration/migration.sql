/*
  Warnings:

  - Added the required column `aggregation` to the `GradeComponent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AggregationType" AS ENUM ('AVERAGE', 'SUM', 'MAX', 'MIN');

-- AlterTable
ALTER TABLE "GradeComponent" ADD COLUMN     "aggregation" "AggregationType" NOT NULL;
