import Link from "next/link";
import type { Country, Region, Takeoff, Landing } from "@/app/types";

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

const seasons = [
  { id: 1, name: "Spring", months: [3, 4, 5] },
  { id: 2, name: "Summer", months: [6, 7, 8] },
  { id: 3, name: "Autumn", months: [9, 10, 11] },
  { id: 4, name: "Winter", months: [12, 1, 2] },
];

interface SeasonViewProps {
  season: number;
  countrys?: Country[];
  regions?: (Region & {
    takeoffs?: Takeoff[];
    landings?: Landing[];
  })[];
}

export default function SeasonView({
  season,
  countrys = [],
  regions = [],
}: SeasonViewProps) {
  const currentSeason = seasons.find((s) => s.id === season);
  if (!currentSeason) return null;

  const sortedCountries = [...countrys].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <section className="w-full my-10 px-4 sm:px-6 lg:px-8">
      {/* --- Header full width --- */}
      <header className="w-full mb-8 border-b pb-4">
        <h1 className="text-3xl font-semibold text-gray-800 ">
          Season: {currentSeason.name}
        </h1>
        <p className="text-gray-600  mt-1 text-sm">
          Explore the countries and regions ideal for {currentSeason.name}.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {seasons.map((s) => {
            const isActiveSeason = s.id === currentSeason.id;
            return (
              <Link
                key={s.id}
                href={`/season/${s.id}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isActiveSeason
                    ? "bg-gray-800 text-white  font-semibold"
                    : "bg-gray-200 text-gray-800  hover:bg-gray-300 "
                }`}
              >
                {s.name}
              </Link>
            );
          })}
        </div>

        {/* Lunile din sezon */}
        <div className="flex flex-wrap gap-2 mt-4">
          {MonthNames.map((month, idx) => {
            const monthNumber = idx + 1;
            const isInSeason = currentSeason.months.includes(monthNumber);

            return (
              <Link
                key={monthNumber}
                href={`/month/${monthNumber}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isInSeason
                    ? "bg-gray-800 text-white  font-semibold"
                    : "bg-gray-200 text-gray-800  hover:bg-gray-300 "
                }`}
              >
                {month}
              </Link>
            );
          })}
        </div>
      </header>

      {/* --- Lista țărilor pentru filtrare --- */}
      {sortedCountries.length === 0 ? (
        <p className="text-gray-600  italic">
          We are currently collecting data for this season. Please check back
          later.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mb-8">
          {sortedCountries.map((c) => (
            <Link
              key={c.id}
              href={`/filter?country=${c.id}&season=${season}`}
              className="px-4 py-1 rounded-lg bg-gray-100 text-gray-800  hover:bg-gray-200  transition"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {/* --- Listele regiunilor pe țări --- */}
      {sortedCountries.map((country) => {
        const countryRegions = regions
          .filter((r) => r.countryId === country.id)
          .sort((a, b) => a.name.localeCompare(b.name));

        if (!countryRegions.length) return null;

        return (
          <div
            key={country.id}
            className="mb-10 p-6 bg-gray-50  rounded-xl shadow-sm border border-gray-200 "
          >
            <h2 className="text-2xl font-semibold text-gray-800  mb-4">
              {country.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {countryRegions.map((region) => (
                <div
                  key={region.id}
                  className="p-4 rounded-lg bg-white  border border-gray-200  shadow-sm"
                >
                  <h3 className="font-medium text-gray-800  mb-2">
                    <Link
                      href={`/region/${region.id}`}
                      className="hover:underline"
                    >
                      {region.name}
                    </Link>
                  </h3>

                  {region.bestSeason && (
                    <div className="flex flex-wrap gap-1 mb-2 text-xs text-gray-600 ">
                      {region.bestSeason.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 rounded-full bg-gray-200 "
                        >
                          {MonthNames[m - 1]}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-gray-700 ">
                    Takeoffs: {region.takeoffs?.length ?? 0} | Landings:{" "}
                    {region.landings?.length ?? 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
