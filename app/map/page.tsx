import { get_all_country, get_all_regions, get_all_takeoff, get_all_landing } from "@/app/api/get/get_places";
import calculateGPSCenter from "@/app/components/map/functions/calculateGPSCenter";
import MapPageClient from "./MapPageClient";
import { Site } from "../types";

export default async function MapRutePage({ searchParams }: { searchParams?: { country?: string; region?: string } }) {
  const countries = await get_all_country();
  const regions = await get_all_regions();
  const takeoffs = await get_all_takeoff();
  const landings = await get_all_landing();

 const takeoffSites = takeoffs.map(t => ({
  id: t.id,
  name: t.name,
  latitude: t.latitude,
  longitude: t.longitude,
  countryId: t.countryId ?? regions.find(r => r.id === t.regionId)?.countryId ?? 0,
  regionId: t.regionId,
  type: "takeoff" as const,
}));

const landingSites = landings.map(l => ({
  id: l.id,
  name: l.name,
  latitude: l.latitude,
  longitude: l.longitude,
  countryId: l.countryId ?? regions.find(r => r.id === l.regionId)?.countryId ?? 0,
  regionId: l.regionId,
  type: "landing" as const,
}));

const initialSites: Site[] = [...takeoffSites, ...landingSites];
  const initialCenter = calculateGPSCenter(initialSites);

  // parsăm searchParams
  const selectedCountryId = searchParams?.country ? parseInt(searchParams.country) : null;
  const selectedRegionId = searchParams?.region ? parseInt(searchParams.region) : null;

  return (
    <MapPageClient
      countries={countries}
      regions={regions}
      initialSites={initialSites}
      initialCenter={initialCenter}
      defaultSelected={{ countryId: selectedCountryId, regionId: selectedRegionId }}
    />
  );
}
