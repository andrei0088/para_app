import Link from "next/link";

interface Region {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[];
  description?: string;
  map?: string;
  takeoffs?: { regionId: number }[];
  landings?: { regionId: number }[];
}

interface Sites {
  takeoff: { regionId: number }[];
  landing: { regionId: number }[];
}

interface RegionsViewProps {
  regions: Region[];
  sites: Sites;
}

const RegionsView = ({ regions, sites }: RegionsViewProps) => {
  const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="my-2">
      {regions.map((r: Region) => {
        const bestMonths = r.bestSeason ?? [];
        return (
          <div
            key={r.id}
            className="bg-sky-50 rounded-xl p-4   hover:shadow-md transition my-3 py-1"
          >
            <Link href={`/region/${r.id}`}>
              <h3 className="text-lg md:text-xl font-semibold text-teal-600 hover:underline mb-2">
                {r.name}
              </h3>
            </Link>

            {bestMonths.length > 0 && (
              <p className="text-xs md:text-sm text-gray-600  mb-2">
                <span className="font-medium text-gray-800 ">When to go:</span>{" "}
                {bestMonths.map((m: number, i: number) => (
                  <span key={m}>
                    {MonthNames[m - 1]}
                    {i < bestMonths.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}

            <p className="text-xs md:text-sm text-gray-700 ">
              <span className="font-medium">Takeoffs:</span>{" "}
              {sites.takeoff.filter((t) => t.regionId === r.id).length}
            </p>

            <p className="text-xs md:text-sm text-gray-700 ">
              <span className="font-medium">Landings:</span>{" "}
              {sites.landing.filter((l) => l.regionId === r.id).length}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RegionsView;
