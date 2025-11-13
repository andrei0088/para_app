import Link from "next/link";
import MapGenerate from "@/app/components/map/MapGenerate";
import TopView from "@/app/components/dinamic/TopView";
import ViewLandingMap from "./ViewLandingMap";

interface Landing {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  map: string | null;
  description: string; // garantat string
}

interface Country {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  map: string;
}

interface Details {
  country: Country;
  region: Region;
}

interface ViewLandingProps {
  landing: Landing;
  details: Details;
  maps: string[];
}

export default function ViewLanding({
  landing,
  details,
  maps,
}: ViewLandingProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${landing.latitude},${landing.longitude}`;
  const sendMaps = [details.region.map, ...maps];

  return (
    <section className="max-w-6xl mx-auto bg-white/70  backdrop-blur-md rounded-2xl shadow-md border border-gray-200  p-6 mb-6 transition-colors">
      {/* Breadcrumb */}
      <div className="mb-4 text-gray-600  text-sm">
        <Link
          href={`/country/${details.country.id}`}
          className="hover:underline text-green-700 "
        >
          {details.country.name}
        </Link>{" "}
        →{" "}
        <Link
          href={`/region/${details.region.id}`}
          className="hover:underline text-green-700 "
        >
          {details.region.name}
        </Link>{" "}
        → <span className="font-medium text-gray-900 ">{landing.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1 - Info + Map */}
        <div className="flex flex-col space-y-4 col-span-1">
          <h1 className="text-3xl font-bold text-green-700 ">{landing.name}</h1>

          <TopView component="l" id={landing.id} />

          <p className="text-gray-700 ">
            <span className="font-semibold">🗻 Altitude:</span>{" "}
            {landing.altitude} m
          </p>

          <p className="text-gray-700 ">
            <span className="font-semibold">📍 Coordinates:</span>{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600  underline hover:text-green-800 "
            >
              {landing.latitude.toFixed(6)}, {landing.longitude.toFixed(6)}
            </a>
          </p>

          <div className="mt-2 h-[40vh] rounded-xl overflow-hidden border border-gray-200  shadow-sm">
            <MapGenerate
              center={[landing.latitude, landing.longitude]}
              zoom={11}
            />
          </div>
        </div>

        {/* Col 2-3 - Description + Map */}
        <div className="col-span-2 flex flex-col gap-4">
          <ViewLandingMap map={landing.map || ""} maps={sendMaps} />
          <div
            className="prose prose-lg text-gray-700  leading-relaxed"
            dangerouslySetInnerHTML={{ __html: landing.description }}
          />
        </div>
      </div>
    </section>
  );
}
