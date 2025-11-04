import Link from "next/link";
import type { Country, Region } from "@/app/types";

const MonthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const displaySeason = [
  { id: 1, name: "Spring", emoji: "🌱", months: [3, 4, 5] },
  { id: 2, name: "Summer", emoji: "☀️", months: [6, 7, 8] },
  { id: 3, name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
  { id: 4, name: "Winter", emoji: "❄️", months: [12, 1, 2] },
];

interface ViewFilterProps {
  country: Country;
  regions: Region[];
  selectedSeasonId?: number;
  selectedMonthNum?: number;
}

export default function ViewFilter({ country, regions, selectedSeasonId, selectedMonthNum }: ViewFilterProps) {
  const currentSeason = displaySeason.find(s => s.id === selectedSeasonId);

  // Lunile disponibile în regiunile filtrate
  const availableMonths = Array.from(new Set(regions.flatMap(r => r.bestSeason ?? []))).sort((a, b) => a - b);

  // Sezoanele disponibile
  const availableSeasons = displaySeason.filter(s => s.months.some(m => availableMonths.includes(m)));

  return (
    <section className="max-w-6xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">

      {/* Numele țării */}
      <Link href={`/country/${country.id}`}>
        <h1 className="text-3xl font-bold mb-6">{country.name}</h1>
      </Link>

      {/* Sezoane */}
      <div className="mb-3 flex flex-wrap gap-2 justify-start">
        {availableSeasons.map(s => {
          const isActiveSeason = currentSeason?.id === s.id;
          return (
            <Link
              key={s.id}
              href={`/filter?country=${country.id}&season=${s.id}`}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                isActiveSeason
                  ? "bg-green-600 text-white dark:bg-green-500 font-semibold"
                  : "bg-gray-200 text-gray-700 hover:bg-yellow-200 hover:text-yellow-900"
              }`}
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Lunile */}
      <div className="mb-6 flex flex-wrap gap-2 justify-start">
        {availableMonths.map(m => {
          const isActiveMonth = selectedMonthNum === m;
          return (
            <Link
              key={m}
              href={`/filter?country=${country.id}&month=${m}`}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                isActiveMonth
                  ? "bg-green-600 text-white dark:bg-green-500 font-semibold"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {MonthNames[m - 1]}
            </Link>
          );
        })}
      </div>

      {/* Regiuni - responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {regions.map(region => (
          <Link key={region.id} href={`/region/${region.id}`} className="block">
            <div className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-green-600 mb-2">{region.name}</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Takeoffs: {region.takeoffs?.length ?? 0} | Landings: {region.landings?.length ?? 0}
              </p>
              {region.bestSeason && region.bestSeason.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {region.bestSeason.map(m => {
                    const seasonMonths = currentSeason?.months ?? [];
                    const isInSelectedSeason = seasonMonths.includes(m);
                    return (
                      <span
                        key={m}
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          isInSelectedSeason
                            ? "bg-green-600 text-white dark:bg-green-500"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
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
