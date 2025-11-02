import Link from "next/link";
import { get_all_country, get_all_regions_with_sites } from "@/app/api/get/get_places";

export default async function ViewAllPlaces() {
  const countrys = await get_all_country();
  const regions = await get_all_regions_with_sites();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {countrys.map((c) => {
        const countryRegions = regions.filter((r) => r.countryId === c.id);

        return (
          <div
            key={c.id}
            className="flex flex-col gap-3 bg-white/80 dark:bg-gray-50/20 backdrop-blur-md rounded-xl shadow-md p-4 border border-gray-200/30 dark:border-gray-300/20 transition-all hover:shadow-lg"
          >
            {/* Country Name */}
            <div className="text-lg font-semibold text-center md:text-left">
              <Link href={`country/${c.id}`}>
                {c.name}
              </Link>
            </div>

            {/* Regions */}
            <div className="flex flex-wrap gap-3">
              {countryRegions.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col gap-1 p-3 bg-white/40 dark:bg-gray-800/30 rounded-lg border border-gray-100/20 hover:bg-white/50 dark:hover:bg-gray-800/40 transition-colors min-w-[180px] flex-1"
                >
                  {/* Region Name */}
                  <Link
                    href={`region/${r.id}`}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 transition-colors"
                  >
                    {r.name}
                  </Link>

                  {/* Best Season */}
                  {r.bestSeason?.length > 0 && (
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium mt-1 w-max">
                      {r.bestSeason.map((m) => months[m - 1]).join(", ")}
                    </div>
                  )}

                  {/* Takeoffs & Landings */}
                  <div className="flex flex-wrap gap-2 mt-1 text-xs font-medium text-gray-700 dark:text-gray-200">
                    <span className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600">
                      Takeoff: {r.takeoffs?.length ?? 0}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-600">
                      Landing: {r.landings?.length ?? 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
