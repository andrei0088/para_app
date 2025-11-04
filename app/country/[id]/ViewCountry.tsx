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
    <section className="max-w-6xl mx-auto my-10 p-8 bg-[#faf9f7] dark:bg-gray-900 rounded-2xl shadow-lg">
  {/* Titlu țară */}
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2">
    {country.name}
  </h1>

  {/* layout principal */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* --- STÂNGA: Sezoane, luni, regiuni, hartă --- */}
    <div className="col-span-1 flex flex-col space-y-6">
      {/* Sezoane */}
      <div className="flex flex-wrap gap-2">
        {seasons.map((s, idx) => (
          <span key={idx} className="flex items-center gap-1 text-gray-800 dark:text-gray-200 font-semibold">
            <span>{s.emoji}</span>
            <span>{s.name}</span>
          </span>
        ))}
      </div>

      {/* Lunile active */}
      <div className="flex flex-wrap gap-2">
        {months.map((m) => (
          <span key={m} className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {MonthNames[m - 1]}
          </span>
        ))}
      </div>

      {/* Top view (like section) */}
      <TopView component="c" id={country.id} />

      {/* Lista regiunilor */}
      <div className="space-y-6">
<<<<<<< HEAD
        {regions && regions.map((r) => {
=======
        {regions.map((r) => {
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
          const bestMonths = r.bestSeason ?? [];
          return (
            <div
              key={r.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <Link href={`/region/${r.id}`}>
                <h3 className="text-xl font-semibold text-green-600 hover:underline mb-2">{r.name}</h3>
              </Link>

              {bestMonths.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-medium text-gray-800 dark:text-gray-300">When to go:</span>{" "}
                  {bestMonths.map((m, i) => (
                    <span key={m}>
                      {MonthNames[m - 1]}
                      {i < bestMonths.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              )}

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Takeoffs:</span>{" "}
                {sites.takeoff.filter((t) => t.regionId === r.id).length}
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Landings:</span>{" "}
                {sites.landing.filter((l) => l.regionId === r.id).length}
              </p>
            </div>
          );
        })}
      </div>
      <JoinView />
      <ViewOnMap country={country.id} region={''} name={country.name} />
      

      {/* Imagine jos */}
      <div className="relative rounded-xl h-48 border border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
        <Image src={map2} alt="Map" fill style={{ objectFit: "cover" }} priority />
      </div>
    </div>

    {/* --- DREAPTA: Descriere --- */}
    <div className="col-span-2">
      <div
        className="prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: country.description ?? notFound() }}
      />
    </div>
  </div>
</section>

  );
}
