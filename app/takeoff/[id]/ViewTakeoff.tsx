import Link from "next/link";
import MapGenerate from "@/app/components/map/MapGenerate";
import TopView from "@/app/components/dinamic/TopView";
import ViewTakeoffMap from "./ViewTakeoffMap";
import DisplayJsonTakeoff from "./DisplayJsonTakeoff";
import { Suspense } from "react";

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
    <section className="w-full max-w-7xl mx-auto p-2  ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1 - Info + Harta */}
        <div className="flex flex-col space-y-4 col-span-1">
          <TopView component="t" id={takeoff.id} />

          <p className="text-slate-700 ">
            <span className="font-semibold">🗻 Altitude:</span>{" "}
            {takeoff.altitude} m
          </p>

          <p className=" ">
            <span className="font-semibold">📍 Coordinates:</span>{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-900  underline hover:text-indigo-800 "
            >
              {takeoff.latitude.toFixed(6)}, {takeoff.longitude.toFixed(6)}
            </a>
          </p>

          <div className="mt-2 h-[40vh] rounded-sm overflow-hidden ">
            <MapGenerate
              center={[takeoff.latitude, takeoff.longitude]}
              zoom={11}
            />
          </div>
        </div>

        {/* Col 2-3 - Descriere + Map */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="w-full rounded-sm overflow-hidden mb-5">
            <Suspense
              fallback={
                <div className="text-gray-500">
                  Loading all grate flying places...
                </div>
              }
            >
              <ViewTakeoffMap map={takeoff.map} maps={sendMaps} />
            </Suspense>
          </div>
          <DisplayJsonTakeoff
            takeoff={takeoff.description}
            name={takeoff.name}
            wind={takeoff.wind || null}
            altitude={takeoff.altitude || null}
          />
        </div>
      </div>
    </section>
  );
}
