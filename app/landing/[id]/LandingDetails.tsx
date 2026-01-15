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
    <section className="w-full p-2  ">
      {/* === HEADER: Region / Country / Best Season === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-3 text-gray-900  font-medium tracking-tight">
          <span className="text-lg font-semibold">
            🪂{" "}
            <Link
              href={`/region/${details.region.id}`}
              className="hover:underline hover:text-slate-600  transition-colors"
            >
              {details.region.name}
            </Link>
          </span>
          <span className="text-gray-800 ">
            ·{" "}
            <Link
              href={`/country/${details.country.id}`}
              className="hover:underline hover:text-slate-600  transition-colors"
            >
              {details.country.name}
            </Link>
          </span>
          <span className="text-slate-500 ">
            · 🌤️ Best season:{" "}
            <span className="font-medium text-slate-700 ">{bestSeason}</span>
          </span>
        </div>
      </div>

      {/* === TAKEOFF / LANDING LIST === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Takeoffs */}
        <div>
          <h3 className="font-medium text-slate-600  mb-2 flex items-center gap-2">
            🛫 Takeoffs
          </h3>
          {sites.takeoff.length ? (
            <ul className="flex flex-col gap-1">
              {sites.takeoff.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/takeoff/${t.id}`}
                    className="block px-3 py-1 rounded-sm hover:bg-slate-100/60  transition-colors"
                  >
                    {t.name}
                    {t.altitude ? ` – ${t.altitude}m` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-800 ">No takeoffs available</span>
          )}
        </div>

        {/* Landings */}
        <div>
          <h3 className="font-medium text-stone-600  mb-2 flex items-center gap-2">
            🛬 Landings
          </h3>
          {sites.landing.length ? (
            <ul className="flex flex-col gap-1">
              {sites.landing.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/landing/${l.id}`}
                    className="block px-3 py-1 rounded-md hover:bg-stone-100/60  transition-colors"
                  >
                    {l.name}
                    {l.altitude ? ` – ${l.altitude}m` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-800 ">No landings available</span>
          )}
        </div>
      </div>
    </section>
  );
}
