import Link from "next/link";
import MapGenerate from "@/app/components/map/MapGenerate";
import TopView from "@/app/components/dinamic/TopView";
import ViewTakeoffMap from "./ViewTakeoffMap";
import DisplayJsonTakeoff from "./DisplayJsonTakeoff";

interface Takeoff {
  id: number;
  name: string;
  map: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description: string | null;
  wind?: string;
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

interface ViewTakeoffProps {
  takeoff: Takeoff;
  details: Details;
  maps: string[];
}

export default function ViewTakeoff({
  takeoff,
  details,
  maps,
}: ViewTakeoffProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${takeoff.latitude},${takeoff.longitude}`;
  const sendMaps = [details.region.map, ...maps];

  return (
    <section className="max-w-6xl mx-auto bg-white/70  backdrop-blur-md rounded-2xl shadow-md border border-gray-200  p-6 mb-6 transition-colors">
      {/* Breadcrumb */}
      <div className="mb-4 text-gray-600  text-sm">
        <Link
          href={`/country/${details.country.id}`}
          className="hover:underline text-blue-700 "
        >
          {details.country.name}
        </Link>{" "}
        →{" "}
        <Link
          href={`/region/${details.region.id}`}
          className="hover:underline text-blue-700 "
        >
          {details.region.name}
        </Link>{" "}
        → <span className="font-medium text-gray-900">{takeoff.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1 - Info + Harta */}
        <div className="flex flex-col space-y-4 col-span-1">
          <h1 className="text-3xl font-bold text-blue-700 ">
            {takeoff.name} ({takeoff.wind})
          </h1>

          <TopView component="t" id={takeoff.id} />

          <p className="text-gray-700 ">
            <span className="font-semibold">🗻 Altitude:</span>{" "}
            {takeoff.altitude} m
          </p>

          <p className="text-gray-700 ">
            <span className="font-semibold">📍 Coordinates:</span>{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600  underline hover:text-blue-800 "
            >
              {takeoff.latitude.toFixed(6)}, {takeoff.longitude.toFixed(6)}
            </a>
          </p>

          <div className="mt-2 h-[40vh] rounded-xl overflow-hidden border border-gray-200  shadow-sm">
            <MapGenerate
              center={[takeoff.latitude, takeoff.longitude]}
              zoom={11}
            />
          </div>
        </div>

        {/* Col 2-3 - Descriere + Map */}
        <div className="col-span-2 flex flex-col gap-4">
          <ViewTakeoffMap map={takeoff.map} maps={sendMaps} />
          <DisplayJsonTakeoff
            takeoff={takeoff.description}
            name={takeoff.name}
          />
        </div>
      </div>
    </section>
  );
}
