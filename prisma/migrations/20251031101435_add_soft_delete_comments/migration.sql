-- CreateTable
CREATE TABLE "CountryComment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CountryComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionComment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RegionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakeoffComment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "takeoffId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TakeoffComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingComment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "landingId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LandingComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CountryComment" ADD CONSTRAINT "CountryComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryComment" ADD CONSTRAINT "CountryComment_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionComment" ADD CONSTRAINT "RegionComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionComment" ADD CONSTRAINT "RegionComment_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeoffComment" ADD CONSTRAINT "TakeoffComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeoffComment" ADD CONSTRAINT "TakeoffComment_takeoffId_fkey" FOREIGN KEY ("takeoffId") REFERENCES "Takeoff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingComment" ADD CONSTRAINT "LandingComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingComment" ADD CONSTRAINT "LandingComment_landingId_fkey" FOREIGN KEY ("landingId") REFERENCES "Landing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
