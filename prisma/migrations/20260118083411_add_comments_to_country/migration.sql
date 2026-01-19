/*
  Warnings:

  - You are about to drop the `LandingComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegionComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TakeoffComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LandingComment" DROP CONSTRAINT "LandingComment_landingId_fkey";

-- DropForeignKey
ALTER TABLE "LandingComment" DROP CONSTRAINT "LandingComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "RegionComment" DROP CONSTRAINT "RegionComment_regionId_fkey";

-- DropForeignKey
ALTER TABLE "RegionComment" DROP CONSTRAINT "RegionComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "TakeoffComment" DROP CONSTRAINT "TakeoffComment_takeoffId_fkey";

-- DropForeignKey
ALTER TABLE "TakeoffComment" DROP CONSTRAINT "TakeoffComment_userId_fkey";

-- AlterTable
ALTER TABLE "Landing" ADD COLUMN     "comments" TEXT[];

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "comments" TEXT[];

-- AlterTable
ALTER TABLE "Takeoff" ADD COLUMN     "comments" TEXT[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "landingComments" TEXT[],
ADD COLUMN     "regionComments" TEXT[],
ADD COLUMN     "takeoffComments" TEXT[];

-- DropTable
DROP TABLE "LandingComment";

-- DropTable
DROP TABLE "RegionComment";

-- DropTable
DROP TABLE "TakeoffComment";
