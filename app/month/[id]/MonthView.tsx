import Link from "next/link";

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

interface Spot {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[];
  takeoffs?: Spot[];
  landings?: Spot[];
}

interface SeasonType {
  id: number;
  name: string;
  months: number[];
}

interface MonthViewProps {
  month: number;
  season: SeasonType;
  countrys?: Country[];
  regions?: Region[];
}

export default function MonthView({
  month,
  season,
  countrys = [],
  regions = [],
}: MonthViewProps) {
  const sortedCountries = [...countrys].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      {/* --- Header full-width: Sezon + Lunile --- */}
      <header className="w-full mb-8 border-b pb-4">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Month: {MonthNames[month - 1]}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          Season: {season.name}. Explore the countries and regions ideal for
          this month.
        </p>

        {/* Sezoanele */}
        <div className="flex flex-wrap gap-2 mt-4">
          {seasons.map((s) => {
            const isActiveSeason = s.id === season.id;
            return (
              <Link
                key={s.id}
                href={`/season/${s.id}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isActiveSeason
                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-semibold"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {s.name}
              </Link>
            );
          })}
        </div>

        {/* Lunile */}
        <div className="flex flex-wrap gap-2 mt-4">
          {MonthNames.map((name, idx) => {
            const monthNumber = idx + 1;
            const isActiveMonth = monthNumber === month;
            return (
              <Link
                key={monthNumber}
                href={`/month/${monthNumber}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isActiveMonth
                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-semibold"
                    : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </header>

      {/* --- Lista țărilor filtrabile --- */}
      {sortedCountries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 italic">
          We are currently collecting data for this month. Please check back
          later.
        </p>
      ) : (
        <div className="flex flex-wrap mb-8 gap-2 overflow-x-auto whitespace-nowrap">
          {sortedCountries.map((c) => (
            <Link
              key={c.id}
              href={`/filter?country=${c.id}&month=${month}`}
              className="px-4 py-1 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
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
            className="mb-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {country.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {countryRegions.map((region) => (
                <div
                  key={region.id}
                  className="p-4 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm"
                >
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                    <Link
                      href={`/region/${region.id}`}
                      className="hover:underline"
                    >
                      {region.name}
                    </Link>
                  </h3>

                  {region.bestSeason && (
                    <div className="flex flex-wrap gap-1 mb-2 text-xs text-gray-600 dark:text-gray-300">
                      {region.bestSeason.map((m) => (
                        <span
                          key={m}
                          className={`px-2 py-0.5 rounded-full ${
                            m === month
                              ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 font-semibold"
                              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {MonthNames[m - 1]}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-gray-700 dark:text-gray-300">
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
