import ViewFilter from "./ViewFilter";
import { get_country_by_id, get_country_landings_takeoffs, get_country_regions } from "@/app/api/get/get_places";
import type { Country, Region } from "@/app/types";
import MapGenerate from "../components/map/MapGenerate";
import calculateGPSCenter from "../components/map/functions/calculateGPSCenter";

interface FilterPageProps {
  searchParams: {
    country?: string;
    region?: string;
    season?: string;
    month?: string;
  };
}

<<<<<<< HEAD
// Helper strict typed: convertim null => undefined pentru Country
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
  };
}

// Helper strict typed: convertim null => undefined pentru Region dacă e nevoie
function sanitizeRegion(data: {
  id: number;
  name: string;
  countryId: number;
  bestSeason?: number[] | null;
}): Region {
  return {
    id: data.id,
    name: data.name,
    countryId: data.countryId,
    bestSeason: data.bestSeason ?? undefined,
  };
}

export default async function FilterPage({ searchParams }: FilterPageProps) {
  const { country, season, month } = searchParams;
=======
export default async function FilterPage({ searchParams }: FilterPageProps) {
  const { country, season, month } = await searchParams;
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

  if (!country) return <p className="p-8 text-red-600">No country selected!</p>;

  const countryId = Number(country);
<<<<<<< HEAD
  const rawCountry = await get_country_by_id({ id: countryId });
  if (!rawCountry) return <p className="p-8 text-red-600">Country not found!</p>;

  const selectedCountry = sanitizeCountry(rawCountry);

  // Preluăm și sanitizăm regiunile
  const rawRegions = await get_country_regions({ id: countryId });
  let regions: Region[] = rawRegions.map(sanitizeRegion);
=======
  const selectedCountry: Country | null = await get_country_by_id({ id: countryId });
  if (!selectedCountry) return <p className="p-8 text-red-600">Country not found!</p>;

  let regions: Region[] = await get_country_regions({ id: countryId });
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2

  const selectedSeasonId = season ? Number(season) : undefined;
  const selectedMonthNum = month ? Number(month) : undefined;

  // Determinăm sezonul curent din luna selectată (override dacă nu avem season explicit)
  const autoSeason = !selectedSeasonId && selectedMonthNum
<<<<<<< HEAD
    ? [
        { id: 4, months: [12,1,2] },
        { id: 1, months:[3,4,5]},
        { id: 2, months:[6,7,8]},
        { id: 3, months:[9,10,11]},
      ].find(s => s.months.includes(selectedMonthNum))
=======
    ? [{ id: 4, months: [12,1,2] }, { id: 1, months:[3,4,5]}, {id:2, months:[6,7,8]}, {id:3, months:[9,10,11]}].find(s => s.months.includes(selectedMonthNum))
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
    : undefined;

  const activeSeasonId = selectedSeasonId ?? autoSeason?.id;

<<<<<<< HEAD
  // Filtrăm regiunile
  regions = regions.filter(r => {
    const best = r.bestSeason ?? [];
    const seasonMonths = activeSeasonId
      ? [
          { id: 1, months:[3,4,5]},
          { id: 2, months:[6,7,8]},
          { id: 3, months:[9,10,11]},
          { id: 4, months:[12,1,2]}
        ].find(s => s.id === activeSeasonId)?.months ?? []
      : [];
=======
  // Filtrăm regiunile: trebuie să includă fie sezonul selectat, fie luna selectată
  regions = regions.filter(r => {
    const best = r.bestSeason ?? [];
    const seasonMonths = activeSeasonId ? [{ id: 1, months:[3,4,5]}, {id:2, months:[6,7,8]}, {id:3, months:[9,10,11]}, {id:4, months:[12,1,2]}].find(s => s.id === activeSeasonId)?.months ?? [] : [];
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
    const matchesSeason = activeSeasonId ? best.some(m => seasonMonths.includes(m)) : false;
    const matchesMonth = selectedMonthNum ? best.includes(selectedMonthNum) : false;
    return matchesSeason || matchesMonth;
  });
<<<<<<< HEAD

  const sites = await get_country_landings_takeoffs({ id: countryId });
  const center = calculateGPSCenter([...sites.landing, ...sites.takeoff]);

  return (
    <>
      <div className="h-[30vh]">
        <MapGenerate center={center} />
      </div>
      <ViewFilter
        country={selectedCountry}
        regions={regions}
        selectedSeasonId={activeSeasonId}
        selectedMonthNum={selectedMonthNum}
      />
=======
 const sites = await get_country_landings_takeoffs({ id: countryId });
const center = calculateGPSCenter([...sites.landing, ...sites.takeoff]);
  return (
    <>
    <div className="h-[30vh]">
          <MapGenerate center={center} />
    </div>
    <ViewFilter
      country={selectedCountry}
      regions={regions}
      selectedSeasonId={activeSeasonId}
      selectedMonthNum={selectedMonthNum}
    />
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
    </>
  );
}
