import shuttle from "@/public/icons/buss.png";
import cablecar from "@/public/icons/cable.png";
import car from "@/public/icons/car.png";
import hike from "@/public/icons/hike.png";
import Image from "next/image";
import Link from "next/link";

export default function DisplayJsonRegion({
  descriptionJson,
}: {
  descriptionJson: string;
}) {
  let parsedJson = null;
  try {
    parsedJson = JSON.parse(descriptionJson);
  } catch (e) {
    console.error("Invalid JSON in region description", e);
    const fallbackDescription = `
    <p class="text-xl font-semibold">Explore this amazing region!</p>
    <p>
      This page is under development, but soon you’ll find detailed insights about paragliding spots, takeoff and landing locations, ideal flying seasons, and safety tips specific to this region.
    </p>
    <p class="italic text-blue-700  font-medium">
      Stay tuned for updates and start planning your next paragliding adventure here!
    </p>
  `;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: fallbackDescription,
        }}
      />
    );
  }

  return (
    <div className="w-full md:w-3/4 px-2 my-4">
      <h1 className="text-2xl font-bold">{parsedJson.title}</h1>
      <h2 className="text-lg text-gray-500 mb-4">{parsedJson.subtitle}</h2>

      {/* Overview */}
      {parsedJson.overview && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Overview:</h2>
          <p>{parsedJson.overview}</p>
        </div>
      )}

      {/* Transport */}
      {parsedJson.transport && (
        <div className="mb-6">
          <div className="flex gap-2 py-2 items-center">
            <h2 className="text-xl font-semibold mb-2 ">Transport:</h2>

            {parsedJson.transport?.cable && (
              <Image src={cablecar} alt="Cable Car" width={32} height={32} />
            )}
            {parsedJson.transport?.shuttle && (
              <Image src={shuttle} alt="Shuttle" width={32} height={32} />
            )}
            {parsedJson.transport?.car && (
              <Image src={car} alt="Car" width={32} height={32} />
            )}
            {parsedJson.transport?.hike && (
              <Image src={hike} alt="Hike" width={32} height={32} />
            )}
          </div>
          <p>{parsedJson.transport?.text || ""}</p>
        </div>
      )}

      {/* Flying conditions */}
      {parsedJson.fly && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Flying conditions:</h2>
          <p>{parsedJson.fly}</p>
        </div>
      )}
      {/* Local Rules */}
      {parsedJson.roules && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Local Rules:</h2>
          <p>{parsedJson.roules}</p>
        </div>
      )}
      {/* Link */}
      {parsedJson.link?.name && (
        <div className="mb-6 flex items-center gap-2">
          <h2 className="text-xl font-semibold mb-2">More information:</h2>
          <Link
            href={parsedJson.link.url || "#"}
            target="_blank"
            className="text-blue-800 underline"
          >
            {parsedJson.link.name}
          </Link>
        </div>
      )}
    </div>
  );
}
