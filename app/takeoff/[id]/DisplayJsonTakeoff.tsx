import parking from "@/public/icons/parking.png";
import bus from "@/public/icons/buss.png";
import cablecar from "@/public/icons/cable.png";
import shuttle from "@/public/icons/shuttle.png";
import camping from "@/public/icons/camping.png";
import toilet from "@/public/icons/toilet.png";
import food from "@/public/icons/fast.png";
import Image from "next/image";

interface TakeoffDescriptionProps {
  takeoff: string | null;
  name: string;
}

export default function DisplayJsonTakeoff({
  takeoff,
  name,
}: TakeoffDescriptionProps) {
  // Fallback HTML text
  const fallback = `
    <p class="text-xl font-semibold">Discover this amazing takeoff spot!</p>
    <p>Detailed info about this takeoff, ideal flying conditions, nearby landing sites, and safety tips will be available soon.</p>
    <p class="italic text-blue-700 font-medium">Stay tuned for full updates and get ready for your next paragliding adventure!</p>
  `;

  // Dacă lipsesc datele → fallback
  if (!takeoff || takeoff.trim() === "") {
    return <div dangerouslySetInnerHTML={{ __html: fallback }} />;
  }

  // Încearcă parsarea JSON
  let parsed = null;
  try {
    parsed = JSON.parse(takeoff);
  } catch (e) {
    console.error("Invalid JSON in takeoff description", e);
    return <div dangerouslySetInnerHTML={{ __html: fallback }} />;
  }

  const take = parsed;

  const boolToText = (value: boolean | undefined) =>
    value === true ? "Yes" : value === false ? "No" : "No information";

  const textOrFallback = (value: string | undefined) =>
    value ? value : "No information";

  return (
    <section className="w-full max-w-6xl mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 transition-colors space-y-6">
      {/* Name */}
      <h1 className="text-3xl font-bold text-green-700">{name}</h1>

      {/* Icons */}
      <div className="flex gap-2">
        {take.access?.parking && (
          <Image src={parking} alt="Parking Icon" width={32} height={32} />
        )}

        {take.access?.cableToTakeoff && (
          <Image src={cablecar} alt="Cablecar" width={32} height={32} />
        )}
        {take.access?.shuttleToTakeoff && (
          <Image src={bus} alt="Shuttle" width={32} height={32} />
        )}
      </div>

      {/* Description */}
      {take.description && (
        <section className="prose prose-lg text-gray-800 dark:text-gray-200">
          <p>{take.description}</p>
        </section>
      )}

      {/* Access */}
      {take.access && (
        <section className="text-gray-700">
          <h2 className="text-lg font-semibold">Access</h2>
          <ul className="list-disc list-inside">
            <li>Parking: {boolToText(take.access.parking)}</li>
            <li>
              Road Conditions: {textOrFallback(take.access.roadConditions)}
            </li>
            <li>
              Shuttle to Takeoff: {boolToText(take.access.shuttleToTakeoff)}
            </li>
            <li>Cable to Takeoff: {boolToText(take.access.cableToTakeoff)}</li>
            <li> {textOrFallback(take.access.notes)}</li>
          </ul>
        </section>
      )}

      {/* Facilities */}
      <section>
        {take.contactWebsite && (
          <>
            Contact Website:{" "}
            <a
              href={take.contactWebsite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {take.contactWebsite.name}
            </a>
          </>
        )}
      </section>

      {/* takeoffDifficulty */}
      {take.takeoffDifficulty && (
        <section className="text-gray-700">
          Takeoff Difficulty: {textOrFallback(take.takeoffDifficulty)}
        </section>
      )}

      {/* Notes */}
      {take.notes && (
        <section className="text-gray-700">
          <h2 className="text-lg font-semibold">Notes</h2>
          <p>{take.notes}</p>
        </section>
      )}
    </section>
  );
}
