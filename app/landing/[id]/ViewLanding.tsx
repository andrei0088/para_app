import Link from "next/link";
import MapGenerate from "@/app/components/map/MapGenerate";
import TopView from "@/app/components/dinamic/TopView";
import ViewLandingMap from "./ViewLandingMap";
import LandingDescription from "./LandingDescription";

interface Landing {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  map: string | null;
  description: string; // garantat string
}

interface Details {
  country: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    name: string;
    map: string;
    bestSeason: number[];
  };
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

  // Corectarea TypeScript: filtrăm valorile null
  const sendMaps: string[] = [details.region.map, ...maps].filter(
    (m): m is string => m !== null
  );
  // 4️⃣ Fallback descriere
  const landingDescriptionFallback = `
  <div class="prose prose-lg text-gray-800">
    <p class="text-2xl font-bold text-gray-900">This landing spot is coming soon!</p>
    
    <p>
      We are actively gathering comprehensive information about this paragliding landing site. Our goal is to provide you with detailed insights into nearby takeoffs, altitude, terrain, safety tips, weather conditions, and the best seasons to fly. Whether you are a beginner or an experienced pilot, we want to make sure you have all the essential data to plan a safe and enjoyable flight.
    </p>

    <p>
      At the moment, the landing’s full guide is not yet available, but we are working hard to collect verified and accurate details. Your contributions can help us create a more complete resource for the paragliding community.
    </p>

    <p class="italic text-blue-600 font-medium">
      If you have firsthand experience, photos, maps, or any information about this landing, please do not hesitate to 
      <a href="mailto:contact@paragliding-high.eu" class="text-blue-700 underline hover:text-blue-900">send us an email</a>. 
      Your help is invaluable and will ensure that other pilots can enjoy this location safely.
    </p>

    <p>
      We believe that sharing knowledge strengthens the paragliding community. Once all details are verified, this page will include step-by-step directions, takeoff points, landing zones, safety precautions, and seasonal tips for optimal flying.
    </p>

    <p class="mt-4 text-sm text-gray-500">
      Stay tuned for updates and start preparing for your next paragliding adventure! Bookmark this page and check back soon for the full guide.
    </p>
  </div>
`;

  return (
    <section className="w-full max-w-7xl mx-auto p-2   ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Col 1 - Info + Map */}
        <div className="flex flex-col space-y-4 col-span-1">
          <TopView component="l" id={landing.id} />

          <p className="text-gray-700">
            <span className="font-semibold">🗻 Altitude:</span>{" "}
            {landing.altitude} m
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">📍 Coordinates:</span>{" "}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-900  underline hover:text-indigo-800 "
            >
              {landing.latitude.toFixed(6)}, {landing.longitude.toFixed(6)}
            </a>
          </p>

          <div className="mt-2 h-[40vh] rounded-sm overflow-hidden ">
            <MapGenerate
              center={[landing.latitude, landing.longitude]}
              zoom={11}
            />
          </div>
        </div>

        {/* Col 2-3 - Description + Map */}
        <div className="col-span-2 flex flex-col gap-4">
          <ViewLandingMap map={landing.map || ""} maps={sendMaps} />
          {landing.description ? (
            <LandingDescription
              description={landing.description}
              name={landing.name}
            />
          ) : (
            <div
              className="prose prose-lg text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: landingDescriptionFallback }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
