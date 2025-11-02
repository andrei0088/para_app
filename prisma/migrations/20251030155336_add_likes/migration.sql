-- CreateTable
CREATE TABLE "CountryLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CountryLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegionLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakeoffLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "takeoffId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TakeoffLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "landingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandingLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryLike_userId_countryId_key" ON "CountryLike"("userId", "countryId");

-- CreateIndex
CREATE UNIQUE INDEX "RegionLike_userId_regionId_key" ON "RegionLike"("userId", "regionId");

-- CreateIndex
CREATE UNIQUE INDEX "TakeoffLike_userId_takeoffId_key" ON "TakeoffLike"("userId", "takeoffId");

-- CreateIndex
CREATE UNIQUE INDEX "LandingLike_userId_landingId_key" ON "LandingLike"("userId", "landingId");

-- AddForeignKey
ALTER TABLE "CountryLike" ADD CONSTRAINT "CountryLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountryLike" ADD CONSTRAINT "CountryLike_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionLike" ADD CONSTRAINT "RegionLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionLike" ADD CONSTRAINT "RegionLike_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeoffLike" ADD CONSTRAINT "TakeoffLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeoffLike" ADD CONSTRAINT "TakeoffLike_takeoffId_fkey" FOREIGN KEY ("takeoffId") REFERENCES "Takeoff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingLike" ADD CONSTRAINT "LandingLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandingLike" ADD CONSTRAINT "LandingLike_landingId_fkey" FOREIGN KEY ("landingId") REFERENCES "Landing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
