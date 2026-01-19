/*
  Warnings:

  - You are about to drop the `CountryComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CountryComment" DROP CONSTRAINT "CountryComment_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CountryComment" DROP CONSTRAINT "CountryComment_userId_fkey";

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "comments" TEXT[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "countryComments" TEXT[];

-- DropTable
DROP TABLE "CountryComment";
