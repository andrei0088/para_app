import Link from "next/link";

import { get_home_country, get_home_region } from "@/app/api/get/homeAction";

const MONTHS = [
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

export default async function ViewAllPlaces() {
  // ✅ Fetch paralel (mult mai rapid)
  const [countries, regions] = await Promise.all([
    get_home_country(),
    get_home_region(),
  ]);

  // ✅ Grupăm regiunile pe țări o singură dată
  const regionsByCountry = new Map<number, typeof regions>();
  for (const r of regions) {
    if (!regionsByCountry.has(r.countryId)) {
      regionsByCountry.set(r.countryId, []);
    }
    regionsByCountry.get(r.countryId)!.push(r);
  }

  // ✅ Sortăm țările alfabetic pentru UX
  countries.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col gap-4 py-4">
      {countries.map((country) => {
        const countryRegions = regionsByCountry.get(country.id) ?? [];

        return (
          <div
            key={country.id}
            className="flex flex-col gap-2 bg-white/80 backdrop-blur-md rounded-xl shadow-md p-2 border border-gray-200/30 transition-all hover:shadow-lg"
          >
            {/* Country name */}
            <h2 className="text-sm md:text-base font-semibold text-center md:text-left text-gray-800">
              <Link
                href={`country/${country.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {country.name}
              </Link>
            </h2>

            {/* Regions */}
            {countryRegions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {countryRegions.map((region) => (
                  <div
                    key={region.id}
                    className="flex flex-col gap-1 p-2 bg-white/50 rounded-lg border border-gray-100/30 hover:bg-white/60 transition-colors min-w-[180px] flex-1"
                  >
                    {/* Region name */}
                    <Link
                      href={`region/${region.id}`}
                      className="text-xs md:text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {region.name}

                      {/* Best season */}
                      {region.bestSeason?.length > 0 && (
                        <div className="text-xs  text-yellow-800 px-2 py-0.5 rounded-full font-medium w-max">
                          {region.bestSeason
                            .map((m) => MONTHS[m - 1])
                            .join(", ")}
                        </div>
                      )}

                      {/* Takeoff & Landing counts */}
                      <div className="flex flex-wrap gap-1 mt-1 text-xs font-medium text-gray-700">
                        <span className="px-2 py-0.5 rounded-full border border-gray-300">
                          Takeoff: {region._count.takeoffs ?? 0}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-gray-300">
                          Landing: {region._count.landings ?? 0}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic pl-2">
                No regions available for this country.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
