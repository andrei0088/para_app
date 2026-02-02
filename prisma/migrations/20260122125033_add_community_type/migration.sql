/*
  Warnings:

  - The `regions` column on the `Community` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "regions",
ADD COLUMN     "regions" INTEGER[];
