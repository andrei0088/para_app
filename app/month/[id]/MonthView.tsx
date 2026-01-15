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
      <header className="w-full mb-8 pb-4">
        <h1 className="text-3xl font-semibold  ">
          Month: {MonthNames[month - 1]}
        </h1>
        <p className="  mt-1">
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
                className={`px-3 py-1 rounded-sm transition-colors ${
                  isActiveSeason
                    ? "bg-gray-300  font-semibold"
                    : "bg-white hover:bg-gray-100 shadow-sm  transition"
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
                className={`px-3 py-1 rounded-sm transition-colors ${
                  isActiveMonth
                    ? "bg-gray-300  font-semibold"
                    : "bg-white hover:bg-gray-100 shadow-sm  transition"
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
        <p className=" ">
          We are currently collecting data for this month. Please check back
          later.
        </p>
      ) : (
        <div className="flex flex-wrap mb-8 gap-2 overflow-x-auto whitespace-nowrap">
          {sortedCountries.map((c) => (
            <Link
              key={c.id}
              href={`/filter?country=${c.id}&month=${month}`}
              className="px-4 py-1 rounded-sm  hover:bg-slate-200  transition"
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
          <div key={country.id} className="mb-10 p-6 rounded-sm shadow-sm ">
            <h2 className="text-2xl font-semibold mb-4">{country.name}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {countryRegions.map((region) => (
                <div key={region.id} className="p-4 rounded-sm shadow-sm">
                  <h3 className="font-medium mb-2">
                    <Link
                      href={`/region/${region.id}`}
                      className="hover:underline"
                    >
                      {region.name}
                    </Link>
                  </h3>

                  {region.bestSeason && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {region.bestSeason.map((m) => (
                        <span
                          key={m}
                          className={`px-2 py-0.5 rounded-sm ${
                            m === month
                              ? "bg-gray-300  font-semibold"
                              : "bg-white hover:bg-gray-100 shadow-sm  transition"
                          }`}
                        >
                          {MonthNames[m - 1]}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className=" ">
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
