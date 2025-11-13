// app/month/[id]/page.tsx
import { notFound } from "next/navigation";
import MonthView from "./MonthView";
import { get_all_regions, get_country_by_id } from "@/app/api/get/get_places";
import type { Country, Region } from "@/app/types";

interface Params {
  params: { id: string };
}

// Tipuri brute API

interface CountryRaw {
  id: number;
  name: string;
  description?: string | null;
}

// Normalizare: null → undefined
// Tipurile brute API pentru MonthPage
interface RegionApiRaw {
  id: number;
  name: string;
  countryId: number;
  description?: string | null;
  map?: string | null;
  seo?: string | null;
  bestSeason?: number[] | null;
  takeoffs?:
    | {
        id: number;
        name?: string;
        latitude?: number;
        longitude?: number;
        altitude?: number;
      }[]
    | null;
  landings?:
    | {
        id: number;
        name?: string;
        latitude?: number;
        longitude?: number;
        altitude?: number;
      }[]
    | null;
}

// Funcție de normalizare pentru TS
function normalizeRegion(r: RegionApiRaw): Region {
  return {
    id: r.id,
    name: r.name,
    countryId: r.countryId,
    description: r.description ?? undefined,
    map: r.map ?? undefined,
    seo: r.seo ?? undefined,
    bestSeason: r.bestSeason ?? [],
    takeoffs:
      r.takeoffs?.map((t) => ({
        id: t.id,
        name: t.name ?? `Takeoff ${t.id}`,
        regionId: r.id,
        countryId: r.countryId,
        latitude: t.latitude ?? 0,
        longitude: t.longitude ?? 0,
        altitude: t.altitude ?? 0,
        description: undefined,
        map: undefined,
      })) ?? [],
    landings:
      r.landings?.map((l) => ({
        id: l.id,
        name: l.name ?? `Landing ${l.id}`,
        regionId: r.id,
        countryId: r.countryId,
        latitude: l.latitude ?? 0,
        longitude: l.longitude ?? 0,
        altitude: l.altitude ?? 0,
        description: undefined,
        map: undefined,
      })) ?? [],
  };
}

function normalizeCountry(c: CountryRaw): Country {
  return {
    id: c.id,
    name: c.name,
    description: c.description ?? undefined,
  };
}

// Sezoanele
const seasons = [
  { id: 1, name: "Spring", months: [3, 4, 5] },
  { id: 2, name: "Summer", months: [6, 7, 8] },
  { id: 3, name: "Autumn", months: [9, 10, 11] },
  { id: 4, name: "Winter", months: [12, 1, 2] },
];

export default async function MonthPage({ params }: Params) {
  const param = await params;
  const month = Number(param.id);
  if (month < 1 || month > 12) return notFound();

  const currentSeason = seasons.find((s) => s.months.includes(month));
  if (!currentSeason) return notFound();

  // 1️⃣ Preluăm toate regiunile și le normalizăm
  const allRegions = (await get_all_regions()).map(normalizeRegion);

  // 2️⃣ Filtrăm regiunile care au această lună în bestSeason
  const filteredRegions = allRegions.filter((r) =>
    r.bestSeason?.includes(month)
  );

  // 3️⃣ Preluăm țările asociate regiunilor și le normalizăm
  const countriesRaw = await Promise.all(
    filteredRegions.map((r) => get_country_by_id({ id: r.countryId }))
  );
  const validCountries: Country[] = countriesRaw
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .map(normalizeCountry);

  // 4️⃣ Eliminăm duplicatele după id
  const uniqueCountries = Array.from(
    new Map(validCountries.map((c) => [c.id, c])).values()
  );

  return (
    <MonthView
      month={month}
      season={currentSeason}
      countrys={uniqueCountries}
      regions={filteredRegions}
    />
  );
}
