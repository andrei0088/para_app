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

const displaySeason = [
  { id: 1, name: "Spring", emoji: "🌱", months: [3, 4, 5] },
  { id: 2, name: "Summer", emoji: "☀️", months: [6, 7, 8] },
  { id: 3, name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
  { id: 4, name: "Winter", emoji: "❄️", months: [12, 1, 2] },
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
    <section className="w-full mx-3 p-3 my-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      {/* Header Sezoane + Lunile */}
      <div className="mb-6 border-b pb-2">
        {/* Sezoanele */}
        <div className="flex flex-wrap gap-2 mb-2">
          {displaySeason.map((s, idx) => {
            const isActiveSeason = s.id === season.id;
            return (
              <Link
                key={idx}
                href={`/seson/${s.id}`}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                  isActiveSeason
                    ? "bg-green-600 text-white dark:bg-green-500 font-bold"
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
        <div className="flex flex-wrap gap-2">
          {MonthNames.map((m, idx) => {
            const monthNumber = idx + 1;
            const isActiveMonth = monthNumber === month;
            return (
              <Link
                key={m}
                href={`/month/${monthNumber}`}
                className={`px-2 py-1 rounded-md transition-colors ${
                  isActiveMonth
                    ? "bg-green-600 text-white dark:bg-green-500 font-bold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {m}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Lista țări */}
      {sortedCountries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 italic">
          Echipa noastră se ocupă de colectarea datelor pentru această lună.
          Reveniti mai târziu!
        </p>
      ) : (
        <div className="flex flex-wrap mb-5 gap-2 overflow-x-auto whitespace-nowrap">
          {sortedCountries.map((c) => (
            <Link
              key={c.id}
              href={`/filter?country=${c.id}&month=${month}`}
              className="px-3 py-1 rounded-lg bg-gray-100 font-medium hover:bg-gray-300 transition-colors flex-shrink-0"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {/* Liste țări și regiuni */}
      {sortedCountries.map((country) => {
        const countryRegions = regions
          .filter((r) => r.countryId === country.id)
          .sort((a, b) => a.name.localeCompare(b.name));

        if (!countryRegions.length) return null;

        return (
          <div
            key={country.id}
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              {country.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {countryRegions.map((region) => (
                <div
                  key={region.id}
                  className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm"
                >
                  <h3 className="font-medium mb-1">
                    <Link
                      href={`/region/${region.id}`}
                      className="hover:underline"
                    >
                      {region.name}
                    </Link>
                  </h3>

                  {region.bestSeason && (
                    <div className="flex flex-wrap gap-1 mb-1 text-xs">
                      {region.bestSeason.map((m) => (
                        <span
                          key={m}
                          className={`px-1 py-0.5 rounded-full ${
                            m === month
                              ? "bg-green-600 text-white dark:bg-green-500"
                              : "text-yellow-800 dark:text-yellow-400"
                          }`}
                        >
                          {MonthNames[m - 1]}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-700 dark:text-gray-300">
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
