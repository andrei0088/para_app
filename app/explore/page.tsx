import Link from "next/link";
import { get_all_country, get_all_regions } from "../api/get/get_places";

const MonthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const displaySeason = [
  { id: 1, name: "Spring", emoji: "🌱" },
  { id: 2, name: "Summer", emoji: "☀️" },
  { id: 3, name: "Autumn", emoji: "🍂" },
  { id: 4, name: "Winter", emoji: "❄️" },
];

export default async function Explore() {
  const countrys = await get_all_country();
  const regions = await get_all_regions();

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 space-y-6">
      <h1 className="text-3xl font-bold">What do you want to search?</h1>

      {/* Select a Country */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Select a Country</h2>
        <div className="flex flex-wrap gap-2 text-blue-600">
          {countrys.map((c) => (
            <Link
              key={`c-${c.id}`}
              href={`/country/${c.id}`}
              className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-200 transition"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Select a Region */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Select a Region</h2>
        <div className="flex flex-wrap gap-2 text-purple-600">
          {regions.map((r) => (
            <Link
              key={`r-${r.id}`}
              href={`/region/${r.id}`}
              className="px-3 py-1 rounded bg-purple-100 hover:bg-purple-200 transition"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Select a Season */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Select a Season</h2>
        <div className="flex flex-wrap gap-2">
          {displaySeason.map((s) => (
            <Link
              key={`s-${s.id}`}
              href={`/seson/${s.id}`}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 hover:bg-green-200 transition"
            >
              <span>{s.emoji}</span>
              <span>{s.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Select a Month */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Select a Month</h2>
        <div className="flex flex-wrap gap-2">
          {MonthNames.map((m, idx) => (
            <Link
              key={`m-${idx + 1}`}
              href={`/month/${idx + 1}`}
              className="px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 transition"
            >
              {m}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
