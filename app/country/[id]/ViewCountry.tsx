import Link from "next/link";
import Image from "next/image";
import map2 from "@/public/map2.jpeg";
import type { Country, Region, Sites } from "@/app/types";
import TopView from "@/app/components/dinamic/TopView";
import { notFound } from "next/navigation";
import JoinView from "@/app/components/dinamic/JoinView";
import ViewOnMap from "@/app/components/dinamic/ViewOnMap";

interface CountrySearchProps {
  country: Country;
  regions: Region[];
  sites: Sites;
  months: number[];
  seasons: { name: string; emoji: string; months: number[] }[];
}

export default function ViewCountry({ country, regions, sites, months, seasons }: CountrySearchProps) {
  const MonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <section className="max-w-6xl mx-auto my-10 p-6 md:p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
  {/* Titlu țară */}
  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
    {country.name}
  </h1>

  {/* Layout principal */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
    {/* --- Dreapta devine prima pe mobil --- */}
    <div className="col-span-1 lg:col-span-2 order-1 lg:order-2">
      <div
        className="prose prose-sm md:prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: country.description ?? notFound() }}
      />
    </div>

    {/* --- Stânga: Sezoane, luni, regiuni, hartă --- */}
    <div className="col-span-1 order-2 lg:order-1 flex flex-col space-y-4 md:space-y-6">
      {/* Sezoane */}
      <div className="flex flex-wrap gap-2">
        {seasons.map((s, idx) => (
          <span key={idx} className="flex items-center gap-1 text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base">
            <span>{s.emoji}</span>
            <span>{s.name}</span>
          </span>
        ))}
      </div>

      {/* Lunile active */}
      <div className="flex flex-wrap gap-2">
        {months.map((m) => (
          <span key={m} className="text-gray-600 dark:text-gray-400 font-medium text-xs md:text-sm">
            {MonthNames[m - 1]}
          </span>
        ))}
      </div>

      {/* Top view */}
      <TopView component="c" id={country.id} />

      {/* Lista regiunilor */}
      <div className="space-y-4 md:space-y-6">
        {regions.map((r) => {
          const bestMonths = r.bestSeason ?? [];
          return (
            <div
              key={r.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
            >
              <Link href={`/region/${r.id}`}>
                <h3 className="text-lg md:text-xl font-semibold text-green-600 hover:underline mb-2">{r.name}</h3>
              </Link>

              {bestMonths.length > 0 && (
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="font-medium text-gray-800 dark:text-gray-300">When to go:</span>{" "}
                  {bestMonths.map((m, i) => (
                    <span key={m}>
                      {MonthNames[m - 1]}
                      {i < bestMonths.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Takeoffs:</span> {sites.takeoff.filter((t) => t.regionId === r.id).length}
              </p>

              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Landings:</span> {sites.landing.filter((l) => l.regionId === r.id).length}
              </p>
            </div>
          );
        })}
      </div>

      <JoinView />
      <ViewOnMap country={country.id} region={''} name={country.name} />

      {/* Imagine jos */}
      <div className="relative rounded-xl h-40 md:h-48 border border-dashed border-gray-300 dark:border-gray-600 overflow-hidden mt-4">
        <Image src={map2} alt="Map" fill style={{ objectFit: "cover" }} priority />
      </div>
    </div>
  </div>
</section>



  );
}
