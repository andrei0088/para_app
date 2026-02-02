/*
  Warnings:

  - Added the required column `type` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommunityType" AS ENUM ('Country', 'Region', 'Club');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "type" "CommunityType" NOT NULL;
