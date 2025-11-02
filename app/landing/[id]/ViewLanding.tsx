import Link from "next/link";
import MapGenerate from "@/app/components/map/MapGenerate";
import TopView from "@/app/components/dinamic/TopView";

interface Landing {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description: string; // garantat string
}

interface Country {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
}

interface Details {
  country: Country;
  region: Region;
}

interface ViewLandingProps {
  landing: Landing;
  details: Details;
}

export default function ViewLanding({ landing, details }: ViewLandingProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${landing.latitude},${landing.longitude}`;

  return (
    <section className="max-w-6xl mx-auto bg-[#faf9f7] dark:bg-gray-900 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-gray-600 dark:text-gray-400 text-sm">
        <Link
          href={`/country/${details.country.id}`}
          className="hover:underline text-green-700 dark:text-green-400"
        >
          {details.country.name}
        </Link>{" "}
        →{" "}
        <Link
          href={`/region/${details.region.id}`}
          className="hover:underline text-green-700 dark:text-green-400"
        >
          {details.region.name}
        </Link>{" "}
        → <span className="font-medium text-gray-900 dark:text-gray-100">{landing.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1 - Info + hartă */}
        <div className="flex flex-col space-y-4 col-span-1">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
            {landing.name}
          </h1>

          <TopView component={"l"} id={landing.id} />

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">🗻 Altitude:</span> {landing.altitude} m
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">📍 Coordinates:</span>{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-300"
            >
              {landing.latitude.toFixed(6)}, {landing.longitude.toFixed(6)}
            </a>
          </p>

          <div className="mt-2 h-[40vh] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <MapGenerate center={[landing.latitude, landing.longitude]} zoom={11} />
          </div>
        </div>

        {/* Col 2-3 - Descriere */}
        <div className="col-span-2 prose prose-lg dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: landing.description }} />
        </div>
      </div>
    </section>
  );
}
