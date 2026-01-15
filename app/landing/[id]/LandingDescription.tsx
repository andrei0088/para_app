import parking from "@/public/icons/parking.png";
import bus from "@/public/icons/buss.png";
import cablecar from "@/public/icons/cable.png";
import shuttle from "@/public/icons/shuttle.png";
import camping from "@/public/icons/camping.png";
import toilet from "@/public/icons/toilet.png";
import food from "@/public/icons/fast.png";
import Image from "next/image";

interface LandingDescriptionProps {
  description: string | null;
  name: string;
}

export default function LandingDescription({
  description,
  name,
}: LandingDescriptionProps) {
  if (!description) return null;

  const landing =
    typeof description === "string" ? JSON.parse(description) : description;

  const boolToText = (value: boolean | undefined) =>
    value === true ? "Yes" : value === false ? "No" : "No information";

  const textOrFallback = (value: string | undefined) =>
    value ? value : "No information";

  return (
    <section className="w-full p-6  ">
      {/* Iconuri pentru facilitati: */}
      <div className="flex gap-2">
        {landing.access.parking && (
          <Image src={parking} alt="Parking Icon" width={32} height={32} />
        )}
        {landing.access.publicTransport && (
          <Image src={bus} alt="public transport" width={32} height={32} />
        )}
        {landing.access.cableToTakeoff && (
          <Image src={cablecar} alt="cablecar" width={32} height={32} />
        )}
        {landing.access.shuttleToTakeoff && (
          <Image src={shuttle} alt="shuttle" width={32} height={32} />
        )}

        {landing.facilities.toilets && (
          <Image src={toilet} alt="Toilets" width={32} height={32} />
        )}
        {landing.facilities.foodNearby && (
          <Image src={food} alt="Food facility" width={32} height={32} />
        )}
        {landing.facilities.camping && (
          <Image src={camping} alt="camping" width={32} height={32} />
        )}
      </div>

      {/* Descriere */}
      {landing.description && (
        <section className="prose prose-lg ">
          <p>{landing.description}</p>
        </section>
      )}

      {/* Access */}
      {landing.access && (
        <section className="">
          <h2 className="text-lg font-semibold">Access</h2>
          <ul className="list-disc list-inside">
            <li>Parking: {boolToText(landing.access.parking)}</li>
            <li>
              Road Conditions: {textOrFallback(landing.access.roadConditions)}
            </li>
            <li>
              Public Transport: {boolToText(landing.access.publicTransport)}
            </li>
            <li>
              Shuttle to Takeoff: {boolToText(landing.access.shuttleToTakeoff)}
            </li>
            <li>
              Cable to Takeoff: {boolToText(landing.access.cableToTakeoff)}
            </li>
            <li>Notes: {textOrFallback(landing.access.notes)}</li>
          </ul>
        </section>
      )}

      {/* Facilities */}
      {landing.facilities && (
        <section className="">
          <h2 className="text-lg font-semibold">Facilities</h2>
          <ul className="list-disc list-inside">
            <li>Toilets: {boolToText(landing.facilities.toilets)}</li>
            <li>Food Nearby: {boolToText(landing.facilities.foodNearby)}</li>
            <li>Camping: {boolToText(landing.facilities.camping)}</li>
            <li>
              Contact Website:{" "}
              {landing.facilities.contactWebsite ? (
                <a
                  href={landing.facilities.contactWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {landing.facilities.contactWebsite}
                </a>
              ) : (
                "No information"
              )}
            </li>
          </ul>
        </section>
      )}

      {/* Safety */}
      {landing.safety && (
        <section className="">
          <h2 className="text-lg font-semibold">Safety</h2>
          <ul className="list-disc list-inside">
            <li>
              Landing Difficulty:{" "}
              {textOrFallback(landing.safety.landingDifficulty)}
            </li>
            <li>
              Common Hazards:{" "}
              {landing.safety.commonHazards
                ? landing.safety.commonHazards.join(", ")
                : "No information"}
            </li>
            <li>Notes: {textOrFallback(landing.safety.notes)}</li>
          </ul>
        </section>
      )}

      {/* Notes */}
      {landing.notes && (
        <section className="">
          <h2 className="text-lg font-semibold">Notes</h2>
          <p>{landing.notes}</p>
        </section>
      )}
    </section>
  );
}
