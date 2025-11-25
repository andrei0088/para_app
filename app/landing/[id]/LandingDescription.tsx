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
    <section className="w-full max-w-6xl mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 transition-colors space-y-6">
      {/* Nume */}
      <h1 className="text-3xl font-bold text-green-700">{name}</h1>

      {/* Descriere */}
      {landing.description && (
        <section className="prose prose-lg text-gray-800 dark:text-gray-200">
          <p>{landing.description}</p>
        </section>
      )}

      {/* Access */}
      {landing.access && (
        <section className="text-gray-700">
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
        <section className="text-gray-700">
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
        <section className="text-gray-700">
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
        <section className="text-gray-700">
          <h2 className="text-lg font-semibold">Notes</h2>
          <p>{landing.notes}</p>
        </section>
      )}
    </section>
  );
}
