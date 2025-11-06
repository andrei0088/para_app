// app/country/[id]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { 
  get_country_by_id, 
  get_country_landings_takeoffs, 
  get_country_regions 
} from "@/app/api/get/get_places";

import ViewCountry from "./ViewCountry";
import MapGenerate from "@/app/components/map/MapGenerate";
import SearchForm from "@/app/search/SearchForm";
import SocialComponent from "@/app/components/social/SocialComponent";

import type { Country, Region, Takeoff, Landing, Sites } from "@/app/types";

interface CountryPageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic"; // forțează Server-Side Rendering

export default async function Country({ params }: CountryPageProps) {
  const id = Number(params.id);  

  // --- Obține țara ---
  const countryRaw = await get_country_by_id({ id });
  if (!countryRaw) notFound();

  const country: Country = {
    ...countryRaw,
    description: countryRaw.description ?? "",
    latitude: countryRaw.latitude ?? undefined,
    longitude: countryRaw.longitude ?? undefined,
  };

  // --- Obține regiunile ---
  const regionsRaw = (await get_country_regions({ id })) ?? [];
  const regions: Region[] = regionsRaw.map(r => ({
    id: r.id,
    name: r.name,
    countryId: r.countryId,
    description: r.description ?? "",
    bestSeason: r.bestSeason ?? [],
    map: r.map ?? "",
    seo: r.seo ?? undefined,
    takeoffs: (r.takeoffs ?? []).map((t): Takeoff => ({
      id: t.id,
      name: t.name,
      regionId: t.regionId,
      latitude: t.latitude,
      longitude: t.longitude,
      map: t.map ?? undefined,
    })),
    landings: (r.landings ?? []).map((l): Landing => ({
      id: l.id,
      name: l.name,
      regionId: l.regionId,
      latitude: l.latitude,
      longitude: l.longitude,
      map: l.map ?? undefined,
    })),
  }));

  // --- Takeoff + Landing pentru țară ---
  const sitesRaw = (await get_country_landings_takeoffs({ id })) ?? { takeoff: [], landing: [] };
  const sites: Sites = {
    takeoff: sitesRaw.takeoff.map((t): Takeoff => ({
      id: t.id,
      name: t.name,
      regionId: t.regionId,
      latitude: t.latitude,
      longitude: t.longitude,
      map: t.map ?? undefined,
    })),
    landing: sitesRaw.landing.map((l): Landing => ({
      id: l.id,
      name: l.name,
      regionId: l.regionId,
      latitude: l.latitude,
      longitude: l.longitude,
      map: l.map ?? undefined,
    })),
  };

  // --- Determină lunile active ---
  const months: number[] = regions.flatMap(r => r.bestSeason ?? []).filter((m): m is number => m !== undefined);
  
  // --- Sezoane afișate ---
  const displaySeason = [
    { name: "Spring", emoji: "🌱", months: [3, 4, 5] },
    { name: "Summer", emoji: "☀️", months: [6, 7, 8] },
    { name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
    { name: "Winter", emoji: "❄️", months: [12, 1, 2] },
  ];
  const seasons = displaySeason.filter(s => s.months.some(m => months.includes(m)));

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
  if (!country.description) country.description = countryDescriptionFallback;

  return (
    <div className="space-y-10">
      {/* Harta */}
      <div className="h-[30vh] rounded-xl overflow-hidden shadow-md">
        <MapGenerate
          center={country.latitude && country.longitude ? [country.latitude, country.longitude] : undefined}
        />
      </div>

      {/* Search */}
      <SearchForm select={{ country, region: regions }} />

      {/* ViewCountry */}
      <ViewCountry
        country={country}
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
