export default async function ParaglidingRisk() {
  const foehnPlaces = ["Annecy","Aosta","Zurich","Como","Innsbruck","Bolzano"];
  const mistralPlaces = ["Lyon","Marseille"];
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const ApiKey = process.env.OPENWEATHER_API_KEY;

  if (!ApiKey) return <p>⚠️ API Key missing!</p>;

  // Fetch all pressures
  const data = await Promise.all(
    [...foehnPlaces, ...mistralPlaces].map(async (city) => {
      const res = await fetch(`${urlBase}?q=${city}&appid=${ApiKey}&units=metric`, { next: { revalidate: 3600 } });
      const json = await res.json();
      return json.cod === 200 ? json : { main: { pressure: null }, name: city };
    })
  );

  // Calculate risk based on pressure difference
  const calcRisk = (delta: number | null) => {
    if (delta === null) return { text: "N/A", color: "text-gray-600", severity: "Unknown" };
    const absDelta = Math.abs(delta);

    if (absDelta > 10) return { text: "🛑 High", color: "text-red-600", severity: "⚠️ Unsafe for paragliding" };
    if (absDelta > 5) return { text: "⚠️ Moderate", color: "text-yellow-600", severity: "⚠️ Caution advised" };
    return { text: "✅ Low", color: "text-green-600", severity: "✅ Safe for flying" };
  };

  const calcDirection = (delta: number | null, type: "foehn" | "mistral") => {
    if (delta === null || delta === 0) return "Calm 🌬";
    if (type === "foehn") return delta > 0 ? "North ⬇️" : "South ⬆️";
    if (type === "mistral") return delta > 0 ? "NW ⬇️" : "SE ⬆️";
  };

  // Foehn pairs
  const foehnPairs = [
    { name: "Annecy-Aosta", i1: 0, i2: 1 },
    { name: "Zurich-Como", i1: 2, i2: 3 },
    { name: "Innsbruck-Bolzano", i1: 4, i2: 5 },
  ];

  // Mistral pairs
  const mistralPairs = [
    { name: "Lyon-Annecy", i1: 6, i2: 0 },
    { name: "Marseille-Aosta", i1: 7, i2: 1 },
  ];

  return (
   <div className="space-y-2 text-sm px-2 md:px-4">
  <h2 className="font-bold text-gray-800 dark:text-gray-100">Paragliding Wind Risk</h2>

  <h3 className="font-semibold text-gray-700 dark:text-gray-200">Foehn:</h3>
  {foehnPairs.map((pair) => {
    const p1 = data[pair.i1]?.main?.pressure;
    const p2 = data[pair.i2]?.main?.pressure;
    const delta = p1 !== null && p2 !== null ? p1 - p2 : null;
    const risk = calcRisk(delta);
    const direction = calcDirection(delta, "foehn");

    return (
      <p key={pair.name} className={`${risk.color} text-sm`}>
        {pair.name}: ΔP = {delta !== null ? delta.toFixed(1) : "N/A"} hPa → {risk.text} | {direction} | {risk.severity}
      </p>
    );
  })}

  <h3 className="font-semibold mt-2 text-gray-700 dark:text-gray-200">Mistral:</h3>
  {mistralPairs.map((pair) => {
    const p1 = data[pair.i1]?.main?.pressure;
    const p2 = data[pair.i2]?.main?.pressure;
    const delta = p1 !== null && p2 !== null ? p1 - p2 : null;
    const risk = calcRisk(delta);
    const direction = calcDirection(delta, "mistral");

    return (
      <p key={pair.name} className={`${risk.color} text-sm`}>
        {pair.name}: ΔP = {delta !== null ? delta.toFixed(1) : "N/A"} hPa → {risk.text} | {direction} | {risk.severity}
      </p>
    );
  })}
</div>

  );
}
