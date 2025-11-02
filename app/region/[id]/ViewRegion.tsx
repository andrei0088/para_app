import Link from "next/link";
import Image from "next/image";
import map1 from "@/public/map1.jpeg"; // static import from public folder
import TopView from "@/app/components/dinamic/TopView";
import { notFound } from "next/navigation";
import JoinView from "@/app/components/dinamic/JoinView";
import ViewOnMap from "@/app/components/dinamic/ViewOnMap";


interface Takeoff {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  description?: string;
  regionId?: number;
  countryId?: number;
}

interface Landing {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  description?: string;
  regionId?: number;
  countryId?: number;
}

interface Region {
  id: number;
  name: string;
  description?: string;
  bestSeason?: number[];
  map?: string;
}

interface Country {
  id: number;
  name: string;
}

interface RegionSearchProps {
  country: Country;
  region: Region;
  takeoff: Takeoff[];
  landing: Landing[];
}

export default function ViewRegion({ country, region, takeoff, landing }: RegionSearchProps) {
  const Month = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <section className="max-w-6xl mx-auto my-10 p-8 bg-[#faf9f7] dark:bg-gray-900 rounded-2xl shadow-lg">
      {/* Titlu Țară și Regiune */}
      <div className="mb-8 border-b pb-4">
        <Link href={`/country/${country.id}`}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white hover:text-green-600 transition-colors">
            {country.name}
          </h1>
        </Link>
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mt-2">
          {region.name}
        </h2>

        {/* Lunile */}
        {region.bestSeason && region.bestSeason.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span className="font-medium text-gray-800 dark:text-gray-300">Best Season:</span>{" "}
            {region.bestSeason.map((m, i) => (
              <span key={m}>
                {Month[m - 1]}
                {i < region.bestSeason!.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Col 1 - Regiune Info (1/3) */}
        <div className="flex flex-col space-y-6 col-span-1">
                  <TopView component={"r"} id={region.id} />

          {/* Takeoffs */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Takeoffs:</h3>
            {takeoff.length > 0 ? (
              <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                {takeoff.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/takeoff/${t.id}`}
                      className="hover:text-green-600 dark:hover:text-green-400"
                    >
                      {t.name} - {t.altitude}m
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No takeoffs available.
              </p>
            )}
          </div>

          {/* Landings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Landings:</h3>
            {landing.length > 0 ? (
              <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                {landing.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/landing/${l.id}`}
                      className="hover:text-green-600 dark:hover:text-green-400"
                    >
                      {l.name} - {l.altitude}m
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No landings available.
              </p>
            )}
          </div>
        
            <JoinView />
        <ViewOnMap country={country.id} region={region.id} name={region.name} />
          {/* Placeholder pentru imagini */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-48 border border-dashed border-gray-300 dark:border-gray-600 relative overflow-hidden">
            {region.map ? <Image
  src={`/maps/${region.map}`}
  alt="Map"
  fill
  sizes="(max-width: 1024px) 100vw, 1024px"
  style={{ objectFit: "cover" }}
  priority
/> : 
<Image
  src={map1}
  alt="Map"
  fill
  sizes="(max-width: 1024px) 100vw, 1024px"
  style={{ objectFit: "cover" }}
  priority
/>

 }
          </div>
        </div>

        {/* Col 2–3 - Descriere Regiune */}
        <div className="col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm prose prose-lg dark:prose-invert text-gray-800 dark:text-gray-200 leading-relaxed">
           {region.map && (
  <div className="w-full max-w-full rounded-xl overflow-hidden">
    <Image
      src={`/maps/${region.map}`}
      alt="Map"
      width={800}   // sau dimensiunea dorită
      height={600}  // păstrează proporțiile imaginii
      style={{ objectFit: "contain" }}
      priority
    />
  </div>
)}

  <div dangerouslySetInnerHTML={{ __html: region.description || notFound()}} />
</div>

        </div>
      </div>
    </section> 
  );
}
