import Link from "next/link";

type TopSiteCardProps = {
  spot: Spot;
};
type Spot = {
  id: number;
  name: string;
  regionId: number;
  count: number;
  landingsCount: number;
  takeoffsCount: number;
  country: string;
};

export default function TopSiteCard({ spot }: TopSiteCardProps) {
  return (
    <Link href={`/region/${spot.regionId}`}>
      <div className="w-full md:w-1/3 p-4 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          {spot.name} : {spot.country}
        </h2>
        <p className="text-gray-700 w-full items-center text-green-800 font-semibold">
          Votes: {spot.count}{" "}
        </p>{" "}
        <p>
          Takeoff: {spot.takeoffsCount} Landing: {spot.landingsCount}
        </p>
      </div>
    </Link>
  );
}
