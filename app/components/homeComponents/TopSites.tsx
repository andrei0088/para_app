import Image from "next/image";
import Top from "@/public/icons/top.png";
import TopSiteCard from "./TopSiteCard";
import { get_top_spots } from "./homeAction";

export default async function TopSites() {
  const topSpots = await get_top_spots();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex gap-2">
          <Image src={Top} alt="" width={25} height={10} className="mt-2" />
          TOP Paragliding Flying Spots
        </h1>

        <p className="mt-2 text-gray-600">
          Discover the best paragliding flying sites, voted by pilots from our
          community. Find safe, tested locations perfect for unforgettable
          flights.
        </p>
      </div>
      <div className="flex flex-col">
        {topSpots.map((spot) => (
          <TopSiteCard spot={spot} key={spot.regionId} />
        ))}
      </div>
    </div>
  );
}
