import Link from "next/link";

interface Site {
  id: number;
  name: string;
  altitude?: number | null; // ✅ adăugat pentru a evita eroarea la t.altitude
}

interface Details {
  country: { id: number; name: string };
  region: { id: number; name: string; bestSeason?: number[] };
}

interface Props {
  details: Details;
  sites: {
    takeoff: Site[];
    landing: Site[];
  };
}

export default function TakeoffDetails({ details, sites }: Props) {
  const Month = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const bestSeason = details.region.bestSeason?.length
    ? details.region.bestSeason.map((m) => Month[m - 1]).join(", ")
    : "N/A";

  return (
    <div className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/60 px-8 py-3 shadow-sm text-sm sm:text-base transition-colors mb-4 rounded-2xl">
      {/* === ROW 1 === */}
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 text-gray-900 dark:text-gray-100 font-medium tracking-tight">
          <span className="text-lg font-semibold">
            🪂{" "}
            <Link
              href={`/region/${details.region.id}`}
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {details.region.name}
            </Link>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            ·{" "}
            <Link
              href={`/country/${details.country.id}`}
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {details.country.name}
            </Link>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            · <span className="text-base">🌤️</span> Best season:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {bestSeason}
            </span>
          </span>
        </div>
      </div>

      {/* === ROW 2 === */}
      <div className="flex flex-wrap justify-start md:justify-center items-center gap-x-8 gap-y-1 mt-2 max-w-7xl mx-auto text-sm">
        {/* Takeoffs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-blue-600 dark:text-blue-300 flex items-center gap-1">
            🛫 <span>Takeoffs:</span>
          </span>
          {sites.takeoff?.length ? (
            sites.takeoff.map((t) => (
              <Link
                key={t.id}
                href={`/takeoff/${t.id}`}
                className="text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-md hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-colors duration-200"
              >
                {t.name}
                {t.altitude ? ` – ${t.altitude}m` : ""}
              </Link>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">–</span>
          )}
        </div>

        {/* Landings */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
            🛬 <span>Landings:</span>
          </span>
          {sites.landing?.length ? (
            sites.landing.map((l) => (
              <Link
                key={l.id}
                href={`/landing/${l.id}`}
                className="text-emerald-700 dark:text-emerald-200 px-2 py-0.5 rounded-md hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors duration-200"
              >
                {l.name} - {l.altitude}m 
              </Link>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">–</span>
          )}
        </div>
      </div>
    </div>
  );
}
