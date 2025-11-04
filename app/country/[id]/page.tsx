import { 
  get_country_by_id, 
  get_country_landings_takeoffs, 
  get_country_regions 
} from "@/app/api/get/get_places";

import ViewCountry from "./ViewCountry";
import MapGenerate from "@/app/components/map/MapGenerate";
import SearchForm from "@/app/search/SearchForm";
import SocialComponent from "@/app/components/social/SocialComponent";
import { notFound } from "next/navigation";

interface CountryPageProps {
  params: { id: string };
}
export const dynamic = "force-dynamic"; // forțează Server-Side Rendering


export default async function Country({ params }: CountryPageProps) {
  const id = Number(params.id);  

  // --- Obține țara ---
  const country = await get_country_by_id({ id });
  if (!country) notFound(); // Singurul caz de 404

  // --- Regiuni (dacă lipsesc → listă goală) ---
  const regionsRaw = await get_country_regions({ id }) ?? [];
  const regions = regionsRaw.map(r => ({
    ...r,
    description: r.description ?? undefined,
    bestSeason: r.bestSeason ?? [],
  }));

  // --- Takeoff + Landing (dacă lipsesc → liste goale) ---
  const sites = await get_country_landings_takeoffs({ id }) ?? { takeoff: [], landing: [] };

  // --- Determină lunile active ---
  const months = Array.from(new Set(regions.flatMap(r => r.bestSeason))).sort((a, b) => a - b);

  // --- Sezoane afișate ---
  const displaySeason = [
    { name: "Spring", emoji: "🌱", months: [3, 4, 5] },
    { name: "Summer", emoji: "☀️", months: [6, 7, 8] },
    { name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
    { name: "Winter", emoji: "❄️", months: [12, 1, 2] },
  ];
  const seasons = displaySeason.filter(s =>
    s.months.some(m => months.includes(m))
  );

  // --- Fallback descriere ---
  const countryDescriptionFallback = `
    <p class="text-xl font-semibold"><strong>Welcome to the paragliding guide for ${country.name}!</strong></p>
    <hr /><br />
    <p>
      We are currently working on adding detailed information about this country, 
      including descriptions, regions, takeoff and landing sites, and useful flying tips.
    </p>
    <p>
      Our goal is to provide the most accurate and helpful information for paragliding enthusiasts 
      exploring ${country.name}. However, this page is still under development.
    </p>
    <p>
      If you would like to help us improve this guide, you can leave a comment or send us an email. 
      Your contributions will help us identify the best takeoff and landing locations, 
      as well as provide useful insights for safe and enjoyable paragliding experiences in this country.
    </p>
    <p class="italic text-green-700 dark:text-green-400 font-medium">
      Together, we can create the ultimate guide for paragliding in ${country.name}! 
      Stay tuned for updates and thank you for your support.
    </p>
  `;

  // --- Normalizează valorile pentru TypeScript ---
  const countrySafe = {
    ...country,
    description: country.description ?? countryDescriptionFallback,
    latitude: country.latitude ?? undefined,
    longitude: country.longitude ?? undefined,
  };

  return (
    <div className="space-y-10">

      {/* Harta */}
      <div className="h-[30vh] rounded-xl overflow-hidden shadow-md">
        <MapGenerate
          center={countrySafe.longitude && countrySafe.latitude ? [countrySafe.latitude, countrySafe.longitude] : undefined}
        />
      </div>

      {/* Search */}
      <SearchForm select={{ country: countrySafe, region: regions }} />

      {/* ViewCountry */}
      <ViewCountry
        country={countrySafe}
        regions={regions}
        sites={sites}
        months={months}
        seasons={seasons}
      />

      {/* Social */}
      <SocialComponent
        selectedTipe="c"
        selectedId={id}
        selectedName={country.name}
      />

    </div>
  );
}
