-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'Pilot');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'Pilot';
