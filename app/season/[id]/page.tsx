import { notFound } from "next/navigation";
import SeasonView from "./SesonView";
import { get_all_regions, get_country_by_id } from "@/app/api/get/get_places";
import type { Country, Region } from "@/app/types";

interface Params {
  params: { id: string };
}

export default async function SeasonsPage({ params }: Params) {
  const seasonId = Number(params.id);

  // --- Definim sezoanele ---
  const seasons = [
    { id: 1, name: "Spring", months: [3, 4, 5] },
    { id: 2, name: "Summer", months: [6, 7, 8] },
    { id: 3, name: "Autumn", months: [9, 10, 11] },
    { id: 4, name: "Winter", months: [12, 1, 2] },
  ];

  const season = seasons.find((s) => s.id === seasonId);
  if (!season) return notFound();

  // --- 1️⃣ Preluăm toate regiunile ---
  const regionsFromApi = await get_all_regions();

  // --- 2️⃣ Filtrăm regiunile care au cel puțin o lună din sezon și normalizăm tipurile ---
  const filteredRegions: Region[] = regionsFromApi
    .filter((r) => r.bestSeason?.some((month) => season.months.includes(month)))
    .map((r) => ({
      ...r,
      description: r.description ?? undefined,
      latitude: r.latitude ?? undefined,
      longitude: r.longitude ?? undefined,
      map: r.map ?? undefined,
      bestSeason: r.bestSeason ?? undefined,
      seo: r.seo ?? undefined,
    }));

  // --- 3️⃣ Preluăm țările asociate (fără duplicate) ---
  const countryPromises = filteredRegions.map((r) =>
    get_country_by_id({ id: r.countryId })
  );
  const countriesWithNulls = await Promise.all(countryPromises);

  const validCountries: Country[] = countriesWithNulls
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .map((c) => ({
      ...c,
      description: c.description ?? undefined,
      latitude: c.latitude ?? undefined,
      longitude: c.longitude ?? undefined,
    }));

  // --- Eliminăm duplicatele după id ---
  const uniqueCountries = Array.from(
    new Map(validCountries.map((c) => [c.id, c])).values()
  );

  return (
    <SeasonView
      season={seasonId}
      countrys={uniqueCountries}
      regions={filteredRegions}
    />
  );
}
