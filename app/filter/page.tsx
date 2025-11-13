import ViewFilter from "./ViewFilter";
import {
  get_country_by_id,
  get_country_landings_takeoffs,
  get_country_regions,
} from "@/app/api/get/get_places";
import type { Country } from "@/app/types";
import MapGenerate from "../components/map/MapGenerate";
import calculateGPSCenter from "../components/map/functions/calculateGPSCenter";
import SearchForm from "../search/SearchForm";

interface FilterPageProps {
  searchParams: {
    country?: string;
    region?: string;
    season?: string;
    month?: string;
  };
}

// Tip minim pentru takeoffs / landings
export interface MinimalPlace {
  id: number;
  name: string;
}

// Tip pentru regiuni folosit în filtrare
export interface RegionMinimal {
  id: number;
  name: string;
  countryId: number;
  map?: string; // nu poate fi null
  seo?: string;
  description?: string;
  bestSeason?: number[];

  takeoffs?: MinimalPlace[];
  landings?: MinimalPlace[];
}

const SEASONS = [
  { id: 1, name: "Spring", months: [3, 4, 5] },
  { id: 2, name: "Summer", months: [6, 7, 8] },
  { id: 3, name: "Autumn", months: [9, 10, 11] },
  { id: 4, name: "Winter", months: [12, 1, 2] },
];

// Helper strict typed pentru țară
function sanitizeCountry(data: {
  id: number;
  name: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
}): Country {
  return {
    id: data.id,
    name: data.name,
    description: data.description ?? undefined,
    latitude: data.latitude ?? undefined,
    longitude: data.longitude ?? undefined,
  };
}

// Helper strict typed pentru regiune minimal
function sanitizeRegion(data: {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[] | null;
  map?: string | null;
  takeoffs?: { id: number; name: string }[];
  landings?: { id: number; name: string }[];
}): RegionMinimal {
  return {
    id: data.id,
    name: data.name,
    countryId: data.countryId,
    bestSeason: data.bestSeason ?? undefined,
    map: data.map ?? undefined,
    takeoffs: data.takeoffs?.map((t) => ({ id: t.id, name: t.name })),
    landings: data.landings?.map((l) => ({ id: l.id, name: l.name })),
  };
}

export default async function FilterPage({ searchParams }: FilterPageProps) {
  const { country, season, month } = await searchParams;

  if (!country) {
    return <p className="p-8 text-red-600">No country selected!</p>;
  }

  const countryId = Number(country);
  const rawCountry = await get_country_by_id({ id: countryId });
  if (!rawCountry) {
    return <p className="p-8 text-red-600">Country not found!</p>;
  }

  const selectedCountry = sanitizeCountry(rawCountry);

  // Preluăm regiunile și le sanitizăm
  const rawRegions = await get_country_regions({ id: countryId });
  let regions: RegionMinimal[] = rawRegions.map(sanitizeRegion);

  const selectedSeasonId = season ? Number(season) : undefined;
  const selectedMonthNum = month ? Number(month) : undefined;

  // Determinăm sezonul curent automat din lună dacă nu avem season explicit
  const autoSeason =
    !selectedSeasonId && selectedMonthNum
      ? SEASONS.find((s) => s.months.includes(selectedMonthNum))
      : undefined;

  const activeSeasonId = selectedSeasonId ?? autoSeason?.id;

  // Filtrăm regiunile
  if (activeSeasonId || selectedMonthNum) {
    regions = regions.filter((r) => {
      const best = r.bestSeason ?? [];
      let matchesSeason = false;
      let matchesMonth = false;

      if (activeSeasonId) {
        const seasonMonths =
          SEASONS.find((s) => s.id === activeSeasonId)?.months ?? [];
        matchesSeason = best.some((m) => seasonMonths.includes(m));
      }

      if (selectedMonthNum) {
        matchesMonth = best.includes(selectedMonthNum);
      }

      return matchesSeason || matchesMonth;
    });
  }

  // Preluăm takeoff/landing pentru harta centrului GPS
  const sites = await get_country_landings_takeoffs({ id: countryId });
  const center = calculateGPSCenter([...sites.landing, ...sites.takeoff]);

  return (
    <>
      <div className="h-[30vh]">
        <MapGenerate center={center} />
      </div>
      <SearchForm
        select={{
          country: selectedCountry,
          region: regions,
          season: activeSeasonId ?? "",
          month: selectedMonthNum ?? "",
        }}
      />
      <ViewFilter
        country={selectedCountry}
        regions={regions}
        selectedSeasonId={activeSeasonId}
        selectedMonthNum={selectedMonthNum}
      />
    </>
  );
}
