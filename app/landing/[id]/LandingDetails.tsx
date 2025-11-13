import Link from "next/link";

interface Site {
  id: number;
  name: string;
  altitude?: number | null;
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

  const bestSeason = details.region.bestSeason?.length
    ? details.region.bestSeason.map((m) => Month[m - 1]).join(", ")
    : "N/A";

  return (
    <section className="w-full max-w-7xl mx-auto my-4 p-6 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/60 rounded-2xl shadow-md transition-colors">
      {/* === HEADER: Region / Country / Best Season === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
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
            · 🌤️ Best season:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {bestSeason}
            </span>
          </span>
        </div>
      </div>

      {/* === TAKEOFF / LANDING LIST === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Takeoffs */}
        <div>
          <h3 className="font-medium text-blue-600 dark:text-blue-300 mb-2 flex items-center gap-2">
            🛫 Takeoffs
          </h3>
          {sites.takeoff.length ? (
            <ul className="flex flex-col gap-1">
              {sites.takeoff.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/takeoff/${t.id}`}
                    className="block px-3 py-1 rounded-md hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    {t.name}
                    {t.altitude ? ` – ${t.altitude}m` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              No takeoffs available
            </span>
          )}
        </div>

        {/* Landings */}
        <div>
          <h3 className="font-medium text-emerald-600 dark:text-emerald-300 mb-2 flex items-center gap-2">
            🛬 Landings
          </h3>
          {sites.landing.length ? (
            <ul className="flex flex-col gap-1">
              {sites.landing.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/landing/${l.id}`}
                    className="block px-3 py-1 rounded-md hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors"
                  >
                    {l.name}
                    {l.altitude ? ` – ${l.altitude}m` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              No landings available
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
