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

export default async function FilterPage({ searchParams }: FilterPageProps) {
  const { country, season, month } = await searchParams;

  if (!country) return <p className="p-8 text-red-600">No country selected!</p>;

  const countryId = Number(country);
  const selectedCountry: Country | null = await get_country_by_id({ id: countryId });
  if (!selectedCountry) return <p className="p-8 text-red-600">Country not found!</p>;

  let regions: Region[] = await get_country_regions({ id: countryId });

  const selectedSeasonId = season ? Number(season) : undefined;
  const selectedMonthNum = month ? Number(month) : undefined;

  // Determinăm sezonul curent din luna selectată (override dacă nu avem season explicit)
  const autoSeason = !selectedSeasonId && selectedMonthNum
    ? [{ id: 4, months: [12,1,2] }, { id: 1, months:[3,4,5]}, {id:2, months:[6,7,8]}, {id:3, months:[9,10,11]}].find(s => s.months.includes(selectedMonthNum))
    : undefined;

  const activeSeasonId = selectedSeasonId ?? autoSeason?.id;

  // Filtrăm regiunile: trebuie să includă fie sezonul selectat, fie luna selectată
  regions = regions.filter(r => {
    const best = r.bestSeason ?? [];
    const seasonMonths = activeSeasonId ? [{ id: 1, months:[3,4,5]}, {id:2, months:[6,7,8]}, {id:3, months:[9,10,11]}, {id:4, months:[12,1,2]}].find(s => s.id === activeSeasonId)?.months ?? [] : [];
    const matchesSeason = activeSeasonId ? best.some(m => seasonMonths.includes(m)) : false;
    const matchesMonth = selectedMonthNum ? best.includes(selectedMonthNum) : false;
    return matchesSeason || matchesMonth;
  });
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
    </>
  );
}
