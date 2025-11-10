import Link from "next/link";
import {
  get_all_country,
  get_all_regions_with_sites,
} from "@/app/api/get/get_places";

export default async function ViewAllPlaces() {
  const countrys = await get_all_country();
  const regions = await get_all_regions_with_sites();
  const months = [
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
    <div className="flex flex-col gap-3 py-3">
      {countrys.map((c) => {
        const countryRegions = regions.filter((r) => r.countryId === c.id);

        return (
          <div
            key={c.id}
            className="flex flex-col gap-2 bg-white/80  backdrop-blur-md rounded-xl shadow-md p-1.5 border border-gray-200/30  transition-all hover:shadow-lg"
          >
            {/* Country Name */}
            <div className="text-sm md:text-base font-semibold text-center md:text-left text-gray-800 ">
              <Link
                href={`country/${c.id}`}
                className="hover:text-blue-600  transition-colors duration-200"
              >
                {c.name}
              </Link>
            </div>

            {/* Regions */}
            <div className="flex flex-wrap gap-2">
              {countryRegions.map((r) => (
                <div
                  key={r.id}
                  className="flex flex-col gap-1 p-2 bg-white/40  rounded-lg border border-gray-100/20  hover:bg-white/50  transition-colors min-w-[180px] flex-1"
                >
                  {/* Region Name */}
                  <Link
                    href={`region/${r.id}`}
                    className="text-xs md:text-sm font-medium text-gray-700  hover:text-gray-900 transition-colors duration-150"
                  >
                    {r.name}
                  </Link>

                  {/* Best Season */}
                  {r.bestSeason?.length > 0 && (
                    <div className="text-xs bg-yellow-100  text-yellow-800  px-2 py-0.5 rounded-full font-medium mt-0.5 w-max">
                      {r.bestSeason.map((m) => months[m - 1]).join(", ")}
                    </div>
                  )}

                  {/* Takeoffs & Landings */}
                  <div className="flex flex-wrap gap-1 mt-1 text-xs font-medium text-gray-700 ">
                    <span className="px-2 py-0.5 rounded-full border border-gray-300 ">
                      Takeoff: {r.takeoffs?.length ?? 0}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-gray-300 ">
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
