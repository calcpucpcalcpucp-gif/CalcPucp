/*
  Warnings:

  - The values [MAX,MIN] on the enum `AggregationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AggregationType_new" AS ENUM ('AVERAGE', 'SUM', 'LOWEST_DROP');
ALTER TABLE "GradeComponent" ALTER COLUMN "aggregation" TYPE "AggregationType_new" USING ("aggregation"::text::"AggregationType_new");
ALTER TYPE "AggregationType" RENAME TO "AggregationType_old";
ALTER TYPE "AggregationType_new" RENAME TO "AggregationType";
DROP TYPE "public"."AggregationType_old";
COMMIT;
