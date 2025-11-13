import Link from "next/link";
import type { Country } from "@/app/types";
import { RegionMinimal } from "./page";

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

const SEASONS = [
  { id: 1, name: "Spring", months: [3, 4, 5] },
  { id: 2, name: "Summer", months: [6, 7, 8] },
  { id: 3, name: "Autumn", months: [9, 10, 11] },
  { id: 4, name: "Winter", months: [12, 1, 2] },
];

interface ViewFilterProps {
  country: Country;
  regions: RegionMinimal[];
  selectedSeasonId?: number;
  selectedMonthNum?: number;
}

export default function ViewFilter({
  country,
  regions,
  selectedSeasonId,
  selectedMonthNum,
}: ViewFilterProps) {
  const currentSeason = SEASONS.find((s) => s.id === selectedSeasonId);

  // Lunile disponibile în regiunile filtrate
  const availableMonths = Array.from(
    new Set(regions.flatMap((r) => r.bestSeason ?? []))
  ).sort((a, b) => a - b);

  // Sezoanele disponibile
  const availableSeasons = SEASONS.filter((s) =>
    s.months.some((m) => availableMonths.includes(m))
  );
  console.log({ regions });
  return (
    <section className="w-full my-10 p-6 bg-white  rounded-2xl shadow-lg">
      {/* Titlu țară */}
      <Link href={`/country/${country.id}`}>
        <h1 className="text-3xl font-bold text-gray-800  mb-6">
          {country.name}
        </h1>
      </Link>

      {/* Sezoane */}
      <div className="mb-4 flex flex-wrap gap-2">
        {availableSeasons.map((s) => {
          const isActiveSeason = currentSeason?.id === s.id;
          return (
            <Link
              key={s.id}
              href={`/filter?country=${country.id}&season=${s.id}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isActiveSeason
                  ? "bg-gray-800 text-white   font-semibold"
                  : "bg-gray-200 text-gray-800  hover:bg-gray-300 "
              }`}
            >
              {s.name}
            </Link>
          );
        })}
      </div>

      {/* Lunile */}
      <div className="mb-6 flex flex-wrap gap-2">
        {availableMonths.map((m) => {
          const isActiveMonth = selectedMonthNum === m;
          return (
            <Link
              key={m}
              href={`/filter?country=${country.id}&month=${m}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isActiveMonth
                  ? "bg-gray-800 text-white  font-semibold"
                  : "bg-gray-200 text-gray-800  hover:bg-gray-300 "
              }`}
            >
              {MonthNames[m - 1]}
            </Link>
          );
        })}
      </div>

      {/* Regiuni */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Link key={region.id} href={`/region/${region.id}`} className="block">
            <div className="bg-gray-50  hover:bg-gray-100  p-4 rounded-xl shadow-sm border border-gray-200 ">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {region.name}
              </h2>
              <p className="text-sm text-gray-700  mb-2">
                Takeoffs: {region.takeoffs?.length ?? 0} | Landings:{" "}
                {region.landings?.length ?? 0}
              </p>
              {region.bestSeason && region.bestSeason.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {region.bestSeason.map((m) => {
                    const seasonMonths = currentSeason?.months ?? [];
                    const isInSelectedSeason = seasonMonths.includes(m);
                    return (
                      <span
                        key={m}
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          isInSelectedSeason
                            ? "bg-gray-800 text-white  font-semibold"
                            : "bg-gray-200 text-gray-800 "
                        }`}
                      >
                        {MonthNames[m - 1]}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
