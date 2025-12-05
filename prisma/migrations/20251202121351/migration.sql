-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "canPM" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "showAge" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Takeoff" ADD COLUMN     "wind" TEXT;
