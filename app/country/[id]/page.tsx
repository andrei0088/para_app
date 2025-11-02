import { 
  get_country_by_id, 
  get_country_landings_takeoffs, 
  get_country_regions 
} from "@/app/api/get/get_places";
import ViewCountry from "./ViewCountry";
import calculateGPSCenter from "@/app/components/map/functions/calculateGPSCenter";
import MapGenerate from "@/app/components/map/MapGenerate";
import SearchForm from "@/app/search/SearchForm";
import { notFound } from "next/navigation";
import SocialComponent from "@/app/components/social/SocialComponent";

interface CountryPageProps {
  params: { id: string };
}

export default async function Country({ params }: CountryPageProps) {
  const id = Number(params.id);

  // --- Obține datele principale ---
  const country = await get_country_by_id({ id });
  if (!country) notFound();

  const regionsRaw = await get_country_regions({ id });
  if (!regionsRaw || regionsRaw.length === 0) notFound();

  const sites = await get_country_landings_takeoffs({ id });
  if (!sites || (!sites.takeoff.length && !sites.landing.length)) notFound();

  // --- Normalizează datele ---
  const regions = regionsRaw.map(r => ({
    ...r,
    description: r.description ?? undefined,
    bestSeason: r.bestSeason ?? [],
  }));


  // --- Determină lunile active (simplificat) ---
  const months = Array.from(
    new Set(regions.flatMap(r => r.bestSeason))
  ).sort((a, b) => a - b);

  // --- Sezoanele de afișat ---
  const displaySeason = [
    { name: "Spring", emoji: "🌱", months: [3, 4, 5] },
    { name: "Summer", emoji: "☀️", months: [6, 7, 8] },
    { name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
    { name: "Winter", emoji: "❄️", months: [12, 1, 2] },
  ];

  const seasons = displaySeason.filter(s =>
    s.months.some(m => months.includes(m))
  );

  const countryDescriptionFallback = `
  <p class="text-xl font-semibold">
    Welcome to our upcoming guide on paragliding destinations in ${country.name}!
  </p>
  <p>
    This page is currently under development, but soon you will find detailed information about the best takeoff and landing sites, ideal flying seasons, safety tips, and scenic routes perfect for every paragliding enthusiast.
  </p>
  <p>
    Our goal is to help pilots and adventure seekers discover hidden gems, breathtaking mountains, and valleys suitable for safe and thrilling flights. Stay tuned!
  </p>
  <p class="italic text-green-700 dark:text-green-400 font-medium">
    Check back soon for full updates and start preparing for unforgettable aerial experiences!
  </p>
`;


  // --- Render principal ---
  return (
    <div className="space-y-10">
      {/* Harta */}
      <div className="h-[30vh] rounded-xl overflow-hidden shadow-md">
        <MapGenerate center={[country.latitude, country.longitude]} />
      </div>

      {/* Search form */}
      <SearchForm select={{ country, region: regions }} />

      {/* ViewCountry */}
      <ViewCountry
  country={{ ...country, description: country.description ?? countryDescriptionFallback }}
  regions={regions}
  sites={sites}
  months={months}
  seasons={seasons}
/>
<SocialComponent selectedTipe="c" selectedId={id} selectedName={country.name} />
    </div>
  );
}
