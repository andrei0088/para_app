import MapGenerate from "@/app/components/map/MapGenerate";
import TopView from "@/app/components/dinamic/TopView";
import ViewTakeoffMap from "./ViewTakeoffMap";
import DisplayJsonTakeoff from "./DisplayJsonTakeoff";
import { Suspense } from "react";

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

export interface ViewTakeoffProps {
  takeoff: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    altitude: number | null;
    wind: string | null;
    description: string | null;
    map: string;
  };
  details: Details;
  maps: string[];
}

export default function ViewTakeoff({
  takeoff,
  details,
  maps,
}: ViewTakeoffProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${takeoff.latitude},${takeoff.longitude}`;
  const sendMaps = [details.region.map, ...maps].filter(Boolean);

  return (
    <section className="w-full mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        {/* === COL 1 — INFO === */}
        <div className="flex flex-col gap-4 px-5">
          <h1 className="text-3xl font-bold text-slate-700">
            {takeoff.name}
            {takeoff.wind && ` (${takeoff.wind})`}
            {takeoff.altitude && ` - ${takeoff.altitude} m`}
          </h1>

          <TopView component="t" id={takeoff.id} />

          <p className="text-slate-700">
            <span className="font-semibold">🗻 Altitude:</span>{" "}
            {takeoff.altitude ?? "-"} m
          </p>

          <p>
            <span className="font-semibold">📍 Coordinates:</span>{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-900 underline hover:text-indigo-800"
            >
              {takeoff.latitude.toFixed(6)}, {takeoff.longitude.toFixed(6)}
            </a>
          </p>

          <div className="h-[40vh] rounded-sm overflow-hidden">
            <MapGenerate
              center={[takeoff.latitude, takeoff.longitude]}
              zoom={11}
            />
          </div>
        </div>

        {/* === COL 2 — MAP + DESCRIPTION === */}
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full rounded-sm overflow-hidden">
            <Suspense
              fallback={
                <div className="text-gray-500">
                  Loading all great flying places...
                </div>
              }
            >
              <ViewTakeoffMap map={takeoff.map} maps={sendMaps} />
            </Suspense>
          </div>

          {takeoff.description && (
            <DisplayJsonTakeoff takeoff={takeoff.description} />
          )}
        </div>
      </div>
    </section>
  );
}
